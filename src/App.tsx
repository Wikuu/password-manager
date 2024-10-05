import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DecryptPage from "./pages/DecryptPage";
import EncryptPage from "./pages/EncryptPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/encrypt",
    element: <EncryptPage />,
  },
  {
    path: "/decrypt",
    element: <DecryptPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
