import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLoginPage from "./pages/MainLoginPage";
import { Provider } from "react-redux";
import PrivateRoute from "./security/PrivateRoute";
import store from "./store";
import MainHomePage from "./pages/MainHomePage";
import MainProfilePage from "./pages/MainProfilePage";
import BlogDraftPage from "./pages/BlogDraftPage";
import BlogContentBox from "./components/BlogContentBox";
import BlogPage from "./pages/BlogPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<MainLoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/quirky/home" element={<MainHomePage />} />
        <Route path="/quirky/:userId" element={<MainProfilePage/> } />
        <Route path="/quirky/:userId/quirkyPost" element={<BlogDraftPage/> } />
        <Route path="/quirky/:userId/quirkyPost/content" element={<BlogContentBox/> } />
        <Route path="/quirky/:userId/quirkyPost/content/:blogId" element={<BlogPage/> } />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// Measure performance in your app
reportWebVitals(console.log);