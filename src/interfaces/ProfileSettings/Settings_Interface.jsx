import React, { useState } from "react";
import "./Profile.css";
import { updateUserName, updatePassword } from "../../apis/index";
import { setLocalStorage } from "../../helper/StorageOperations";

export default function Settings({ data }) {
  const [details, setDetails] = useState(data);
  const [changeCredentials, setChangedCredentials] = useState({
    name: "",
    password: "",
    password1: "",
    password2: "",
    alert1: false,
    alert2: false,
  });

  const handleUsername = async () => {
    if (!changeCredentials.name) return { message: "no username to chanhge" };

    let body = { name: changeCredentials.name };
    try {
      let res = await updateUserName(body);
      const temp = {
        ...details,
        name: res.data.name,
      };
      setDetails(temp);
      setLocalStorage(temp);
      setChangedCredentials({ ...changeCredentials, name: "" });
    } catch (err) {
      console.log("error");
      console.log(err);
    }
  };

  const handlePassword = async () => {
    if (changeCredentials.password1.length < 6) {
      setChangedCredentials({ ...changeCredentials, alert1: true });
      return { message: "alert already sent" };
    } else if (changeCredentials.password1 != changeCredentials.password2) {
      setChangedCredentials({ ...changeCredentials, alert2: true });
      return { message: "alert already sent" };
    }
    setChangedCredentials({
      ...changeCredentials,
      alert1: false,
      alert2: false,
    });
    //send req
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
      if (res.status == 200) return { message: res.data.message };
      //success handle here
    } catch (err) {
      //error handle here
      console.log(err.response.data.error);
      console.log(err);
    }
  };

  return (
    <div className="interface_inside">
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
            <span
              className={`${changeCredentials.alert1 ? "alerted" : ""} msg`}
            >
              The password must contain min 6 characters
            </span>
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
            <br></br>
            <br></br>
            <span
              className={`${changeCredentials.alert2 ? "alerted" : ""} msg`}
            >
              The passwords doesn't match.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
