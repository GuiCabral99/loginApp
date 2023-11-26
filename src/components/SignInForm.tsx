"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInForm() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Preencha todos os campos.");
    } else {
      setError("");
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Preencha os campos corretamente.");
        return;
      }
      router.replace("/dashboard");
    } catch (error) {}
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-4 rounded-lg border-t-4 border-emerald-400">
        <h1 className="text-xl font-bold my-4">Boas vindas!</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            Entrar
          </button>
          {error && (
            <div className="bg-red-600 text-white text-sm w-fit py-1 px-4 rounded-sm mt-2">
              {error}
            </div>
          )}
          <Link href={"/signup"} className="text-sm mt-4 text-right">
            Não tem uma conta? <span className="underline">Cadastre-se</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
