import { SidebarGradientSection } from "./SidebarGradientSection";
import { SidebarNoiseSection } from "./SidebarNoiseSection";

export const Sidebar = () => {
  return (
    <div className="p-4">
      <div className="min-w-[320px] bg-slate-800/90 rounded-xl h-full text-white p-4">
        <SidebarGradientSection />
        <div className="h-8"></div>
        <SidebarNoiseSection />
      </div>
    </div>
  );
};
