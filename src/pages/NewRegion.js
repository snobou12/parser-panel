import { Button, Form, FormTextInput } from "tabler-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addRegionThunk from "../thunks/add-region-thunk";
import selectToken from "../selectors/select-token";
import {Buttons,Container} from "../styles/newRegionStyled";
import CustomEditor from "../components/CustomEditor";
import CustomFontChanger from "../components/CustomFontChanger";

import Prism from "prismjs";
import runCodeThunk from "../thunks/run-code-thunk";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

import { useNavigate, useParams } from "react-router-dom";



const NewRegion=(props)=> {
  const navigate = useNavigate();
  const params=useParams();
  const {shopId}=params;
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("// Код");
  const [loading,setLoading]=useState(false);

  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  const handleNameChange = (e) => setName(e.target.value);

  const handleUrlChange = (e) => setUrl(e.target.value);

  const handleCodeChange = (code) => {
    setCode(code);
  };

  const handleSubmit = () => {
    dispatch(
      addRegionThunk(
        token,
        shopId,
        {
          name,
          url,
          code,
        },
        (err) => {
          if (err !== -1) {
            toast.error(err);
          } else {
            navigate(`/shops/${shopId}/regions`);
          }
        },
        (bool)=>{
          setLoading(bool);
        }
      )
    );
  };

  const [codeOutput, setCodeOutput] = useState("");
  
  
  const handleRemoveValues = () => {
    setCode("");
    setName("");
    setCodeOutput("");
    setUrl("");
  };


  const handleCodeRun = (code, url, callback) => {

    dispatch(runCodeThunk(token, code, url, callback));
  };


  useEffect(()=>{
    Prism.highlightAll();
    
   

  },);

  return (
    <Container>
      <header className="new-shop__header">
        <h1>Новый регион</h1>
        {loading && <Spinner />}

        <Buttons>
          <Button disabled={loading} onClick={handleSubmit}>Создать</Button>
          
            <Button disabled={code.length === 0 && name.length ===0 && url.length===0 || loading } color="red" onClick={handleRemoveValues}>
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
          <div className="code">
            <div className="preview">
              <label htmlFor="codeEditor">
                <h3>Код</h3>
              </label>
              <div style={{marginBottom:"7.5px"}}>
                <CustomEditor valueEditor={code} onValueEditorChange={handleCodeChange} />
              </div>
            </div> 
            <div className="output">
              <div>
                <h3>Результат</h3>
                <Button color="primary"
                disabled={loading}
                  type="button"
                  onClick={() =>
                    handleCodeRun(code, url, (code) => setCodeOutput(code))
                  }>
                Запустить код
                </Button>
              </div>
              <CustomEditor valueEditor={codeOutput} disabled={true} />


              
            </div>
          </div>
        </Form>
      </main>
    </Container>
  )
    
  
}

export default NewRegion;
