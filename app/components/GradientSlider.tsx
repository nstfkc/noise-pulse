import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";
import { Color } from "./helpers";

function isBetween(x: number, min: number, max: number) {
  return x >= min && x <= max;
}

export const GradientSlider = (props: {
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
      <Slider.Root
        className="flex items-center select-none touch-none h-5 cursor-normal"
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
            className="group relative border size-6 border-2 border-white/40 rounded-full block outline-none flex justify-center items-center shadow-md"
          >
            {props.currentColorId === color.id && (
              <div className="bg-black/60 size-2 rounded-full"></div>
            )}
          </Slider.Thumb>
        ))}
      </Slider.Root>
      {!hideAddButton && !collidingStops && (
        <>
          <button
            style={{ left: `calc(${addButtonLeft}% - 8px)` }}
            className=" group-hover:flex absolute size-6 top-[-2px] rounded-full opacity-0 border border-white/40 cursor-pointer flex justify-center items-center"
            onClick={(e) => {
              e.preventDefault();
              props.handleAddColor(Math.max(0, addButtonLeft));
            }}
          ></button>
          <button
            style={{ left: `calc(${addButtonLeft}% + 8px)`, top: "20px" }}
            className="hidden group-hover:flex text-slate-700 absolute size-4 top-[-2px] rounded-full bg-green-300 border border-white/40 cursor-pointer flex justify-center items-center"
          >
            +
          </button>
        </>
      )}
    </div>
  );
};
