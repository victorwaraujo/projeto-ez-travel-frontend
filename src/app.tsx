// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
import { HashRouter, Route, Routes } from "react-router-dom"
import {CreateTripPage} from "./pages/create-trip";
import { TripDetailsPage } from "./pages/trip-details";
import { LoginPage } from "./pages/auth/login";
import { RegisterPage } from "./pages/auth/register";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/trips/:tripId" element={<TripDetailsPage />} />
        <Route path="/trip-page" element={<CreateTripPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </HashRouter>
  );
}


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LoginPage/>,
//   },
//   {
//     path: "/trips/:tripId",
//     element: <TripDetailsPage/>
//   },
//   {
//     path: "/trip-page",
//     element: <CreateTripPage />
//   },
//   {
//     path: "/register",
//     element: <RegisterPage />
//   }
// ]);

// function App() {
//   return <RouterProvider router={router} />
// }

export default App
