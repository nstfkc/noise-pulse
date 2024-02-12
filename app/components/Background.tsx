"use client";

import { useContext, useEffect, useState } from "react";
import { Noise } from "./Noise";
import { Context } from "./context";

export const Background = () => {
  const { state } = useContext(Context);

  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  let bg = (_deg: number) => state.colors[0].code;

  if (state.colors.length > 1) {
    bg = (deg: number) =>
      `${state.gradientType}(${
        state.gradientType === "linear-gradient"
          ? `${deg}deg`
          : "circle at center"
      }, ${state.colors
        .map((color) => `${color.code} ${color.stop}%`)
        .join(", ")})`;
  }

  if (!ready) return null;

  return (
    <div
      style={{ background: bg(state.gradientAngle) }}
      className="top-0 left-0 z-[-1] absolute w-full h-full"
    >
      <Noise
        type={state.noiseType}
        opacity={state.noiseOpacity}
        baseFrequency={state.noiseIntensity}
      />
    </div>
  );
};
