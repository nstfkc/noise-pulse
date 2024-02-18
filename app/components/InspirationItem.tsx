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
import { toast } from "sonner";

export const InspirationItem = ({
  state,
  hideBookmark = false,
}: {
  state: State;
  hideBookmark?: boolean;
}) => {
  const { addBookmark, bookmarks, removeBookmark } =
    useContext(BookmarkContext);
  const id = compressState(state);
  const isbookmarked = bookmarks.includes(id);

  const bookmarkAction = isbookmarked ? removeBookmark : addBookmark;
  return (
    <div
      className="w-full h-full relative group"
      onMouseEnter={() => console.log("enter")}
    >
      <div className="absolute z-[10] w-full h-full opacity-0 group-hover:opacity-100 transition">
        <div className="flex justify-end gap-1 p-1 w-full">
          {hideBookmark ? null : (
            <button
              className="size-8 flex items-center justify-center"
              onClick={() => {
                bookmarkAction(id);
                if (isbookmarked) {
                  toast.success("Removed from bookmarks");
                } else {
                  toast.success("Added to bookmarks");
                }
              }}
            >
              {isbookmarked ? (
                <LuBookmarkMinus className="text-xl" />
              ) : (
                <LuBookmarkPlus className="text-xl" />
              )}
            </button>
          )}
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
