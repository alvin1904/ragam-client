import React from "react";
import Controller from "../components/MediaPlayer/Controller";
import AppInterface from "../pages/interfaceMgmt/AppInterface";

export default function Home() {
  return (
    <div className="App">
      <AppInterface />
      <Controller />
    </div>
  );
}
