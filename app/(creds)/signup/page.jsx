"use client";

import { registerUser } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa6";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form action={registerUser}>
      <div className="flex h-[100vh] justify-center items-center p-9 text-white">
        <div className="w-[30%] m-auto flex flex-col gap-y-3 bg-gray-800 p-9 rounded-2xl">
          <h1 className="text-[20px] font-bold">Sign up</h1>
          <InputText
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Password
            value={password}
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            feedback={false}
            placeholder="Password"
          />
          <Password feedback={false} placeholder="Confirm Password" />
          <Button>Sign up</Button>
          <Button type="button" className="flex gap-2">
            Sign up with <FaGoogle />
          </Button>
          <div className="flex gap-2">
            <p>Don&apos;t have an account ? </p>
            <Link href={"/login"}>
              <span className="text-blue-600 hover:underline"> Login</span>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;
