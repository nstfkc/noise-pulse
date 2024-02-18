import {
  LuBookmarkMinus,
  LuBookmarkPlus,
  LuArrowUpRightSquare,
} from "react-icons/lu";

import { Background } from "@/app/components/Background";
import { State } from "@/app/components/helpers";
import { useContext } from "react";
import { compressState } from "@/app/components/helpers";
import Link from "next/link";
import { BookmarkContext } from "@/app/components/Bookmarks";

export const InspirationItem = ({ state }: { state: State }) => {
  const { addBookmark, bookmarks, removeBookmark } =
    useContext(BookmarkContext);
  const id = compressState(state);
  const isbookmarked = bookmarks.includes(id);

  const bookmarkAction = isbookmarked ? removeBookmark : addBookmark;
  return (
    <div className="w-full h-full relative group">
      <div className="absolute w-full h-full opacity-0 group-hover:opacity-100 transition">
        <div className="flex justify-end gap-1 p-1 w-full">
          <button
            className="size-8 flex items-center justify-center"
            onClick={() => bookmarkAction(id)}
          >
            {isbookmarked ? (
              <LuBookmarkMinus className="text-lg" />
            ) : (
              <LuBookmarkPlus className="text-lg" />
            )}
          </button>
          <Link
            target="_blank"
            href={`/${id}`}
            className="size-8 flex items-center justify-center"
          >
            <LuArrowUpRightSquare className="text-lg" />
          </Link>
        </div>
      </div>
      <Background state={state} />
    </div>
  );
};
