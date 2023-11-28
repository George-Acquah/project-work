import { lusitana } from '@/app/ui/font';
import Link from 'next/link';
import Image from "next/image";

export default function AcmeLogo({ home }: { home?: boolean}) {
  return (
    <div
      className={`${lusitana.className} flex flex-row justify-between items-center leading-none `}
    >
      <Link href={ home ? "/" : "/dashboard" }>
        <Image
          src="/AUC-web.png"
          width={160}
          height={120}
          className={`h-12 w-60 mx-0 -ml-6 ${home ? "md:h-20 md:w-72" : ""}`}
          alt="brand-logo"
        />
      </Link>
    </div>
  );
}

export function LinklessLogo() {
  return (
    <Image
      src="/AUC-web.png"
      width={160}
      height={120}
      className="h-12 w-40 mx-0 -ml-6"
      alt="brand-logo"
    />
  );
}
