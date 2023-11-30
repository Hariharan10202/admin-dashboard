"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Skeleton } from "primereact/skeleton";

const UserContainer = () => {
  const { data, status } = useSession();

  return (
    <>
      {status === "loading" ? (
        <div className="my-5 flex gap-5 p-4 bg-gray-400/10 rounded-xl">
          <Skeleton shape="circle" width="50px" height="50px" />
          <div className="flex flex-col gap-y-3">
            <Skeleton width="150px" height="26px" />
            <Skeleton width="150px" height="26px" />
          </div>
        </div>
      ) : (
        <div className="my-5 flex gap-5 p-4 bg-gray-700/10 dark:bg-white/10 backdrop:blur-[10px] dark:backdrop:blur-[10px] rounded-xl">
          <div className="relative w-[50px] h-[50px] flex items-center justify-center">
            <Image
              className="rounded-full object-cover"
              fill
              src={data?.user.image}
              alt="image"
              sizes="(max-width: 50px)"
            />
          </div>
          <div className="text-black dark:text-white flex flex-col gap-y-1">
            <span>{data?.user.name}</span>
            <span className="text-gray-500">{data?.user.email}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default UserContainer;
