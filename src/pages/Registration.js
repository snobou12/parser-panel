import {Button, Form, FormTextInput} from "tabler-react";
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import registrationThunk from "../thunks/registration-thunk";
import selectRegistration from "../selectors/select-registration";
import { Container } from "../styles/registrationStyled";


const Registration = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(registrationThunk({
      email,
      password
    }, navigate))
  }
  const registration = useSelector(selectRegistration);
  return (
    <Container>
      <header>
        <h1>Регистрация</h1>
      </header>
      <Form onSubmit={handleSubmit}>
        <FormTextInput type="email" name="email" placeholder="Почта" value={email} onChange={handleEmailChange}/>
        <FormTextInput type="password" name="password" placeholder="Пароль" value={password} onChange={handlePasswordChange}/>
        {registration.message ? <p className="error">{registration.message}</p> : null}
        <Button color="primary" type="submit">Создать аккаунт</Button>
      </Form>
      <NavLink to="/login">Есть аккаунт?</NavLink>
    </Container>
  )
}

export default Registration;
