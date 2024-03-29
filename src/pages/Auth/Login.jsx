import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { getDetails, setHead } from "../../apis";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import { loginApi } from "../../apis/auth";
import { themes, types } from "../../components/ErrorHandler/config";

export default function Login() {
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

  const navigate = useNavigate();
  const [forgotP, setForgotP] = useState(false);
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    let temp = localStorage.getItem("details");
    if (temp) {
      let token = JSON.parse(temp).token;
      setHead(token);
      getDetails()
        .then((res) => {
          if (res.status == 200 && res.data) navigate("/home");
        })
        .catch((err) => {
          showMessage(
            "Please login to use our services",
            themes.light,
            types.warning
          );
          return err;
        });
    }
    //CHECKING IF THERE IS A TOKEN IN STORAGE
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (details.email == 0 || details.password == "")
      showMessage("Enter credentials and try again");
    else if (details.password.length < 6)
      showMessage("Enter a valid password and try again");
    else {
      const res = await loginApi(details);
      if (res.status && (res.status == 200 || res.status == 201))
        navigate("/home");
      else
        showMessage((res.response && res.response.data.error) || res.message);
    }
  };
  return (
    <div className="login">
      <ErrorHandler show={show} {...messageProps} />
      <section className="login_section">
        {!forgotP && (
          <>
            <h1>Login</h1>
            <form className="login_form" onSubmit={handleLogin}>
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
              <p
                className="transition_1"
                onClick={() => {
                  if (details.email) setForgotP(true);
                  else setForgotP(false);
                }}
              >
                Forgot password?
              </p>
              <button className="login_btn" type="submit">
                Login
              </button>
            </form>
            <div className="alternative_signup">
              <p>
                Not a member?{` `}
                <span
                  className="transition_1"
                  onClick={() => navigate("/register")}
                >
                  Register
                </span>
              </p>
            </div>
          </>
        )}
        {forgotP && (
          <div className="forgotP">
            A mail has been sent to the email {details.email}. Check your inbox
            and follow the steps given in the link.
          </div>
        )}
      </section>
    </div>
  );
}
