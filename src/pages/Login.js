import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faRightLong, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks";
import { Redirect } from "react-router-dom";
import toast from "react-hot-toast";

// custom hook for forms
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
  const pathLocation = window.location.pathname;
  useEffect(() => {
    //show compoment according to pathname
    if (pathLocation === "/register") {
      setRegisterClasses("register rotate_Register_X");
      setEmailClasses("login rotate_Login_X");
    } else {
      setRegisterClasses("register rotate_Register_Y");
      setEmailClasses("login rotate_Login_Y");
    }
  }, [pathLocation]);

  //navigate to login
  const handelLogin = () => {
    setRegisterClasses("register rotate_Register_Y");
    setEmailClasses("login rotate_Login_Y");
  };

  //navigate to register
  const handelRegister = () => {
    setRegisterClasses("register rotate_Register_X");
    setEmailClasses("login rotate_Login_X");
  };

  //redgister a new user
  const register = async (e) => {
    e.preventDefault();

    //function to make register form value's null
    function registerInputValueNull() {
      name.valueNull();
      email.valueNull();
      password.valueNull();
      confirmPassword.valueNull();
    }

    //to check all the feilds are filled
    if (!name.value, !email.value, !password.value, !confirmPassword.value) {
      return toast.error("Please Fill All The Feilds");
    }
    //check if password is equall or more that 8 characters
    if (password.value.length < 8) {
      return toast.error("Password is Short");
    }

    //check if Password and confirm password is matching
    if (password.value !== confirmPassword.value) {
      return  toast.error("Password and confirm password is't matching");
    }

    // request to signup user
    const response = await auth.signup(name.value, email.value, password.value);

    if (response.success) {
      //if signup request success, request to login
      const loginResponse = await auth.login(email.value, password.value);
      if (loginResponse.success) {
        toast.success(loginResponse.message);
      }
      //calling registerInputValueNull to make input values null
      registerInputValueNull();
    }else{
      toast.success(response.message);
    }
    //calling registerInputValueNull to make input values null
    registerInputValueNull();
  };

  const login = async (e) => {
    e.preventDefault();

    //function to make login form value's null
    function loginInputValueNull() {
      loginEmail.valueNull();
      loginPassword.valueNull();
    }

    // request to login user
    const response = await auth.login(loginEmail.value, loginPassword.value);

    if (response.success) {
      console.log(response);
      toast.success(response.message);
      loginInputValueNull();
    }else{
      toast.success(response.message);

    }
    loginInputValueNull();
  };

  //if user loged In redirect to home page
  if (auth?.user) {
    return <Redirect to="/" />;
  }

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
              type={'password'}
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
              type={'password'}
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
