'use client'
import React, { useState } from "react";
import { cardsBg } from "../themes";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";

type Props = {
  data: _IParkingCenter;
  owner: _IUser;
};

const ParkingCenterCard = ({ data, owner }: Props) => {
  const { center_images, center_name, description, createdAt, _id } = data;
  const href = `/parking-lots/${_id}`;
  const [selected, setSelected] = useState(false);
  const onSaveFavorite = () => {
      setSelected((prev) => !prev)
      console.log("onSaveFavorite");
    };
  
  return (
    <>
      <div
        className={`wow fadeInUp hover:shadow dark:hover:shadow-gray-dark group relative overflow-hidden rounded-sm shadow-one duration-300 ${cardsBg}`}
        data-wow-delay=".1s"
      >
        <Link href={href} className="relative block aspect-[37/22] w-full">
          <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary-btn px-4 py-2 text-sm font-semibold capitalize text-white">
            {owner?._id.slice(0, 8)}
          </span>
          <Image
            src="https://images.unsplash.com/photo-1613314188851-2c04697535ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNhciUyMHBhcmt8ZW58MHx8MHx8fDA%3D"
            className="object-cover w-full h-full"
            width={500}
            height={300}
            alt="image"
            // fill
          />
        </Link>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8 ">
          <h3 className="flex justify-between">
            <Link
              href={href}
              className="mb-4 block text-xl font-bold text-black hover:text-primary-btn dark:text-white dark:hover:text-primary-btn sm:text-2xl"
            >
              {center_name}
            </Link>
            <HeartIcon className={`h-6 w-6 cursor-pointer ${selected ? 'fill-green-500 text-green-500' : ''}`} onClick={onSaveFavorite} />
          </h3>
          <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
            {description}
          </p>
          <div className="flex items-center">
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="mr-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src="https://images.unsplash.com/photo-1474176857210-7287d38d27c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGJsYWNrJTIwb3duZXJ8ZW58MHx8MHx8fDA%3D"
                    alt="author"
                    className="object-cover w-full h-full"
                    width={500}
                    height={30}
                  />
                </div>
              </div>
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  By {owner?.profile.first_name ?? "Some Owner Name"}
                </h4>
                <p className="text-xs text-body-color">
                  {owner?.profile.area ?? `Owner's area`}
                </p>
              </div>
            </div>
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                Date
              </h4>
              <p className="text-xs text-body-color">
                {createdAt.getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParkingCenterCard;
