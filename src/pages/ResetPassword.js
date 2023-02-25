import React from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { updatePassword } from "../api";

const ResetPassword = () => {
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  const handelUpdatePassword = async () => {
    if (!id) {
      return toast.error("AccessToken not found, request agian");
    }
    if (!password || !confirmPassword) {
      return toast.error("Please Fill All The Feilds");
    }

    if (password.length < 8) {
      return toast.error("Password is Short");
    }
    if (password !== confirmPassword) {
      return toast.error("Password and confirmPassword is't matching");
    }

    const response = await updatePassword(id, password);
    if (response.success) {
      toast.success(response.message);
      history.push("/login");
      setConfirmPassword("");
      setPassword("");
    } else {
      toast.error(response.message);
      setConfirmPassword("");
      setPassword("");
    }
  };
  return (
    <div className="resetPassword_wrapper">
      <form>
        <div>
          <label>Password :</label>
          <input
            placeholder="More then 8 characters"
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password :</label>
          <input
            type={"password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="btn_wrapper">
          <button type="button" onClick={handelUpdatePassword}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
