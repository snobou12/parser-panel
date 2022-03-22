
import {checkToken} from "../api/api";
const checkTokenThunk = (token,navigate)=> async dispatch=>{
    const response = await checkToken(token);
    if(!response.data.user_id){
        localStorage.removeItem("parser-panel-state");
        navigate("/login");
    }
  }


export default checkTokenThunk;
