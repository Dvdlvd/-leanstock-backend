import { useState }
  from "react";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword
  from "./pages/ForgotPassword";

export default function App() {

  const token =
    localStorage.getItem("token");

  const [page, setPage] =
    useState("login");

  if (token) {
    return <Dashboard />;
  }

  if (page === "register") {

    return (
      <Register
        goLogin={() =>
          setPage("login")
        }
      />
    );

  }

  if (page === "forgot") {

    return (
      <ForgotPassword
        goLogin={() =>
          setPage("login")
        }
      />
    );

  }

  return (

    <Login
      goRegister={() =>
        setPage("register")
      }

      goForgot={() =>
        setPage("forgot")
      }
    />

  );

}