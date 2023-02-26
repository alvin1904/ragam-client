import React, { useState } from "react";

export default function Settings({ data }) {
  console.log(data);
  const details = {
    name: "Alvin Varghese",
    email: "alvin19official@gmail.com",
    verified: false,
  };

  const [changeCredentials, setChangedCredentials] = useState({
    username: "",
    password: "",
    password1: "",
    password2: "",
    alert1: false,
    alert2: false,
  });

  const handleUsername = () => {
    //send req
  };

  const handlePassword = () => {
    console.log(changeCredentials);
    if (changeCredentials.password1.length < 6) {
      setChangedCredentials({ ...changeCredentials, alert1: true });
    } else if (changeCredentials.password1 != changeCredentials.password2) {
      setChangedCredentials({ ...changeCredentials, alert2: true });
    } else {
      setChangedCredentials({
        ...changeCredentials,
        alert1: false,
        alert2: false,
      });
      //send req
    }
  };

  return (
    <div className="interface_inside">
      <div className="settings_intf">
        <div className="profile_section">
          <h1 className="profile_welcome_main">
            Hey {details.name.substring(0, details.name.indexOf(" "))},
          </h1>
          <div className="profile_subsection">
            <h1 className="profile_welcome">Change Username: </h1>
            <span>Old username:</span>
            <span className="p"> {details.name}</span>
            <br></br>
            <br></br>
            <span>New username:</span>
            <span className="p">
              <input
                className="profile_changeU"
                value={changeCredentials.username}
                onChange={(e) => {
                  setChangedCredentials({
                    ...changeCredentials,
                    username: e.target.value,
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
