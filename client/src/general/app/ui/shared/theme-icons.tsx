"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { setDarkThemeCookie, setLightThemeCookie } from "@/app/lib/utils";
import { useEffect } from "react";

const LightIcon = () => {
  const router = useRouter();
  return (
    <SunIcon
      onClick={() => {
        setLightThemeCookie();
        router.refresh();
      }}
      className="p-1 fill-custom-content-strong-dark  text-3xl cursor-pointer rounded-full hover:drop-shadow-md border-custom-background-primary-dark dark:hover:border-x hover:transition hover:ease-out duration-300 "
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="Toggle"
    />
  );
};

const DarkIcon = () => {
  const router = useRouter();
  return (
    <MoonIcon
      onClick={() => {
        setDarkThemeCookie();
        router.refresh();
      }}
      className="p-1 fill-custom-content-strong-light text-3xl cursor-pointer rounded-full hover:drop-shadow-md hover:border-x border-navbarPrimary hover:transition hover:ease-out duration-300"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="Toggle"
    />
  );
};

const SetLightTheme = () => {
  const router = useRouter();
  useEffect(
    () => {
      setLightThemeCookie();
      router.refresh();
    },
    [],
)
  return <></>
}

export { LightIcon, DarkIcon, SetLightTheme };
