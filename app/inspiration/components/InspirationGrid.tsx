"use client";
import { Virtuoso } from "react-virtuoso";
import {
  LuBookmarkMinus,
  LuBookmarkPlus,
  LuArrowUpRightSquare,
} from "react-icons/lu";

import { Background } from "@/app/components/Background";
import { RandomBackground } from "@/app/components/RandomBackground";
import {
  State,
  copyToClipboard,
  generateRandomState,
} from "@/app/components/helpers";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { compressState } from "@/app/components/helpers";
import Link from "next/link";
import { BookmarkContext } from "@/app/components/Bookmarks";

const InspirationItem = ({ state }: { state: State }) => {
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

export const InspirationGrid = () => {
  const [length, setLength] = useState(0);
  const [rows, setRows] = useState(new Set<State[]>());

  useEffect(() => {
    setRows(
      new Set<State[]>(
        Array.from({ length: 10 }, () => {
          return Array.from({ length: 4 }, () => generateRandomState());
        })
      )
    );
  }, []);

  const loadMore = useCallback(() => {
    return setTimeout(() => {
      setRows((prev) => {
        const newItems = Array.from({ length: 10 }, () => {
          return Array.from({ length: 4 }, () => generateRandomState());
        });
        for (const newItem of newItems) {
          prev.add(newItem);
        }
        return new Set(prev);
      });
    }, 200);
  }, []);

  useEffect(() => {
    const timeout: any = loadMore();
    return () => clearTimeout(timeout);
  }, [loadMore]);

  return (
    <Virtuoso
      style={{ width: "100%", height: "100vh" }}
      data={Array.from(rows)}
      useWindowScroll={true}
      endReached={loadMore}
      overscan={1000}
      itemContent={(index, row) => {
        return (
          <div key={index} className="grid grid-cols-4">
            {row.map((state, index) => {
              return (
                <div
                  className="col-span-4 sm:col-span-2 md:col-span-1 aspect-video"
                  key={index}
                >
                  <InspirationItem state={state} />
                </div>
              );
            })}
          </div>
        );
      }}
    />
  );
};
