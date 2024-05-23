import Navbar from "./navbar";
import { fetchUser } from "./data";
import { auth } from "@/auth";

export default async function Nav() {
  const session = await auth();
  const user = session?.user;
  return <Navbar user={user} />;
}
