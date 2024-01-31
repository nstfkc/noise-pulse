"use client";

import ColorIcon from "./icons/color.svg";
import { SegmentControl } from "./SegmentControl";
import * as Slider from "@radix-ui/react-slider";
import { Color, defaultState, reducer } from "./reducer";
import { useEffect, useReducer, useState } from "react";

function isBetween(x: number, min: number, max: number) {
  return x >= min && x <= max;
}

const RangeSlider = (props: {
  colors: Color[];
  updateColorStops: (nextColorStopArray: number[]) => void;
  currentColorId?: string;
  setCurrentColorId: (colorId: string) => void;
  handleAddColor: (stop: number) => void;
}) => {
  const { colors, updateColorStops } = props;
  const [addButtonLeft, setAddButtonLeft] = useState(50);
  const [hideAddButton, setHideAddButton] = useState(false);

  const collidingStops = colors
    .map((color) => isBetween(addButtonLeft, color.stop - 5, color.stop + 5))
    .includes(true);

  return (
    <div
      className="group relative"
      onMouseMove={(e) => {
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = (x / rect.width) * 100;
        setAddButtonLeft(Math.min(Math.max(Math.ceil(percent), 0), 100));
      }}
    >
      <div className="absolute w-[calc(100%-16px)] left-[8px] bg-red-100 h-full top-0 left-0"></div>
      <Slider.Root
        className="flex items-center select-none touch-none h-5"
        value={colors.map((color) => color.stop)}
        onValueChange={(nextValue) => {
          setHideAddButton(true);
          updateColorStops(nextValue);
        }}
        onValueCommit={() => setHideAddButton(false)}
        min={0}
        max={100}
        step={1}
        minStepsBetweenThumbs={5}
      >
        <Slider.Track
          style={{
            background: `linear-gradient(90deg, ${colors.map(
              (color) => `${color.code} ${color.stop}%`
            )})`,
          }}
          className="w-full relative grow h-4 rounded-full"
        >
          <Slider.Range
            onClick={(e) => e.preventDefault()}
            className="absolute h-full"
          />
        </Slider.Track>

        {colors.map((color, idx) => (
          <Slider.Thumb
            onClick={() => props.setCurrentColorId(color.id)}
            onMouseDown={() => setHideAddButton(true)}
            key={`thumb-${color.id}-${idx}`}
            style={{ background: color.code }}
            className="group relative border size-6 border-2 border-white/40 rounded-full block outline-none flex justify-center items-center"
          >
            {props.currentColorId === color.id && (
              <div className="bg-black/60 size-2 rounded-full"></div>
            )}
          </Slider.Thumb>
        ))}
      </Slider.Root>
      {!hideAddButton && !collidingStops && (
        <button
          style={{ left: `calc(${addButtonLeft}%)` }}
          className=" group-hover:flex absolute size-6 top-[-2px] rounded-full bg-black/60 border border-white/40 cursor-pointer flex justify-center items-center"
          onClick={(e) => {
            e.preventDefault();
            props.handleAddColor(Math.max(0, addButtonLeft + 1));
          }}
        >
          {addButtonLeft}
        </button>
      )}
    </div>
  );
};

export const SidebarGradientSection = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [currentColorId, setCurrentColorId] = useState(state.colors[0].id);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <div className="flex flex-col gap-4">
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
        <RangeSlider
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
          currentColorId={currentColorId}
          setCurrentColorId={setCurrentColorId}
        />
      </div>
    </div>
  );
};
