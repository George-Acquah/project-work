import { inter } from "@/app/ui/font";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/Scpl.png";

export default function SmartCarParkingAdminLogo({ home }: { home?: boolean }) {
  return (
    <div
      className={`${inter.className} flex flex-row justify-between items-center leading-none `}
    >
      <Link href={home ? "/" : "/dashboard"}>
        <Image
          src={logo}
          width={120}
          height={30}
          priority
          className={`mx-0 -ml-2 -mb-1 ${
            home ? "h-28 w-48 md:h-40 md:w-48" : ""
          }`}
          alt="brand-logo"
        />
      </Link>
    </div>
  );
}

export function LinklessLogo() {
  return (
    <Image
      src={logo}
      // width={160}
      // height={120}
      priority
      className="h-12 w-40 mx-0 -ml-6"
      alt="brand-logo"
    />
  );
}
