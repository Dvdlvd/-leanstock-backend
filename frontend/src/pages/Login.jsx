import { useState } from "react";

import api from "../services/api";

export default function Login({
  goRegister,
  goForgot
}) {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const login = async () => {

    try {

      const response =
        await api.post(
          "/auth/login",
          {
            email,
            password
          }
        );

      localStorage.setItem(
        "token",
        response.data.accessToken
      );

      window.location.reload();

    } catch (err) {

      setError(
        err.response?.data?.error
      );

    }

  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center text-white">

      <div className="bg-zinc-900 p-8 rounded-2xl w-[400px]">

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          placeholder="Email"
          className="w-full p-3 rounded bg-zinc-800 mb-4"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-zinc-800 mb-4"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {error && (

          <p className="text-red-500 mb-4">
            {error}
          </p>

        )}

        <button
          onClick={login}
          className="w-full bg-white text-black p-3 rounded font-bold"
        >
          Login
        </button>

        <p
          onClick={goForgot}
          className="mt-4 text-zinc-400 cursor-pointer"
        >
          Forgot password?
        </p>

        <p
          onClick={goRegister}
          className="mt-2 text-zinc-400 cursor-pointer"
        >
          No account? Register
        </p>

      </div>

    </div>

  );

}