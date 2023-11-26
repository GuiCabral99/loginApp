"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Todos os campos devem ser preenchidos");
    }

    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("Usuário já cadastrado.");
        return;
      }

      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-4 rounded-lg border-t-4 border-emerald-400">
        <h1 className="text-xl font-bold my-4">Cadastre-se</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded"
          >
            Cadastrar
          </button>
          {error && (
            <div className="bg-red-600 text-white text-sm w-fit py-1 px-4 rounded-sm mt-2">
              {error}
            </div>
          )}
          <Link href={"/"} className="text-sm mt-4 text-right">
            Já tem uma conta? <span className="underline">Conecte-se</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
