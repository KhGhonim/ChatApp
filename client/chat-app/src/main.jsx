import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/home.jsx";
import ReactDOM from "react-dom/client";
import React from "react";
import SignIn from "./Pages/auth/SignIn/SignIn.jsx";
import Register from "./Pages/auth/SignUp/Register.jsx";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import CurrentUserState from "./Redux/CurrentUserState.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route  element={<CurrentUserState />}>

      <Route index element={<Home />} />
      </Route>
      {/* ... etc. */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
