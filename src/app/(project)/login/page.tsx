import { handleAuth } from "@/app/actions/handle-auth";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form action={handleAuth}>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Signin with Google
        </button>
      </form>
    </div>
  );
}
