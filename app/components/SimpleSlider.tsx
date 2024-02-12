import * as Slider from "@radix-ui/react-slider";
import { ComponentProps } from "react";

export const SimpleSlider = (props: ComponentProps<typeof Slider.Root>) => (
  <Slider.Root
    className={`relative flex items-center select-none touch-none h-5 w-[120px]`}
    {...props}
  >
    <Slider.Track className="bg-slate-900/40 relative grow rounded-full h-[4px]">
      <Slider.Range className="absolute bg-slate-600 rounded-full h-full" />
    </Slider.Track>
    <Slider.Thumb
      className="block size-4 bg-gradient-to-br from-slate-700 to-slate-600 shadow-md rounded-[10px] outline-none"
      aria-label="Volume"
    />
  </Slider.Root>
);
