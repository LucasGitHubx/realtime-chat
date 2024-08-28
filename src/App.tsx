import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/realtime-chat/">
        <Route index element={<h1>hola</h1>} />
      </Route>
    )
  );

  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}
