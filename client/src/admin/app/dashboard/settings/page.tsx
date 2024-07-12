import { auth } from "@/auth";

export default async function Layout({ children }: _IChildren) {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="">
      <h1 className="text-center ">{ JSON.stringify(user)}</h1>
    </div>
  );
}
