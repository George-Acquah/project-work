import { auth } from "@/auth";

export default async function SettingsPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="">
      <h1 className="text-center ">{ JSON.stringify(user)}</h1>
    </div>
  );
}
