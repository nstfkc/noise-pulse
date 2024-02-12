"use client";

import { Background } from "./Background";
import { Sidebar } from "./Sidebar";
import { Provider } from "./context";
import { State } from "./reducer";

export const App = ({ initialState }: { initialState: State }) => {
  return (
    <Provider initialState={initialState}>
      <div className="relative h-full">
        <Background />
        <div className="flex justify-end w-full h-full">
          <Sidebar />
        </div>
      </div>
    </Provider>
  );
};
