"use client";

import { Button } from "@/components/ui/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "primereact/resources/themes/lara-dark-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signInHandler = async () => {
    setLoading(true);
    if (email && password) {
      const res = await signIn("credentials", {
        email,
        password,
      });
      if (res?.error) {
        setLoading(false);
        return toast.error("Invalid Username or Password");
      }
      if (res?.url) router.replace("/dashboard");
    } else {
      setLoading(false);

      return toast.error("Enter the required fields");
    }
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
        <Button
          disabled={loading}
          className="disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={signInHandler}
        >
          {loading ? "Logging in" : "Login"}
        </Button>
        <Button
          onClick={() => {
            signIn("google", {
              callbackUrl: "/dashboard",
            });
          }}
          className="flex gap-3"
        >
          <FaGoogle /> Sign in
        </Button>
      </div>
    </div>
  );
};

export default Login;
