import React from "react";
import "./Profile.css";

export default function Profile_Interface() {
  const details = {
    name: "Alvin Varghese",
    email: "alvin19official@gmail.com",
    verified: false,
  };

  return (
    <div className="interface_inside">
      <div className="profile_intf">
        <div className="profile_section">
          <h1 className="profile_welcome_main">
            Hey {details.name.substring(0, details.name.indexOf(" "))},
          </h1>
          <div className="profile_subsection">
            <h1 className="profile_welcome">Profile Details</h1>
            <span>Name:</span>
            <span className="p"> {details.name}</span>
            <br></br>
            <span>Email:</span>
            <span className="p"> {details.email}</span>
          </div>
          <div className="profile_subsection">
            <h1 className="profile_welcome">Profile Verification</h1>
            <span>Status:</span>
            <span className="p">
              {details.verified ? "VERIFIED :)" : "NOT VERIFIED"}
            </span>
            <br></br>
            {!details.verified && (
              <span>
                Go to inbox and click on VERIFY to start enjoying our services.
                :)
              </span>
            )}
          </div>
          <div className="profile_subsection">
            <h1 className="profile_welcome">Change username / password</h1>
            <span>
              Go over to <span className="p">SETTINGS</span> to update username or
              password
            </span>
          </div>
        </div>
        <div className="profile_section playlist_section">
          <h1 className="profile_welcome">Playlists created by you</h1>
        </div>
      </div>
    </div>
  );
}
