import "./loginPage.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";

// ZUSTAND STORE
import { useUserStore } from "../../store/userStore";

// FIREBASE
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";

// FIRESTORE
import { addUser } from "../../firebase/firestore";

export default function LoginPage() {
  // USESTORE
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const [mode, setMode] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [loaded, setLoaded] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nameRegex = /^.{3,15}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /.{5,}/;

    let nameValidation = nameRegex.test(name);
    let emailValidation = emailRegex.test(email);
    let passwordValidation = passwordRegex.test(password);

    if (!nameValidation) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (!emailValidation) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (!passwordValidation) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (
      // IF THE FORM'S MODE IS "REGISTER"
      mode === "register" &&
      nameValidation &&
      emailValidation &&
      passwordValidation
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => signInWithEmailAndPassword(auth, email, password))
        .then(() => addUser(name, email))
        .catch((e) => alert(e.message))
        .finally(() => {
          setLoaded(true);
        });
    } else if (
      // IF THE FORM'S MODE IS LOGIN
      mode === "login" &&
      emailValidation &&
      passwordValidation
    ) {
      signInWithEmailAndPassword(auth, email, password)
        .catch((e) => alert(e.message))
        .finally(() => {
          setLoaded(true);
        });
    }
  }

  function changeMode() {
    setName("");
    setEmail("");
    setPassword("");
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);

    if (mode === "login") {
      setMode("register");
    } else {
      setMode("login");
    }
  }

  return (
    <div className="login page">
      {user && <Navigate to="/realtime-chat/" />}
      {loaded && <Navigate to="/realtime-chat/" />}
      {mode === "login" ? <h1>Login</h1> : <h1>Register</h1>}

      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <>
            <label className={nameError ? "error" : undefined}>
              {nameError ? "The username must be 3-15 chars long" : "Username"}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </>
        )}

        <label className={emailError ? "error" : undefined}>
          {emailError ? "Email's format incorrect" : "Email"}
        </label>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label className={passwordError ? "error" : undefined}>
          {passwordError
            ? "Password must be at least 5 chars long."
            : "Password"}
        </label>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button>{mode === "login" ? "Login" : "Register"}</button>
      </form>

      <div className="info">
        {mode === "login" ? (
          <>
            <p>Are you a new user?</p>
            <p className="mode" onClick={() => changeMode()}>
              Register
            </p>
          </>
        ) : (
          <>
            <p>Do you already have a user?</p>
            <p className="mode" onClick={() => changeMode()}>
              Login
            </p>
          </>
        )}
      </div>
    </div>
  );
}
