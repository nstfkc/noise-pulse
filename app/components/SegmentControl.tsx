"use client";
import * as Switch from "@radix-ui/react-switch";

export const SegmentControl = (props: {
  items: { label: string; value: string }[];
  onValueChange: (value: string) => void;
  defaultValue: string;
}) => {
  const { items = [], defaultValue, onValueChange } = props;
  return (
    <Switch.Root
      defaultChecked={defaultValue === items[1].value}
      onCheckedChange={(checked) =>
        onValueChange(checked ? items[1].value : items[0].value)
      }
      style={{
        boxShadow:
          "24px 24px 24px 0px rgba(0, 0, 0, 0.04), 8px 8px 8px 0px rgba(0, 0, 0, 0.04), 4px 4px 4px 0px rgba(0, 0, 0, 0.04),0px 0px 0px 1px rgba(80, 99, 128, 0.17) inset",
      }}
      className="group bg-slate-950/40 w-full rounded-xl h-[40px] relative outline-none"
    >
      <Switch.Thumb asChild>
        <div className="absolute transition-all w-1/2 h-full rounded-md left-0 top-0 p-[4px] data-[state=checked]:left-[50%]">
          <div
            className={[
              "bg-gradient-to-b from-slate-600 to-slate-500 w-full h-full rounded-lg",
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
