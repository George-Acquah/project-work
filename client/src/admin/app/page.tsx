import Link from "next/link";
import Image from "next/image";
import { lusitana } from "./ui/font";
import { bodyBg, secondaryBg, strongTextColor, textColor } from "./ui/themes";
import SmartCarParkingAdminLogo from "./ui/dashboard/logos";

const SmartCarParkingAdminHome = () => {
  return (
    <main className={`flex min-h-screen flex-col p-6 ${secondaryBg}`}>
      {/* <div
        className={`flex justify-content items-center h-32 shrink-0 p-4 md:h-52 w-full rounded-lg ${secondaryBg} ${strongTextColor}`}
      >
        <div className="w-36 md:w-48">
          <SmartCarParkingAdminLogo home />
        </div>
        <p className="uppercase text-2xl md:text-4xl ml-4">
          Smart Car Parking Admin
        </p>
      </div> */}
      <div className="mt-4 flex grow flex-col gap-4 items-center xl:flex-row">
        <div
          className={`flex flex-col justify-center gap-6 rounded-lg  px-6 py-10 xl:w-2/5 md:px-12 lg:px-20 xl:p-16 ${bodyBg} xl:h-[530px]`}
        >
          <p
            className={`text-xl ${textColor} md:text-3xl md:leading-normal ${lusitana.className}`}
          >
            <strong className={strongTextColor}>
              Welcome to the Smart Car Parking Admin Portal.
            </strong>{" "}
            <span className="">Feel lost? </span>
            <Link
              href="http://localhost:3000"
              className="text-blue-500"
              passHref
            >
              request for mobile app link.
            </Link>
            <br />
            Explore the admin portal and streamline your parking management
            experience.
          </p>
          <Link
            href="/auth/login"
            className="flex items-center gap-5 self-start rounded-lg custom px-6 py-3 text-sm font-medium text-white transition-colors bg-custom-button hover:bg-blue-400 md:text-base"
            passHref
          >
            Log In
          </Link>
        </div>
        <div className="flex items-center justify-center rounded-lg">
          <Image
            src="/admin-scp.vercel.app_dashboard_light.png"
            width={1000}
            height={560}
            priority
            className="hidden md:block rounded-lg"
            alt="Screenshots of Dashboard project"
          />
          <Image
            src="/admin-scp.vercel.app_dashboard_mobile.png"
            width={560}
            height={820}
            priority
            className="md:hidden"
            alt="Screenshots of Dashboard project"
          />
        </div>
      </div>
    </main>
  );
};

export default SmartCarParkingAdminHome;
