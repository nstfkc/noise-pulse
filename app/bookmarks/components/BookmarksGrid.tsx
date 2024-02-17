"use client";

import { BookmarkContext } from "@/app/components/Bookmarks";
import { useContext } from "react";

export const BookmarksGrid = () => {
  const { bookmarks } = useContext(BookmarkContext);
  return <div></div>;
};
