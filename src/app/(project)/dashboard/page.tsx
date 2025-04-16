import { handleSignOut } from "@/app/actions/handle-auth";
import { auth } from "@/app/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-gray-800">Protected Dashboard</h1>
      <p>{session?.user?.email ? "Logged in" : "Not logged in"}</p>
      {session.user?.email && (
        <form action={handleSignOut}>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Signout
          </button>
        </form>
      )}
      <Link href="/pagamentos">Pagamentos</Link>
    </div>
  );
}
