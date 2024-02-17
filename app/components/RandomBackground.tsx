"use client";

import { useState } from "react";
import { Background } from "./Background";
import { generateRandomState } from "./helpers";

export const RandomBackground = () => {
  const [state] = useState(generateRandomState());
  return <Background state={state} />;
};
