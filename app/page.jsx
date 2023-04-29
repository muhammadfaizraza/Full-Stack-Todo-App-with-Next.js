import React, { Suspense } from "react";
import Form from "./todoform";
import { TodoItem } from "../components/ServerSide";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Todo from "./Todo";

const page = async () => {
  return (
    <div className="container">
      <Form />
      <section className="todosContainer">
        <Suspense fallback={<div>Please Wait </div>}>
          <Todo />
        </Suspense>
      </section>
    </div>
  );
};

export default page;
