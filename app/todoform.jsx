"use client";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const todoform = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [descripion, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/newtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          descripion,
        }),
      });
      const data = await res.json();

      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
      setTitle("");
      setDescription("");
    } catch (err) {
      toast.error(data.message);
    }
  };

  return (
    <div className="login">
      <section>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Title"
            type="text"
            autoComplete="off"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input
            placeholder="Description"
            type="text"
            autoComplete="off"
            onChange={(e) => setDescription(e.target.value)}
            value={descripion}
          />
          <button type="submit">Add Task</button>
        </form>
      </section>
    </div>
  );
};

export default todoform;
