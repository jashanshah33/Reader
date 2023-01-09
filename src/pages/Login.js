import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faRightLong,
  faLeftLong
} from "@fortawesome/free-solid-svg-icons";

const useFormInfo = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  function change(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: change,
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

  const handelLogin = () => {
    setRegisterClasses("register rotate_Register_Y");
    setEmailClasses("login rotate_Login_Y");
  };
  const handelRegister = () => {
    setRegisterClasses("register rotate_Register_X");
    setEmailClasses("login rotate_Login_X");
  };

  const register = async (e) => {
    e.preventDefault();

    if (password.value.length < 8) {
      return console.log("Password is Short");
    }

    if (password.value !== confirmPassword.value) {
      return console.log("Password and confirm password is't matched");
    }

      await axios
        .post(`http://localhost:8000/api/v1/user/createUser`, {
          name: name.value,
          email: email.value,
          password: password.value,
        })
        .then((response) => {
          if (response.data) {
            console.log(response.data);
            setRegisterClasses("register rotate_Register_Y");
            setEmailClasses("login rotate_Login_Y");
          }
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });

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
            <input id="email" required placeholder="Email" {...loginEmail} />
          </div>
          <div>
            <label htmlFor="password">Password*</label>
            <input
              id="password"
              required
              placeholder="Password"
              {...loginPassword}
            />
          </div>

          <div></div>
          <button className="login_btn" type="submit">
            Login
          </button>
          <button 
            onClick={handelRegister}
            className="navigantion_btn"
            type="button"
          >
            Register
            <FontAwesomeIcon  icon={faRightLong} size="xl" />

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
            <input id="name" required placeholder="Name" {...name} />
          </div>
          <div>
            <label htmlFor="email">Email*</label>
            <input id="email" required placeholder="Email" {...email} />
          </div>
          <div id="register_password">
            <label htmlFor="password">Password*</label>
            <input
              id="password"
              required
              placeholder="Password"
              {...password}
            />
            <p>* At least 8 Characters *</p>
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password*</label>
            <input
              id="confirmPassword"
              required
              placeholder="Confirm Password"
              {...confirmPassword}
            />
          </div>

          <div></div>
          <button onClick={register} className="register_btn" type="submit">
            Register
          </button>
          <button onClick={handelLogin} className="navigantion_btn" type="button">
          <FontAwesomeIcon  icon={faLeftLong} size="xl" />

            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
