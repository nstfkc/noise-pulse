"use client";

import ColorIcon from "./icons/color.svg";
import { SegmentControl } from "./SegmentControl";
import { defaultState, reducer } from "./reducer";
import { useEffect, useReducer, useState } from "react";
import { GradientSlider } from "./GradientSlider";
import { GradientCurrentColor } from "./GradientCurrentColor";

export const SidebarGradientSection = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
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
          defaultValue="radial"
          onValueChange={(value) => console.log(value)}
          items={[
            { label: "Linear", value: "linear" },
            { label: "Radial", value: "radial" },
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
    </div>
  );
};
