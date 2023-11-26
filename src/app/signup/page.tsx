import SignUpForm from "@/components/SignUpForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";

export default async function signup() {
  const session = await getServerSession(nextAuthOptions);

  if (session) redirect("/dashboard");

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <SignUpForm />
    </main>
  );
}
