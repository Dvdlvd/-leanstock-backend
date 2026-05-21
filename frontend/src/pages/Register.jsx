import { useState }
  from "react";

import api from "../services/api";

export default function Register({
  goLogin
}) {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const register = async () => {

    try {

      const response =
        await api.post(
          "/auth/register",
          {
            email,
            password,
            role: "ADMIN"
          }
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
          Register
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

        {message && (

          <p className="mb-4 text-zinc-400">
            {message}
          </p>

        )}

        <button
          onClick={register}
          className="w-full bg-white text-black p-3 rounded font-bold"
        >
          Register
        </button>

        <p
          onClick={goLogin}
          className="mt-4 text-zinc-400 cursor-pointer"
        >
          Already have account? Login
        </p>

      </div>

    </div>

  );

}