import React from "react";
import Controller from "../components/MediaPlayer/Controller";
import { SongProvider } from "../context/songContext";
import AppInterface from "../pages/interfaceMgmt/AppInterface";

export default function Home() {
  return (
    <div className="App">
      <SongProvider>
        <AppInterface />
        <Controller />
      </SongProvider>
    </div>
  );
}
