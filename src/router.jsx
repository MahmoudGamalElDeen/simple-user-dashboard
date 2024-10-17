import {
  createBrowserRouter,
} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import UserDetailsPage from "./pages/UserDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/user/:id",
    element: <UserDetailsPage />,
  },
]);

export default router;
