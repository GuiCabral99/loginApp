"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
      <div>
        Nome: <span className="font-bold">{session?.user?.name}</span>
      </div>
      <div>
        Email: <span className="font-bold">{session?.user?.email}</span>
      </div>
      <button
        onClick={() => signOut()}
        className="bg-red-600 text-white font-bold px-6 py-2 mt-4"
      >
        Sair
      </button>
    </div>
  );
}
