"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  parkingLinks,
  paymentLinks,
  reservationLinks,
  usersLinks,
  vehiclesLinks,
} from "@/app/lib/constants";
import {
  getGreenIconClassName,
  getGreenLinkClassName,
  getIconClassName,
  getLinkClassName,
  getRedIconClassName,
  getRedLinkClassName,
} from "./functions";
import { cardHover, cardsBg } from "../themes";

function NavlinksComponent({ pathname, data, title, rem }: _INavProps) {
  return (
    <>
      {/* Divider */}
      <div
        className={`md:min-w-full h-[0.1px] bg-slate-300 dark:bg-slate-600 ${
          rem ? "mt-20" : "mt-0"
        }`}
      />
      {/* Heading */}
      <h6 className="md:min-w-full text-xs uppercase font-bold block pt-1 pb-4 no-underline">
        {title}
        {" Information"}
      </h6>
      {data.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              `flex h-[48px] grow items-center justify-center gap-2 rounded-md ${cardsBg} p-3 text-sm font-medium ${cardHover}  md:flex-none md:justify-start md:p-2 md:px-3 ${
                link.type === "red"
                  ? getRedLinkClassName(pathname, link.href)
                  : link.type === "green"
                  ? getGreenLinkClassName(pathname, link.href)
                  : getLinkClassName(pathname, link.href)
              }`,
              {
                "bg-sky-100  dark:bg-custom-primary ": pathname === link.href,
              }
            )}
          >
            <LinkIcon
              className={`w-6 ${
                link.type === "red"
                  ? getRedIconClassName(pathname, link.href)
                  : link.type === "green"
                  ? getGreenIconClassName(pathname, link.href)
                  : getIconClassName(pathname, link.href)
              }`}
            />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      <NavlinksComponent pathname={pathname} data={usersLinks} title="user" />

      <div className="mt-4" />
      <NavlinksComponent
        pathname={pathname}
        data={parkingLinks}
        title="Parking Lot"
      />
      <div className="mt-4" />
      <NavlinksComponent
        pathname={pathname}
        data={vehiclesLinks}
        title="Vehicle"
      />
      <div className="mt-4" />
      <NavlinksComponent
        pathname={pathname}
        data={reservationLinks}
        title="Reservation"
      />
      <div className="mt-4" />
      <NavlinksComponent
        pathname={pathname}
        data={paymentLinks}
        title="payment"
      />
    </>
  );
}
