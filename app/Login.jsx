"use client";
import { Context } from "@/components/Clients";
import { redirect } from "next/navigation";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      setUser(data.user);
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
    } catch (err) {
      toast.error(data.message);
    }
  };
  if (user._id) return redirect("/");
  return (
    <div className="login">
      <section>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          <input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
          <button type="submit">Submit</button>
          <p>OR</p>
          <Link href={"/register"}>New User</Link>
        </form>
      </section>
    </div>
  );
};
export const metadata = {
  title: "Login",
  description: "Login to have all access for create your task list ",
};

export default Login;
