"use client";
import { Virtuoso } from "react-virtuoso";

import { State, generateRandomState } from "@/app/components/helpers";
import { useCallback, useEffect, useState } from "react";
import { InspirationItem } from "@/app/components/InspirationItem";

export const InspirationGrid = () => {
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
