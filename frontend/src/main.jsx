import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import GamePage from "./pages/GamePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import HowToPage from "./pages/HowToPage.jsx";
import LeaderBoardsPage from "./pages/LeaderboardsPage.jsx";
import LobbyPage from "./pages/LobbyPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LobbyPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/howto",
    element: <HowToPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/leaderboards",
    element: <LeaderBoardsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/game/:gameid",
    element: <GamePage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

//entry point for BrwoserRouter according to https://reactrouter.com/en/main/start/tutorial
