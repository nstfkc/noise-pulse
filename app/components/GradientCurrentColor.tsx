import { Color } from "./reducer";
import TrashIcon from "./icons/bin.svg";
import { ColorInput } from "./ColorPicker";
import { ComponentProps } from "react";

interface Props {
  color: Color;
  deleteColor: (colorId: string) => void;
  updateColor: (colorId: string, code: string) => void;
}

const colorPickers = new Map<string, any>();

const getColorPicker = (color: Color) => {
  if (!colorPickers.has(color.id)) {
    colorPickers.set(color.id, (props: ComponentProps<typeof ColorInput>) => (
      <ColorInput {...props} />
    ));
  }
  return colorPickers.get(color.id);
};

export const GradientCurrentColor = (props: Props) => {
  if (!props.color) return null;
  const Input = getColorPicker(props.color);
  return (
    <div className="bg-slate-900/40 rounded-xl recess p-2 flex items-center justify-between">
      <div className="flex gap-2">
        <Input
          value={props.color.code}
          defaultValue={props.color.code}
          onValueChange={(color: any) => {
            props.updateColor(props.color.id, color.valueAsString);
          }}
        />
        <div>{props.color.code}</div>
      </div>
      <button onClick={() => props.deleteColor(props.color.id)}>
        <TrashIcon />
      </button>
    </div>
  );
};
