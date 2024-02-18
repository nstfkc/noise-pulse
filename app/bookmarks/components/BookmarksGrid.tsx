"use client";

import { BookmarkContext } from "@/app/components/Bookmarks";
import { InspirationItem } from "@/app/components/InspirationItem";
import { decompressState } from "@/app/components/helpers";
import { useContext } from "react";

export const BookmarksGrid = () => {
  const { bookmarks } = useContext(BookmarkContext);
  return (
    <div className="grid grid-cols-4 gap-2">
      {bookmarks.map((bookmark) => (
        <div
          className="col-span-1 aspect-video relative rounded-lg overflow-hidden"
          key={bookmark}
        >
          <InspirationItem state={decompressState(bookmark)} />
        </div>
      ))}
    </div>
  );
};
