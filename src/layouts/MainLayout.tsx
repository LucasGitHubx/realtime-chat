import { Outlet, NavLink } from "react-router-dom";
import "./mainLayout.css";

export default function MainLayout() {
  return (
    <>
      <header>
        <img
          src="https://cdn-icons-png.freepik.com/512/5962/5962463.png"
          alt="message icon"
        />
        <h1>RealTime chat</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
