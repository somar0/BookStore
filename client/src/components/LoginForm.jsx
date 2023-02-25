import React from "react";

const LoginForm = () => {
  return (
    <form className="login-form" action="/api/admin" method="post">
      <div className="imgcontainer">
        <img src="./../avatar.jpg" alt="Avatar" className="avatar" />
      </div>
      <div className="container">
        <label htmlFor="username">
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="uname"
          id="username"
          required
          aria-label="Username"
        />
        <label htmlFor="password">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          id="password"
          required
          aria-label="Password"
        />
        <button className="btnLogin" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
