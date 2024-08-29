import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/realtime-chat/" element={<MainLayout />}>
        <Route index />
      </Route>
    )
  );

  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}
