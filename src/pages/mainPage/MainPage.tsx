import "./mainPage.css";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

// ZUSTAND STORES
import { useUserStore } from "../../store/userStore";
import { useClientStore } from "../../store/clientStore";

// FIREBASE
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getUser } from "../../firebase/firestore";

export default function MainPage() {
  const { username, email, setUsername, setEmail } = useClientStore(
    (state) => ({
      username: state.username,
      email: state.email,
      setUsername: state.setUsername,
      setEmail: state.setEmail,
    })
  );
  const { currentUser, setUser } = useUserStore((state) => ({
    currentUser: state.user,
    setUser: state.setUser,
  }));

  async function handleLogout() {
    await signOut(auth);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (user) {
        getUser(user.email!, setEmail, setUsername);
      }
    });
  }, []);

  return (
    <div className="main-page page">
      {currentUser ? (
        <article className="main-text">
          <h1 className="benvenutti">
            Hello <i>{username}</i>
          </h1>
          <p onClick={() => handleLogout()}>Want to log out? click here</p>
        </article>
      ) : (
        <Navigate to="/realtime-chat/login" />
      )}
    </div>
  );
}
