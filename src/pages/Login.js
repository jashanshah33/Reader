import React, { useState } from "react";

const Login = () => {
  const [emailClasses, setEmailClasses] = useState("login");
  const [registerClasses, setRegisterClasses] = useState("register");

  const handelLogin = () => {
    setRegisterClasses("register rotate_Register_Y");
    setEmailClasses("login rotate_Login_Y");
  };
  const handelRegister = () => {
    console.log("register");
    setRegisterClasses("register rotate_Register_X");
    setEmailClasses("login rotate_Login_X");

    // setEmailClasses('login active-sx inactive-dx')
    // setRegisterClasses('register active-dx inactive-sx')
  };

  return (
    <div className="login_Register">
      <div className={emailClasses}>
        <form action="">
          <div>
            <h2 >Login : </h2>
          </div>
          <div>
            <label htmlFor="email">Email*</label>
            <input id="email" required placeholder="Email" />
          </div>
          <div>
            <label htmlFor="password">Password*</label>
            <input id="password" required placeholder="Password" />
          </div>

          <div></div>
          <button className="login_btn" type="submit">
            Login
          </button>
          <button
            onClick={handelRegister}
            className="register_btn"
            type="button"
          >
            Register
          </button>
        </form>
      </div>
      {/* second */}

      <div className={registerClasses}>
        <form action="">
          <div>
            <h2 >Register : </h2>
          </div>

          <div>
            <label htmlFor="name">Name*</label>
            <input id="name" required placeholder="Name" />
          </div>
          <div>
            <label htmlFor="email">Email*</label>
            <input id="email" required placeholder="Email" />
          </div>
          <div>
            <label htmlFor="password">Password*</label>
            <input id="password" required placeholder="Password" />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password*</label>
            <input
              id="confirmPassword"
              required
              placeholder="Confirm Password"
            />
          </div>

          <div></div>
          <button className="login_btn" type="submit">
            Register
          </button>
          <button onClick={handelLogin} className="register_btn" type="button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
