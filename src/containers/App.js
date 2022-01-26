import React, { Suspense } from "react";
import { useRoutes, BrowserRouter } from "react-router-dom";

const Login = React.lazy(() => import("./Login"));
const SignUp = React.lazy(() => import("./Signup"));
const Logout = React.lazy(() => import("./Logout"));
const Dashboard = React.lazy(() => import("./Dashboard"));
const CreateRound = React.lazy(() => import("./CreateRound"));
const RoundDetail = React.lazy(() => import("./RoundDetail"));

const publicRoutes = [
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <div>404</div>
      </Suspense>
    ),
  },
];

const privateRoutes = [
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: "/create-round/*",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <CreateRound />
      </Suspense>
    ),
  },
  {
    path: "/round-detail/*",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <RoundDetail />
      </Suspense>
    ),
  },
  {
    path: "/logout",
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <Logout />
      </Suspense>
    ),
  },
];

const AppWrapper = () => {
  const App = () => useRoutes([...publicRoutes, ...privateRoutes]);
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;
