import { auth } from "@/auth";
import { AuthRequiredError } from "../lib/exceptions";

const DriverLayout = async ({ children }: _IChildren) => {
  const session = await auth();
  if (!session?.access_token) {
    
  }
  return (
    <section className="pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">{children}</div>
    </section>
  );
};

export default DriverLayout;
