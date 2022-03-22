import {runCode} from "../api/api";

const runCodeThunk = (token, code, url, callback) => async dispatch => {
  if (callback) {
    callback("Выполнение...")
    let response = await runCode(token, code, url);
    if (response.data.message) {
      
      callback(response.data.message)
      
    } else if (response.data.answer) {
      try{
        callback(JSON.stringify(JSON.parse(response.data.answer), null, '\t'));
      }
      catch(e){
        callback("Не удалось разобрать результат")
      }
      
    }else{
      callback("Что-то пошло не так");
    }
    
  }
}

export default runCodeThunk;