import React, { useState } from "react";
// import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faRightLong, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks";

const useFormInfo = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  function change(e) {
    setValue(e.target.value);
  }

  function valueNull() {
    setValue("");
  }

  return {
    value,
    onChange: change,
    valueNull: valueNull,
  };
};

const Login = () => {
  const [emailClasses, setEmailClasses] = useState("login");
  const [registerClasses, setRegisterClasses] = useState("register");

  const loginEmail = useFormInfo("");
  const loginPassword = useFormInfo("");

  const name = useFormInfo("");
  const email = useFormInfo("");
  const password = useFormInfo("");
  const confirmPassword = useFormInfo("");

  const auth = useAuth();

  const handelLogin = () => {
    setRegisterClasses("register rotate_Register_Y");
    setEmailClasses("login rotate_Login_Y");
  };
  const handelRegister = () => {
    setRegisterClasses("register rotate_Register_X");
    setEmailClasses("login rotate_Login_X");
  };

  const register = async (e) => {
    function registerInputValueNull() {
      name.valueNull();
      email.valueNull();
      password.valueNull();
      confirmPassword.valueNull();
    }
    e.preventDefault();

    if (password.value.length < 8) {
      return console.log("Password is Short");
    }

    if (password.value !== confirmPassword.value) {
      return console.log("Password and confirm password is't matched");
    }

    const response = await auth.signup(name.value, email.value, password.value);

    if (response.success) {
      console.log({ "*******response": response });
      registerInputValueNull();
    }

    registerInputValueNull();
  };

  const login = async (e) => {
    e.preventDefault();

    function loginInputValueNull() {
      loginEmail.valueNull();
      loginPassword.valueNull();
    }
    const response = await auth.login(loginEmail.value, loginPassword.value);

    if (response) {
      console.log(response);
      loginInputValueNull();
    }
    loginInputValueNull();
  };
  return (
    <div className="login_Register">
      <div className={emailClasses}>
        <form action="">
          <div>
            <h2>Login : </h2>
          </div>
          <div>
            <label htmlFor="email">Email*</label>
            <input
              id="email"
              required
              placeholder="Email"
              value={loginEmail.value}
              onChange={loginEmail.onChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password*</label>
            <input
              id="password"
              required
              placeholder="Password"
              value={loginPassword.value}
              onChange={loginPassword.onChange}
            />
          </div>

          <div></div>
          <button onClick={login} className="login_btn" type="submit">
            Login
          </button>
          <button
            onClick={handelRegister}
            className="navigantion_btn"
            type="button"
          >
            Register
            <FontAwesomeIcon icon={faRightLong} size="xl" />
          </button>
        </form>
      </div>
      {/* second */}

      <div className={registerClasses}>
        <form action="">
          <div>
            <h2>Register : </h2>
          </div>

          <div>
            <label htmlFor="name">Name*</label>
            <input
              id="name"
              required
              placeholder="Name"
              value={name.value}
              onChange={name.onChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email*</label>
            <input
              id="email"
              required
              placeholder="Email"
              value={email.value}
              onChange={email.onChange}
            />
          </div>
          <div id="register_password">
            <label htmlFor="password">Password*</label>
            <input
              id="password"
              required
              placeholder="Password"
              value={password.value}
              onChange={password.onChange}
            />
            <p>* At least 8 Characters *</p>
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password*</label>
            <input
              id="confirmPassword"
              required
              placeholder="Confirm Password"
              value={confirmPassword.value}
              onChange={confirmPassword.onChange}
            />
          </div>

          <div></div>
          <button onClick={register} className="register_btn" type="submit">
            Register
          </button>
          <button
            onClick={handelLogin}
            className="navigantion_btn"
            type="button"
          >
            <FontAwesomeIcon icon={faLeftLong} size="xl" />
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
