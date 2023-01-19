import LoginForm from '../components/forms/LoginForm';
import { Fragment, useState } from 'react';
import logo from '../assets/images/PPlogoonly.png';
import ForgotPassword from '../components/forms/ForgotPassword';

const Login = () => {
  const [showResetForm, setShowResetForm] = useState(false);

  return (
    <div className="login__container">
      <div className="login-form__container">
        <img src={logo} alt="PluralPost logo" />
        <h1 className="logo">PluralPost</h1>
        {!showResetForm && (
          <Fragment>
            <h1>Welcome Back</h1>
            <LoginForm setShowResetForm={setShowResetForm} />
          </Fragment>
        )}
        {showResetForm && (
          <Fragment>
            <h2>Reset Password</h2>
            <ForgotPassword setShowResetForm={setShowResetForm} />
          </Fragment>
        )}
      </div>
      <div className="login__hero"></div>
    </div>
  );
};
export default Login;
