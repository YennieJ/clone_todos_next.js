"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";

export const Counter = ({
  children,
  initialCount,
}: {
  children: React.ReactNode;
  initialCount: number;
}) => {
  const [count, setCount] = useState(initialCount);

  return (
    <>
      <Button radius="full" onPress={() => setCount(count + 1)}>
        Count is {count}
      </Button>
      {children}
    </>
  );
};
