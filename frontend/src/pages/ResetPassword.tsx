import React from 'react';
import logo from '../assets/images/PPlogoonly.png';
import ResetPasswordForm from '../components/forms/ResetPasswordForm';

const ResetPassword = () => {
  return (
    <div className="login__container">
      <div className="login-form__container">
        <img src={logo} alt="PluralPost logo" />
        <h1 className="logo">PluralPost</h1>
        <h3>Enter a New Password</h3>
        <ResetPasswordForm />
      </div>
      <div className="login__hero"></div>
    </div>
  );
};

export default ResetPassword;
