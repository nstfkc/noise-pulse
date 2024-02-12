"use client";

import ColorIcon from "./icons/color.svg";
import { SegmentControl } from "./SegmentControl";
import { useContext, useEffect, useState } from "react";
import { GradientSlider } from "./GradientSlider";
import { GradientCurrentColor } from "./GradientCurrentColor";
import { SimpleSlider } from "./SimpleSlider";
import { Context } from "./context";

export const SidebarGradientSection = () => {
  const { state, dispatch } = useContext(Context);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <div>
          <ColorIcon />
        </div>
        <div className="text-[17px] font-semibold">Gradient</div>
      </div>
      <div>
        <SegmentControl
          defaultValue="linear-gradient"
          onValueChange={(gradientType) => {
            dispatch({
              type: "UPDATE_GRADIENT_TYPE",
              payload: { gradientType } as any,
            });
          }}
          items={[
            { label: "Linear", value: "linear-gradient" },
            { label: "Radial", value: "radial-gradient" },
          ]}
        />
      </div>
      <div>
        <GradientSlider
          colors={state.colors}
          updateColorStops={(colorStopsArray) => {
            dispatch({
              type: "UPDATE_COLOR_STOPS",
              payload: { colorStopsArray },
            });
          }}
          handleAddColor={(stop) => {
            dispatch({
              type: "ADD_COLOR",
              payload: {
                stop,
              },
            });
          }}
          currentColorId={state.selectedColorId}
          setCurrentColorId={(id) => {
            dispatch({
              type: "UPDATE_SELECTED_GRADIENT_COLOR_ID",
              payload: { id },
            });
          }}
        />
      </div>
      <div>
        <GradientCurrentColor
          updateColor={(id, code) => {
            dispatch({
              type: "UPDATE_COLOR_CODE",
              payload: {
                id,
                code,
              },
            });
          }}
          deleteColor={(id) => {
            dispatch({
              type: "REMOVE_COLOR",
              payload: { id },
            });
          }}
          color={state.colors.find(
            (color) => color.id === state.selectedColorId
          )}
        />
      </div>
      <div>
        <div
          data-disabled={state.gradientType === "radial-gradient"}
          className="flex items-center justify-between gap-2 data-[disabled=true]:opacity-50"
        >
          <div className="text-[15px] font-semibold">Angle</div>
          <SimpleSlider
            disabled={state.gradientType === "radial-gradient"}
            min={0}
            max={360}
            step={1}
            value={[state.gradientAngle]}
            onValueChange={([gradientAngle]) => {
              dispatch({
                type: "UPDATE_GRADIENT_ANGLE",
                payload: { gradientAngle },
              });
            }}
          />
          <div className="bg-slate-900/40 w-[52px] text-slate-200 p-2 rounded-lg recess text-[13px]">
            {state.gradientAngle} °
          </div>
        </div>
      </div>
    </div>
  );
};
