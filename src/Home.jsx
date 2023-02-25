import React from "react";
import Controller from "./components/Controller";
import AppInterface from "./pages/AppInterface";

export default function Home() {
  return (
    <div className="App">
      <AppInterface />
      <Controller />
    </div>
  );
}
