import { useContext } from "react";
import { Context } from "./context";
import MagicIcon from "./icons/magic.svg";
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
            className={[
              "bg-gradient-to-t from-[#9730ff] to-[#7f30ff]",
              "py-2 px-4 rounded-[12px] text-white",
              "flex gap-2 items-center",
              "active:scale-[0.99]",
            ].join(" ")}
          >
            <MagicIcon /> <span className="text-[15px]">Generate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
