import SignInForm from "@/components/SignInForm";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "./api/auth/[...nextauth]/rou:te";

export default async function Home() {
  // const session = await getServerSession(authOptions);

  // if (session) redirect("/dashboard");
  return (
    <main>
      <SignInForm />
    </main>
  );
}
