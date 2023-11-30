"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { FaGoogle } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useLayoutEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);

  if (status === "unauthenticated") {
    const signInHandler = async () => {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res?.error) console.log(res?.error);
      if (res?.url) router.replace("/dashoboard");
    };

    return (
      <div className="flex h-[100vh] justify-center w-full items-center p-9 text-white">
        <div className="w-[30%] m-auto flex flex-col gap-y-5 bg-gray-800 p-9 rounded-2xl">
          <h1 className="text-[20px] font-bold">Sign in</h1>
          <InputText
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Password
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            feedback={false}
            placeholder="Password"
          />
          <Button onClick={signInHandler}>Login</Button>
          <Button
            onClick={() => {
              signIn("google");
            }}
            className="flex gap-3"
          >
            <FaGoogle /> Sign in
          </Button>
          <div className="flex gap-2">
            <p>Don't have an account ? </p>
            <Link href={"/signup"}>
              <span className="text-blue-600 hover:underline"> Sign up</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
