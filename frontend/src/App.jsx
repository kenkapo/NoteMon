import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import Page404 from "./pages/404Page";
import TestComp from "./features/test";
import Protected from "./features/Protected";
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected><HomePage></HomePage></Protected>
    ),
  },
  {
    path: '/login',
    element: (
      <LoginPage></LoginPage>
    ),
  },
  {
    path: '/signup',
    element: (
      <SignupPage></SignupPage>
    ),
  },
  {
    path: '/profile',
    element: (
      <Protected><ProfilePage></ProfilePage></Protected>
    ),
  },
  {
    path: '*',
    element: (
      <Page404></Page404>
    ),
  },

])

export default function App() {
  return (<RouterProvider router={router} />);
}