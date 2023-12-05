import { lusitana } from "@/app/ui/font";
import Link from "next/link";
import Image from "next/image";

export default function SmartCarParkingAdminLogo({ home }: { home?: boolean }) {
  return (
    <div
      className={`${lusitana.className} flex flex-row justify-between items-center leading-none `}
    >
      <Link href={home ? "/" : "/dashboard"}>
        <Image
          src="/Scpl.png"
          width={100}
          height={120}
          className={` mx-0 -ml-2 -mb-1 ${
            home ? "h-28 w-48 md:h-40 md:w-48" : "h-20 w-32"
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
      src="/Scpl.png"
      width={160}
      height={120}
      className="h-12 w-40 mx-0 -ml-6"
      alt="brand-logo"
    />
  );
}
