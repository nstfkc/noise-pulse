"use client";

import { Toaster } from "sonner";
import { CopyCode } from "./CopyCode";
import { Sidebar } from "./Sidebar";
import { Provider } from "./context";
import { MainBackground } from "./MainBackground";
import { BookmarkProvider } from "./Bookmarks";
import { State } from "./helpers";
import { Credits } from "./Credits";

export const App = ({ initialState }: { initialState: State }) => {
  return (
    <BookmarkProvider>
      <Provider initialState={initialState}>
        <Toaster />
        <div className="flex flex-col md:flex-row h-full">
          <div className="h-full w-full aspect-video overflow-scroll">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md">
              <MainBackground />
              <div className="absolute w-full bottom-0">
                <div className="hidden md:block">
                  <div className="flex justify-center">
                    <CopyCode />
                  </div>
                  <Credits />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="md:hidden py-4">
              <CopyCode />
            </div>
            <Sidebar />
          </div>
        </div>
      </Provider>
    </BookmarkProvider>
  );
};
