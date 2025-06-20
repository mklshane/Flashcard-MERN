// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import FlashcardPage from "./FlashcardPage.jsx";
import SignIn from "./SignIn.jsx";
import Deck from "./Deck.jsx";
import SignUp from "./SignUp.jsx";
import Landing from "./Landing.jsx";
import SignInVer2 from "./SignInVer2.jsx";
import Flashcards from "./Flashcards.jsx";
import SpacedRepetitionPage from "./SpacedRep.jsx";
import { useFirebaseAuthReady } from "./hooks/useFirebaseAuthReady.js";

const App = () => {
  const authReady = useFirebaseAuthReady();

  if (!authReady) return <div>Loading authentication...</div>; // wait until firebase checks user

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/decks" element={<Deck />} />
      <Route path="/decks/:deckId" element={<FlashcardPage />} />
      <Route path="/allFlashcards/:deckId?" element={<Flashcards />} />
      <Route
        path="/spaced-repetition/:deckId?"
        element={<SpacedRepetitionPage />}
      />
    </Routes>
  );
};

export default App;
