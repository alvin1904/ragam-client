import "./Login.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import { themes, types } from "../../components/ErrorHandler/config";
import { registerApi } from "../../apis/auth";

export default function Register() {
  //ERROR HANDLER START
  const [show, setShow] = useState(false);
  const [messageProps, setMessageProps] = useState({});
  const showMessage = (text, theme, type) => {
    setMessageProps({ message: text, themes: theme, types: type });
    setShow(true);
  };
  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [show]);
  //ERROR HANDLER END

  const [details, setDetails] = useState({
    email: "",
    password: "",
    password1: "",
    name: "",
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (details.password == "" || details.email == "" || details.name == "")
      return showMessage(
        "Enter credentials and try again",
        themes.light,
        types.warning
      );
    else if (details.password.length < 6)
      return showMessage(
        "Password should be min 6 chars long",
        themes.light,
        types.warning
      );
    else if (details.password !== details.password1) {
      return showMessage("The passwords do not match");
    }
    let temp = { ...details };
    delete temp.password1;
    const res = await registerApi(temp);
    if (res.status && (res.status == 200 || res.status == 201))
      showMessage(
        "Account created. Go to your inbox and verify email.",
        themes.light,
        types.info
      );
    else showMessage((res.response && res.response.data.error) || res.message);
  };

  return (
    <div className="login">
      <ErrorHandler show={show} {...messageProps} />
      <section className="login_section register_section">
        <h1>Register</h1>
        <form className="login_form transition_1" onSubmit={handleRegister}>
          <input
            type="text"
            value={details.name}
            placeholder="Enter your name"
            onChange={(e) => {
              setDetails({ ...details, name: e.target.value });
            }}
          />
          <input
            type="text"
            value={details.email}
            placeholder="Enter your email"
            onChange={(e) => {
              setDetails({ ...details, email: e.target.value });
            }}
          />
          <input
            type="password"
            value={details.password}
            placeholder="Enter your password"
            onChange={(e) => {
              setDetails({ ...details, password: e.target.value });
            }}
          />
          <input
            type="password"
            value={details.password1}
            placeholder="Enter your password again"
            onChange={(e) => {
              setDetails({ ...details, password1: e.target.value });
            }}
          />
          <button className="login_btn" type="submit">
            Register
          </button>
        </form>
        <div className="alternative_signup">
          <p>
            Already a member?{` `}
            <span className="transition_1" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
