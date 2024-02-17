"use client";

import { PropsWithChildren, createContext } from "react";
import useLocalStorage from "use-local-storage";

interface BookmarkContextValue {
  bookmarks: string[];
  addBookmark: (bookmark: string) => void;
  removeBookmark: (bookmark: string) => void;
}

export const BookmarkContext = createContext({} as BookmarkContextValue);

export const BookmarkProvider = (props: PropsWithChildren) => {
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>("bookmarks", []);

  const addBookmark = (bookmark: string) => {
    setBookmarks([...bookmarks, bookmark]);
  };

  const removeBookmark = (bookmark: string) => {
    setBookmarks(bookmarks.filter((b) => b !== bookmark));
  };

  return (
    <BookmarkContext.Provider
      value={{ addBookmark, bookmarks, removeBookmark }}
    >
      {props.children}
    </BookmarkContext.Provider>
  );
};
