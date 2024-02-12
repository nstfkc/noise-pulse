import { Color } from "./reducer";
import TrashIcon from "./icons/bin.svg";
import { ColorInput } from "./ColorPicker";

interface Props {
  color: Color;
  deleteColor: (colorId: string) => void;
  updateColor: (colorId: string, code: string) => void;
}

export const GradientCurrentColor = (props: Props) => {
  if (!props.color) return null;
  return (
    <div className="bg-slate-900/40 rounded-xl recess p-2 flex items-center justify-between">
      <div className="flex gap-2">
        <ColorInput
          color={props.color.code}
          onValueChange={(color) => {
            console.log("color changed", color);
            props.updateColor(props.color.id, color.valueAsString);
          }}
          onChange={(color) => {
            console.log("color changed", color);
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
