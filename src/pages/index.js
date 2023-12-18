import React from "react";
import Header from "../components/Header.js";
import MainBody from "../components/MainBody.js";
export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-10/12 h-full bg-amber-500 bg-opacity-90">
        <Header />
        <MainBody />
      </div>
    </div>
  );
}
