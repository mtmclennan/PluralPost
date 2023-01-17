import LoginForm from '../components/forms/LoginForm';
import logo from '../assets/images/PPlogoonly.png';
const Login = () => {
  return (
    <div className="login__container">
      <div className="login-form__container">
        <img src={logo} alt="PluralPost logo" />
        <h1 className="logo">PluralPost</h1>
        <h1>Welcome Back</h1>
        <LoginForm />
      </div>
      <div className="login__hero"></div>
    </div>
  );
};
export default Login;
