
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Main from "./pages/Main";
import Shop from "./pages/Shop";
import NewShop from "./pages/NewShop";
import Shops from "./pages/Shops";
import Region from "./pages/Region";
import { useEffect } from "react";
import checkTokenThunk from "./thunks/check-token-thunk"
import { useDispatch, useSelector } from "react-redux";
import selectToken from "./selectors/select-token";
import selectUserLogin from "./selectors/select-user-login";
import selectUserPassword from "./selectors/select-user-password";

import { ToastContainer } from "react-toastify";
import NewRegion from "./pages/NewRegion";
import Regions from "./pages/Regions";

import "tabler-react/dist/Tabler.css";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const login = useSelector(selectUserLogin);
  const password = useSelector(selectUserPassword);
  const token = useSelector(selectToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
    
  useEffect(() => {
    if (!login || !password) {
      navigate("/login");
    } 
    else{
      dispatch(checkTokenThunk(token,navigate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/shops" element={<Shops />} />
          <Route path="/new-shop" element={<NewShop />} />
          <Route path="/shops/:shopId" element={<Shop />} />
          
          
          <Route path="/shops/:shopId/regions" element={<Regions />} />
          <Route path="/shops/:shopId/new-region" element={<NewRegion />} />
          <Route path="/shops/:shopId/regions/:regionId" element={<Region />}/>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
