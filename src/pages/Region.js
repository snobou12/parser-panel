
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import selectToken from "../selectors/select-token";
import selectCurrentRegion from "../selectors/select-current-region";
import CustomEditor from "../components/CustomEditor";
import { Button, Form, FormTextInput } from "tabler-react";
import deleteRegionThunk from "../thunks/delete-region-thunk";
import CustomFontChanger from "../components/CustomFontChanger";

import { Container,Buttons } from "../styles/regionstyled";
import selectUserLogin from "../selectors/select-user-login";
import selectUserPassword from "../selectors/select-user-password";

import changeRegionThunk from "../thunks/change-region-thunk"
import Prism from "prismjs";
import runCodeThunk from "../thunks/run-code-thunk";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import "prismjs/components/prism-aql";
import "prismjs/themes/prism-tomorrow.css";





const Region = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector(selectUserLogin);
  const password = useSelector(selectUserPassword);
  const { shopId, regionId } = params;
  const token = useSelector(selectToken);
  const currentRegion = useSelector(selectCurrentRegion(regionId));
  const [mode, setMode] = useState("view");
  const [loading,setLoading]=useState(false);
  const [codeOutput, setCodeOutput] = useState("");

  const setEditMode = () => {
    setMode(mode === "edit" ? "view" : "edit");
  };

  const handleDelete = () => {
    dispatch(deleteRegionThunk(token, regionId, shopId));
    navigate(`/shops/${shopId}/regions`);
  };

  const [name, setName] = useState(currentRegion?.name ? currentRegion.name : "");
  const [url, setUrl] = useState(currentRegion?.url ? currentRegion.url : "");
  const [code, setCode] = useState(currentRegion?.code ? currentRegion.code : "");

  const handleNameChange = (e) => setName(e.target.value);
  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleCodeChange = (code) => setCode(code);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      changeRegionThunk(
        token,
        regionId,shopId,
        {
          code,
          name,
          url,
        },
        (success) => {
          setMode("view");
        },
        (err) => {
          toast.error(err);
        },
        (errorNotFound) => {
          toast.error(errorNotFound);
          navigate(`/shops/${shopId}/regions/${regionId}`);
        },
        (bool)=>{
          setLoading(bool);
        }
      )
    );
  };
  const [editedCodeOutput, setEditedCodeOutput] = useState("");
  const handleCodeRun = (code, url, callback) => {
    dispatch(runCodeThunk(token, code, url, callback));
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [mode, codeOutput, editedCodeOutput]);

  if (!currentRegion) {
    setTimeout(()=>{
      if(!login || !password){
        navigate("/login")
      }
      else{
        navigate(`/shops`);
      }
      // toast.error("Регион не найден")
    },1000)
    return (
      <div>
        <p>Загрузка данных...</p>{" "}
      </div>
    );
  }
  return (
    <Container>
      <header>
        {mode === "view" ? (
          <div>
            <h1>{currentRegion.name}</h1>
          </div>
        ) : (
          <>
            <FormTextInput
              placeholder="Название"
              value={name}
              onChange={handleNameChange}
            />
          </>
        )}

        {loading && <Spinner />}

        <Buttons>
          {mode === "edit" ? (
            <Button disabled={loading} onClick={handleSubmit}>Сохранить</Button>
          ) : null}
          <Button disabled={loading}  color="primary" onClick={setEditMode}>
            {mode === "view" ? "Изменить" : "Выйти без изменений"}
          </Button>
          <Button disabled={loading}  color="red" onClick={handleDelete}>
            Удалить
          </Button>
          <CustomFontChanger />

        </Buttons>
      </header>

      {mode === "view" ? (
        <div className="wrap">
          <p>Адрес: {currentRegion.url}</p>

          <div className="code">
            <div className="preview">
              <h3>Код</h3>
              <div style={{ marginBottom: "7.5px" }}>
              <CustomEditor valueEditor={currentRegion.code} disabled={true} />

                
              </div>
            </div>

            <div className="output">
              <div>
                <h3>Результат</h3>
                <Button
                  color="primary"
                  disabled={loading} 
                  type="button"
                  onClick={() =>
                    handleCodeRun(currentRegion.code, currentRegion.url, (code) =>
                      setCodeOutput(code)
                    )
                  }
                >
                  Запустить код
                </Button>
              </div>
              <CustomEditor valueEditor={codeOutput} disabled={true} />

              

              
            </div>
          </div>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <label htmlFor="url">Адрес</label>
          <FormTextInput
            placeholder="Адрес"
            name="url"
            value={url}
            onChange={handleUrlChange}
          />
          <div className="code">
            <div className="preview">
              <label htmlFor="codeEditor">
                <h3>Код</h3>
              </label>
              <div style={{ marginBottom: "7.5px" }}>
                <CustomEditor valueEditor={code} onValueEditorChange={handleCodeChange} />
                
              </div>
            </div>
            <div className="output">
              <div>
                <h3>Результат</h3>
                <Button
                  color="primary"
                  disabled={loading} 
                  type="button"
                  onClick={() =>
                    handleCodeRun(code, url, (code) =>
                      setEditedCodeOutput(code)
                    )
                  }
                >
                  Запустить код
                </Button>
              </div>
              <CustomEditor valueEditor={editedCodeOutput} disabled={true} />


             
            </div>
          </div>
        </Form>
      )}
    </Container>
  );
};

export default Region;
