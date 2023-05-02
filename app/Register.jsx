"use client";
import { Context } from "@/components/Clients";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
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
        <form autocomplete="off" onSubmit={handleSubmit}>
          <input
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            autocomplete="off"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            type="email"
            autocomplete="off"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password"
            type="password"
            autocomplete="off"
          />
          <button type="submit">Sign Up</button>
          <p>OR</p>
          <Link href={"/login"}>You Have an Account</Link>
        </form>
      </section>
    </div>
  );
};

export const metadata = {
  title: "Register",
  description: "Register    to have all access for create your task list ",
};

export default Register;
