"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Toaster, toast } from "react-hot-toast";

export const Context = createContext({ user: {} });
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
      });
  }, []);
  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
      <Toaster />
    </Context.Provider>
  );
};

export const LogoutButton = () => {
  const { user, setUser } = useContext(Context);

  const logoutHandler = async () => {
    try {
      const res = await fetch("/api/auth/logout");

      const data = await res.json();

      if (!data.success) toast.error(data.message);

      setUser({});

      toast.success(data.message);
    } catch (error) {
      return toast.error(error);
    }
  };

  return user._id ? (
    <>
      <button className="btn" onClick={logoutHandler}>
        Logout
      </button>
    </>
  ) : (
    <Link href={"/login"}>Login</Link>
  );
};
export const TodoButton = ({ id, completed }) => {
  const router = useRouter();
  const deleteHandler = async (id) => {
    try {
      const api = await fetch(`/api/task/${id}`, {
        method: "DELETE",
      });
      const data = await api.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (err) {
      return toast.error(err);
    }
  };

  const updateHandle = async (id) => {
    try {
      const api = await fetch(`/api/task/${id}`, {
        method: "PUT",
      });
      const data = await api.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (err) {
      return toast.error(err);
    }
  };

  return (
    <Fragment>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => updateHandle(id)}
      />
      <button className="btn" onClick={() => deleteHandler(id)}>
        Deleted
      </button>
    </Fragment>
  );
};
