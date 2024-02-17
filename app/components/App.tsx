"use client";

import { Toaster } from "sonner";
import { CopyCode } from "./CopyCode";
import { Sidebar } from "./Sidebar";
import { Provider } from "./context";
import { MainBackground } from "./MainBackground";
import { BookmarkProvider } from "./Bookmarks";

export const App = ({ initialState }: { initialState: State }) => {
  return (
    <BookmarkProvider>
      <Provider initialState={initialState}>
        <Toaster />
        <div className="relative h-full">
          <MainBackground />
          <div className="flex justify-end w-full h-full">
            <Sidebar />
          </div>
          <div className="absolute w-full bottom-0">
            <CopyCode />
          </div>
        </div>
      </Provider>
    </BookmarkProvider>
  );
};
