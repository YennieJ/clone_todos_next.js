"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "./authContextProvider";

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/signin");
  }, [user]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      HOME
    </section>
  );
}
