import React, { useEffect, useState } from "react";
import { getFromLocalStorage } from "../../helper/StorageOperations";

export default function ProfileDetails() {
  const [data, setData] = useState(getFromLocalStorage("details"));
  useEffect(() => {
    if (!data || data.length == 0) setData(getFromLocalStorage("details"));
  }, []);
  
  return (
    <div className="profile_section">
      <h1 className="profile_welcome_main">
        Hey
        {data && data.name && data.name.substring(0, data.name.indexOf(" "))},
      </h1>
      <div className="profile_subsection">
        <h1 className="profile_welcome">Profile data</h1>
        <span>Name:</span>
        <span className="p"> {data && data.name}</span>
        <br></br>
        <span>Email:</span>
        <span className="p"> {data && data.email}</span>
      </div>
      <div className="profile_subsection">
        <h1 className="profile_welcome">Profile Verification</h1>
        <span>Status:</span>
        <span className="p">
          {data && data.verified ? "VERIFIED :)" : "NOT VERIFIED"}
        </span>
        <br></br>
        {data && !data.verified && (
          <span>
            Go to inbox and click on VERIFY to start enjoying our services. :)
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
  );
}
