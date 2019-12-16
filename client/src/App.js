import React from "react";

import NavBar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Landing />

      <Footer />
    </div>
  );
}

export default App;
