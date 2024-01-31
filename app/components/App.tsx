import { Noise } from "./Noise";
import { Sidebar } from "./Sidebar";

export const App = () => {
  return (
    <div className="relative h-full">
      <div className="top-0 left-0 z-[-1] absolute w-full h-full bg-gradient-to-br from-stone-800 to-stone-600">
        <Noise />
      </div>
      <div className="flex justify-end w-full h-full">
        <Sidebar />
      </div>
    </div>
  );
};
