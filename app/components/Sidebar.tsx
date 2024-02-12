import { useContext } from "react";
import { Context } from "./context";
import ResetIcon from "./icons/reset.svg";
import { SidebarGradientSection } from "./SidebarGradientSection";
import { SidebarNoiseSection } from "./SidebarNoiseSection";

export const Sidebar = () => {
  const { dispatch } = useContext(Context);
  return (
    <div className="p-4">
      <div className="min-w-[320px] bg-slate-800/90 rounded-xl text-white p-4">
        <SidebarGradientSection />
        <div className="h-12"></div>
        <SidebarNoiseSection />
        <div className="h-12"></div>
        <div>
          <button
            onClick={() => dispatch({ type: "RESET", payload: {} })}
            className="flex gap-2 items-center py-2"
          >
            <ResetIcon />
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};
