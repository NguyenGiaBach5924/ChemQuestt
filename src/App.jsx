import React, { useState } from "react";
import Home from "./components/login";
import MainApp from "./components/MainApp";
import { Routes, Route } from "react-router-dom";
import Book from "./components/book";
import EndGame from "./components/endGame";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/main" element={<MainApp />} />
      <Route path="/book" element={<Book />} />
      <Route path="/endgame" element={<EndGame />} />
      {/* Add other routes as needed */}
    </Routes>
  );
}

export default App;
