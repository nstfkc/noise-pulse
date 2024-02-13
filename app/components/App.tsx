"use client";

import { Toaster } from "sonner";
import { Background } from "./Background";
import { CopyCode } from "./CopyCode";
import { Sidebar } from "./Sidebar";
import { Provider } from "./context";
import { State } from "./reducer";

export const App = ({ initialState }: { initialState: State }) => {
  return (
    <Provider initialState={initialState}>
      <Toaster />
      <div className="relative h-full">
        <Background />
        <div className="flex justify-end w-full h-full">
          <Sidebar />
        </div>
        <div className="absolute w-full bottom-0">
          <CopyCode />
        </div>
      </div>
    </Provider>
  );
};
