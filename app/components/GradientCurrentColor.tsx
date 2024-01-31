import { Color } from "./reducer";
import TrashIcon from "./icons/bin.svg";

interface Props {
  color?: Color;
  deleteColor: (colorId: string) => void;
}

export const GradientCurrentColor = (props: Props) => {
  if (!props.color) return null;
  return (
    <div className="bg-slate-900/40 rounded-xl recess p-2 flex items-center justify-between">
      <div className="flex gap-2">
        <div
          className="size-6 rounded-md"
          style={{ background: props.color.code }}
        ></div>
        <div>{props.color.code}</div>
      </div>
      <button onClick={() => props.deleteColor(props.color.id)}>
        <TrashIcon />
      </button>
    </div>
  );
};
