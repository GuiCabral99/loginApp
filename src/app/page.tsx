import SignInForm from "@/components/SignInForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);

  if (session) redirect("/dashboard");
  return (
    <main>
      <SignInForm />
    </main>
  );
}
