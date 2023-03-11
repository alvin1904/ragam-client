import React, { useEffect, useState } from "react";
import "./Profile.css";
import { updateUserName, updatePassword } from "../../apis/index";
import { setLocalStorage } from "../../helper/StorageOperations";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import { themes, types } from "../../components/ErrorHandler/config";

export default function Settings({ data }) {
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

  const [details, setDetails] = useState(data);
  const [changeCredentials, setChangedCredentials] = useState({
    name: "",
    password: "",
    password1: "",
    password2: "",
  });

  const handleUsername = async () => {
    if (!changeCredentials.name)
      return showMessage("No username entered to change!");

    let data = { name: changeCredentials.name };
    try {
      let res = await updateUserName(data);
      const temp = {
        ...details,
        name: res.data.name,
      };
      setDetails(temp);
      setLocalStorage(temp);
      setChangedCredentials({ ...changeCredentials, name: "" });
      showMessage(
        "Username changed successfully!",
        themes.light,
        types.success
      );
    } catch (err) {
      console.log(res);
      showMessage((res.response && res.response.data.error) || res.message);
    }
  };

  const handlePassword = async () => {
    if (changeCredentials.password1.length < 6) {
      return showMessage("The passsword should be atleast 6 characters long");
    } else if (changeCredentials.password1 != changeCredentials.password2) {
      return showMessage("The passswords do not match");
    }
    let body = {
      currentPassword: changeCredentials.password,
      newPassword: changeCredentials.password1,
    };
    try {
      let res = await updatePassword(body);
      console.log(res);
      setChangedCredentials({
        ...changeCredentials,
        password: "",
        password1: "",
        password2: "",
      });
      if (res.status == 200)
        showMessage(
          "Password changed successfully",
          themes.light,
          types.success
        );
      else
        showMessage((res.response && res.response.data.error) || res.message);
    } catch (res) {
      console.log(res);
      showMessage((res.response && res.response.data.error) || res.message);
    }
  };

  return (
    <div className="interface_inside">
      <ErrorHandler show={show} {...messageProps} />
      <div className="settings_intf">
        <div className="profile_section">
          <h1 className="profile_welcome_main">
            Hey{" "}
            {details &&
              details.name &&
              details.name.substring(0, details.name.indexOf(" "))}
            ,
          </h1>
          <div className="profile_subsection">
            <h1 className="profile_welcome">Change Username: </h1>
            <span>Old Username:</span>
            <span className="p"> {details && details.name}</span>
            <br></br>
            <br></br>
            <span>New Username:</span>
            <span className="p">
              <input
                className="profile_changeU"
                value={changeCredentials.name}
                onChange={(e) => {
                  setChangedCredentials({
                    ...changeCredentials,
                    name: e.target.value,
                  });
                }}
              ></input>
            </span>
            <button className="profile_submit" onClick={handleUsername}>
              Click to change
            </button>
            <br></br>
          </div>
          <div className="profile_subsection">
            <h1 className="profile_welcome">Change Password: </h1>
            <span>Old password:</span>
            <span className="p">
              <input
                type="password"
                className="profile_changeU"
                value={changeCredentials.password}
                onChange={(e) => {
                  setChangedCredentials({
                    ...changeCredentials,
                    password: e.target.value,
                  });
                }}
              ></input>
            </span>
            <br></br>
            <br></br>
            <span>New password:</span>
            <span className="p">
              <input
                type="password"
                className="profile_changeU"
                value={changeCredentials.password1}
                onChange={(e) => {
                  setChangedCredentials({
                    ...changeCredentials,
                    password1: e.target.value,
                  });
                }}
              ></input>
            </span>
            <br></br>
            <br></br>
            <span>Enter the password again:</span>
            <span className="p">
              <input
                type="password"
                className="profile_changeU"
                value={changeCredentials.password2}
                onChange={(e) => {
                  setChangedCredentials({
                    ...changeCredentials,
                    password2: e.target.value,
                  });
                }}
              ></input>
            </span>
            <button className="profile_submit" onClick={handlePassword}>
              Click to change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
