
import { Button, Form, FormTextInput } from "tabler-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addShopThunk from "../thunks/add-shop-thunk";
import selectToken from "../selectors/select-token";
import CustomEditor from "../components/CustomEditor";
import { Container,Buttons } from "../styles/newShopStyled";
import CustomFontChanger from "../components/CustomFontChanger";


import Prism from "prismjs";
import runCodeThunk from "../thunks/run-code-thunk";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";



const NewShop = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [cron, setCron] = useState("");
  const [code, setCode] = useState("// Код");
  const [loading,setLoading]=useState(false);

  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const handleNameChange = (e) => setName(e.target.value);
  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleCronChange = (e) => setCron(e.target.value);
  const handleCodeChange = (code) => {
    setCode(code);
  };

  const handleSubmit = () => {
    dispatch(
      addShopThunk(
        token,
        {
          name,
          url,
          cron,
          code,
        },
        (err) => {
          if (err !== -1) {
            toast.error(err);
          } else {
            navigate("/shops");
          }
        },
        (bool)=>{
          setLoading(bool);
        },
      )
    );
  };

  const [codeOutput, setCodeOutput] = useState("");
  const handleRemoveValues=()=>{
    setCode("");
    setCodeOutput("");
    setCron("");
    setName("");
    setUrl("");
  }
  
  const handleCodeRun = (code, url, callback) => {
    dispatch(runCodeThunk(token, code, url, callback));
  };

  

  useEffect(() => {
    Prism.highlightAll();
    
  }, []);
  return (
    <Container>
      <header className="new-shop__header">
        <h1>Новый магазин</h1>
        {loading && <Spinner />}
        <Buttons>
          <Button disabled={loading} onClick={handleSubmit}>Создать</Button>
          
            <Button onClick={handleRemoveValues} disabled={code.length === 0 && name.length ===0 && url.length===0 && cron.length===0 || loading} color="red" >
              Очистить
            </Button>
          <CustomFontChanger />

          
        </Buttons>
      </header>
      <main>
        <Form>
          <FormTextInput
            placeholder="Название"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
          <FormTextInput
            placeholder="Адрес"
            name="url"
            value={url}
            onChange={handleUrlChange}
          />
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
                <CustomEditor valueEditor={code} onValueEditorChange={handleCodeChange} />
              </div>
            </div>
            <div className="output">
              <div>
                <h3>Результат</h3>
                <Button
                disabled={loading}
                  color="primary"
                  type="button"
                  onClick={() =>
                    handleCodeRun(code, url, (code) => setCodeOutput(code))
                  }
                >
                  Запустить код
                </Button>
              </div>
              <CustomEditor valueEditor={codeOutput} disabled={true} />
            </div>
          </div>
        </Form>
      </main>
    </Container>
  );
};

export default NewShop;
