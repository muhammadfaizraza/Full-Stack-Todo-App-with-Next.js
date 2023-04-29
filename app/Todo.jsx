import { TodoItem } from "@/components/ServerSide";
import { cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";
const fetchTask = async (token) => {
  try {
    const api = await fetch(`${process.env.URL}api/mytask`, {
      cache: "no-cache",
      headers: {
        cookie: `token=${token}`,
      },
    });

    const data = await api.json();
    if (!data.success) return [];

    return data.tasks;
  } catch (err) {
    return ["Add Task to increase your productivity"];
  }
};
const Todo = async () => {
  const token = cookies().get("token")?.value;
  console.log(token);
  if (!token) return redirect("/login");

  const tasks = await fetchTask(token);
  console.log(tasks);

  return (
    <>
      {tasks?.map((i, n) => (
        <TodoItem
          title={i.title}
          description={i.descripion}
          completed={i.isCompleted}
          id={i._id}
          key={n}
        />
      ))}
    </>
  );
};

export default Todo;
