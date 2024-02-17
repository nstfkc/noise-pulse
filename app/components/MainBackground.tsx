"use client";

import { useContext } from "react";
import { Context } from "./context";
import { Background } from "./Background";

export const MainBackground = () => {
  const { state } = useContext(Context);

  return <Background state={state} />;
};
