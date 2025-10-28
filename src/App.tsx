import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Admin } from "./pages/admin";
import { Login } from "./pages/login";
import { Social } from "./pages/social";
import { Private } from "./routes/Private";
import { NotFound } from "./pages/error";

const router = createBrowserRouter([
  {path: '/', element: <Home />},
  {path: '/admin', element: <Private><Admin /></Private> },
  {path: '/login', element: <Login />},
  {path: '/admin/social', element: <Social />},
  {path: '*', element: <NotFound/>}
]);

export { router }; 