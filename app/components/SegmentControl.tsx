"use client";
import * as Switch from "@radix-ui/react-switch";

export const SegmentControl = (props: {
  items: ReadonlyArray<{ label: string; value: string }>;
  onValueChange: (value: string) => void;
  value: string;
}) => {
  const { items = [], value, onValueChange } = props;
  return (
    <Switch.Root
      checked={value === items[0].value}
      onCheckedChange={(checked) => {
        onValueChange(checked ? items[1].value : items[0].value);
      }}
      className="recess group bg-slate-900/40 w-full rounded-xl h-[40px] relative outline-none"
    >
      <Switch.Thumb asChild>
        <div className="absolute transition-all w-1/2 h-full rounded-md left-0 top-0 p-[4px] data-[state=checked]:left-[50%]">
          <div
            className={[
              "bg-gradient-to-b from-slate-700 to-slate-600 w-full h-full rounded-lg",
              "",
            ].join(" ")}
          ></div>
        </div>
      </Switch.Thumb>
      <div className="absolute z-1 h-full left-0 top-0 w-full grid grid-cols-2">
        <div
          className="flex items-center justify-center group-data-[state=unchecked]:opacity-100 opacity-60"
          key={items[0].value}
        >
          {items[0].label}
        </div>
        <div
          className="flex items-center justify-center group-data-[state=checked]:opacity-100 opacity-60"
          key={items[1].value}
        >
          {items[1].label}
        </div>
      </div>
    </Switch.Root>
  );
};
