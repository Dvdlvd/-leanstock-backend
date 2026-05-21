import { useState }
  from "react";

import api from "../services/api";

export default function ForgotPassword({
  goLogin
}) {

  const [email, setEmail] =
    useState("");

  const [message, setMessage] =
    useState("");

  const sendReset = async () => {

    try {

      const response =
        await api.post(
          "/auth/forgot-password",
          { email }
        );

      setMessage(
        response.data.message
      );

    } catch (err) {

      setMessage(
        err.response?.data?.error
      );

    }

  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center text-white">

      <div className="bg-zinc-900 p-8 rounded-2xl w-[400px]">

        <h1 className="text-3xl font-bold mb-6">
          Forgot Password
        </h1>

        <input
          placeholder="Email"
          className="w-full p-3 rounded bg-zinc-800 mb-4"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        {message && (

          <p className="mb-4 text-zinc-400">
            {message}
          </p>

        )}

        <button
          onClick={sendReset}
          className="w-full bg-white text-black p-3 rounded font-bold"
        >
          Send Reset Link
        </button>

        <p
          onClick={goLogin}
          className="mt-4 text-zinc-400 cursor-pointer"
        >
          Back to Login
        </p>

      </div>

    </div>

  );

}