import "./mainPage.css";
import { useEffect } from "react";
import { useUserStore } from "../store/userStore";

// FIREBASE
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function MainPage() {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="main-page page">{user ? <h1>Hola</h1> : <h1>Chau</h1>}</div>
  );
}
