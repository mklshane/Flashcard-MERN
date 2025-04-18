import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import UpdateCard from "./UpdateCard.jsx";
import Landing from "./Landing.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/app" element={<App />} />
      <Route path="/update/:id" element={<UpdateCard />} />
    </Routes>
  </BrowserRouter>
);
