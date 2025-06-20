// hooks/useFirebaseAuthReady.js
import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import axios from "axios";

export const useFirebaseAuthReady = () => {
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        console.log("🔐 Token set on Axios");
      } else {
        delete axios.defaults.headers.common.Authorization;
        console.log("🚫 No user, token removed");
      }

      setAuthReady(true); // 🔁 Notify the app that Firebase is done
    });

    return () => unsubscribe();
  }, []);

  return authReady;
};
