import React from "react";
import errGIF from '../../assets/err.gif'

export default function Error_Interface({data}) {
  console.log(data)
  return (
    <div className="interface_inside">
      <div className="error_intf">
        <img src={errGIF} alt="Loading" className="errorgif"/>
        Something's not right! We are working on it.
      </div>
    </div>
  );
}
