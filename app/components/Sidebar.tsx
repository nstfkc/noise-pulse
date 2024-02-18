import { useContext, useState } from "react";
import { Context } from "./context";
import MagicIcon from "./icons/magic.svg";
import CollapseIcon from "./icons/collapse.svg";
import { SidebarGradientSection } from "./SidebarGradientSection";
import { SidebarNoiseSection } from "./SidebarNoiseSection";
import { Credits } from "./Credits";

export const Sidebar = () => {
  const { dispatch } = useContext(Context);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="">
      <div
        className={[
          "min-w-[320px] rounded-xl text-white p-4",
          "transition-transform duration-300",
          collapsed ? "translate-x-[120%]" : "translate-x-0",
        ].join(" ")}
      >
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
        <div className="md:hidden py-8">
          <Credits />
        </div>
      </div>
    </div>
  );
};
