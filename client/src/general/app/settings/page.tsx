import { auth } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      <h1 className="text-2xl">Settings Page</h1>
      <div className="a">{JSON.stringify(session)}</div>
    </div>
  );
}

export default SettingsPage