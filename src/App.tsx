import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./pages/MainPage";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/realtime-chat/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
      </Route>
    )
  );

  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}
