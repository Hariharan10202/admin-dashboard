"use client";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="bg-blue-900 flex flex-col items-center justify-center min-h-screen ">
      <div className="text-6xl font-bold text-gray-800">404</div>
      <div className="text-xl text-gray-200 mb-4">Page Not Found</div>
      <p className="text-gray-200 mb-8">
        The page you are looking for might be under construction or does not
        exist.
      </p>
      <Link className="bg-blue-400 p-5 rounded" href="/dashboard">
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
