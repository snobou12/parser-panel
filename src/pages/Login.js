import {Button, Form, FormTextInput} from "tabler-react";
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {Container} from "../styles/loginStyled";

import {useDispatch, useSelector} from "react-redux";
import loginThunk from "../thunks/login-thunk";
import selectLogin from "../selectors/select-login";



const Login = (props) => {
  const dispatch = useDispatch();
  const login = useSelector(selectLogin);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginThunk({
      email,
      password
    }, navigate))
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  return (
    <Container>
      <header>
        <h1>Авторизация</h1>
      </header>
      <Form onSubmit={handleSubmit}>
        <FormTextInput type="email" name="email" placeholder="Почта" value={email} onChange={handleEmailChange}/>
        <FormTextInput type="password" name="password" placeholder="Пароль" value={password} onChange={handlePasswordChange}/>
        {login.message ? <p className="error">{login.message}</p> : null}
        <Button color="primary" type="submit">Войти</Button>
      </Form>
      <NavLink to="/registration">Нет аккаунта?</NavLink>
    </Container>
  )
}

export default Login;