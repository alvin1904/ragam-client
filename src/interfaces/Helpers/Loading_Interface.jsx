import React from "react";
import loadingGIF from '../../assets/loading.gif'

export default function Loading_Interface() {
  return (
    <div className="interface_inside">
      <div className="error_intf">
        <img src={loadingGIF} alt="Loading" className="loadinggif"/>
        It's cooking. Have patience!
      </div>
    </div>
  );
}
