
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import selectToken from "../selectors/select-token";
import selectCurrentShop from "../selectors/select-current-shop";

import CustomEditor from "../components/CustomEditor";
import { Button, Form, FormTextInput } from "tabler-react";
import deleteShopThunk from "../thunks/delete-shop-thunk";
import selectUserLogin from "../selectors/select-user-login";
import selectUserPassword from "../selectors/select-user-password";
import changeShopThunk from "../thunks/change-shop-thunk";
import { Container, Buttons } from "../styles/shopStyled";
import Prism from "prismjs";
import runCodeThunk from "../thunks/run-code-thunk";
import { toast } from "react-toastify";
import CustomFontChanger from "../components/CustomFontChanger";
import "prismjs/components/prism-aql";
import "prismjs/themes/prism-tomorrow.css";
import Spinner from "../components/Spinner";
import getShopThunk from "../thunks/get-shop-thunk";


const Shop = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const currentShop = useSelector(selectCurrentShop(params.shopId));
  const login = useSelector(selectUserLogin);
  const password = useSelector(selectUserPassword);
  const [mode, setMode] = useState("view");

  const [codeOutput, setCodeOutput] = useState("");
  const setEditMode = () => {
    setMode(mode === "edit" ? "view" : "edit");
  };

  
  
  
  const [loading,setLoading]=React.useState(false);
  const [name, setName] = useState(currentShop?.name ? currentShop.name : "");
  const [tick,setTick]=useState(false);
  const [url, setUrl] = useState(currentShop?.url ? currentShop.url : "");
  const [cron, setCron] = useState(currentShop?.cron ? currentShop.cron : "");
  const [code, setCode] = useState(currentShop?.code ? currentShop.code : "");
  
  const handleDelete = () => {
    dispatch(deleteShopThunk(token, currentShop.id));
    navigate("/shops");
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleCronChange = (e) => setCron(e.target.value);
  const handleCodeChange = (code) => {
    setCode(code)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      changeShopThunk(
        token,
        currentShop.id,
        {
          code,
          cron,
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
          navigate("/shops");
        },
        (bool)=>{
          setLoading(bool);
        },
      )
    );
  };

  const [editedCodeOutput, setEditedCodeOutput] = useState("");
  const handleCodeRun = (code, url, callback) => {
    dispatch(runCodeThunk(token, code, url, callback));
  };

  useEffect(() => {
    Prism.highlightAll();
  const ticker=setTimeout(()=>{
      dispatch(getShopThunk(token,params.shopId));
      setTick(!tick);
    },15000)
    return ()=>clearTimeout(ticker);
  }, [mode, codeOutput, editedCodeOutput, currentShop,tick,token,params.shopId,dispatch]);

  if (!currentShop) {
    setTimeout(()=>{
      if(!login || !password){
        navigate("/login");

      }
      else{
      navigate("/shops");

      }
      // toast.error("Магазин не найден")
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
            <h1>{currentShop.name}</h1>
            <Button
              onClick={() => navigate(`/shops/${currentShop.id}/regions`)}
              color="red"
            >
              Регионы
            </Button>
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

          <Button disabled={loading} color="primary" onClick={setEditMode}>
            {mode === "view" ? "Изменить" : "Выйти без изменений"}
          </Button>
          <Button disabled={loading} color="red" onClick={handleDelete}>
            Удалить
          </Button>
          <CustomFontChanger />
        </Buttons>
      </header>

      {mode === "view" ? (
        <div className="wrap">
          <p>CRON: {currentShop.cron}</p>
          <p>Адрес: {currentShop.url}</p>
          <p>Страниц в процессе: {currentShop.pages_in_process}</p>

          <div className="code">

            <div className="preview">
              <h3>Код</h3>
     
              
              <div
                style={{
                  marginBottom: "7.5px",
                  
                }}
              >
                <CustomEditor valueEditor={currentShop.code} disabled={true} />
              </div>

            </div>

            <div className="output">
              
              <div>
                <h3>Результат</h3>
                <Button
                  color="primary"
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    handleCodeRun(currentShop.code, currentShop.url, (code) =>
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
          <label htmlFor="cron">CRON</label>
          <FormTextInput
            placeholder="CRON"
            name="cron"
            value={cron}
            onChange={handleCronChange}
          />
          <div className="code">
            <div className="preview">
              <label htmlFor="codeEditor">
                <h3>Код</h3>
              </label>
              <div
                style={{
                  marginBottom: "7.5px",
                }}
              >
                <CustomEditor
                  valueEditor={code}
                  onValueEditorChange={handleCodeChange}
                  
                />
              </div>
            </div>
            <div className="output">
              <div>
                <h3>Результат</h3>
                <Button
                  color="primary"
                  type="button"
                  disabled={loading}
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

export default Shop;
