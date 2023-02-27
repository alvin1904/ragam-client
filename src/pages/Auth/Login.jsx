import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useUserAuthContext } from "../../context/userAuth";
import { getDetails, setHead } from "../../apis";

export default function Login() {
  const navigate = useNavigate();
  const [forgotP, setForgotP] = useState(false);
  const [err, setErr] = useState("");
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const { loginUser } = useUserAuthContext();

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
          console.log(err);
        });
    }
    //CHECKING IF THERE IS A TOKEN IN STORAGE
  }, []);

  const handleLogin = async () => {
    if (details.email == 0 || details.password == "")
      setErr("Enter credentials and try again");
    else if (details.password.length < 6)
      setErr("Enter a valid password and try again");
    else {
      setErr("");
      const res = await loginUser(details);
      if (res && res.data && res.status == 200) {
        navigate("/home");
      } else if (
        res &&
        res.response &&
        res.response.data &&
        res.response.data.error
      )
        setErr(res.response.data.error);
      else setErr("The server is down");
    }
  };
  return (
    <div className="login">
      <section className="login_section">
        {!forgotP && (
          <>
            <h1>Login</h1>
            <div className="login_form">
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
            </div>
            <div className={`error ${err ? "message" : ""}`}>{err}</div>
            <button className="login_btn" onClick={handleLogin}>
              Login
            </button>
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
