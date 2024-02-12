"use client";

import { Background } from "./Background";
import { Sidebar } from "./Sidebar";
import { Provider } from "./context";

export const App = () => {
  return (
    <Provider>
      <div className="relative h-full">
        <Background />
        <div className="flex justify-end w-full h-full">
          <Sidebar />
        </div>
      </div>
    </Provider>
  );
};
