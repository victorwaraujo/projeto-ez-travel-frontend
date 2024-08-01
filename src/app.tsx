import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {CreateTripPage} from "./pages/create-trip";
import { TripDetailsPage } from "./pages/trip-details";
import { LoginPage } from "./pages/auth/login";
import { RegisterPage } from "./pages/auth/register";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage/>
  },
  {
    path: "/trip-page",
    element: <CreateTripPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
