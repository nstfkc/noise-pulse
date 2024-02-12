"use client";

import { useContext } from "react";
import { SegmentControl } from "./SegmentControl";
import { Context } from "./context";
import NoiseIcon from "./icons/noise.svg";
import { SimpleSlider } from "./SimpleSlider";

export const SidebarNoiseSection = () => {
  const { state, dispatch } = useContext(Context);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <div>
          <NoiseIcon />
        </div>
        <div className="text-[17px] font-semibold">Noise</div>
      </div>
      <div>
        <SegmentControl
          value={state.noiseType}
          onValueChange={(noiseType) => {
            dispatch({
              type: "UPDATE_NOISE_TYPE",
              payload: { noiseType } as any,
            });
          }}
          items={[
            { label: "Fractal", value: "fractalNoise" },
            { label: "Turbulance", value: "turbulance" },
          ]}
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="text-[15px] font-medium">Intensity</div>
        <SimpleSlider
          min={0}
          max={5}
          step={0.01}
          value={[state.noiseIntensity]}
          onValueChange={([noiseIntensity]) => {
            dispatch({
              type: "UPDATE_NOISE_INTENSITY",
              payload: { noiseIntensity },
            });
          }}
        />
        <div className="bg-slate-900/40 w-[52px] text-slate-200 p-2 rounded-lg recess text-[13px]">
          {state.noiseIntensity}
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 data-[disabled=true]:opacity-50">
        <div className="text-[15px] font-medium">Opacity</div>
        <SimpleSlider
          min={0}
          max={1}
          step={0.01}
          value={[state.noiseOpacity]}
          onValueChange={([noiseOpacity]) => {
            dispatch({
              type: "UPDATE_NOISE_OPACITY",
              payload: { noiseOpacity },
            });
          }}
        />
        <div className="bg-slate-900/40 w-[52px] text-slate-200 p-2 rounded-lg recess text-[13px]">
          {Math.floor(state.noiseOpacity * 100)}%
        </div>
      </div>
    </div>
  );
};
