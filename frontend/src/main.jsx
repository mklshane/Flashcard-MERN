import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import UpdateCard from "./UpdateCard.jsx";
import Landing from "./Landing.jsx";
import Deck from "./Deck.jsx";
import CreateDeck from "./CreateDeck.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/decks" element={<Deck />} />
      <Route path="/decks/:deckId" element={<App />} />
      <Route path="/decks/:deckId/update/:id" element={<UpdateCard />} />
      <Route path="/create-deck" element={<CreateDeck />} />
    </Routes>
  </BrowserRouter>
);
