import { Toaster, toast } from "sonner";
import { ComponentProps, PropsWithChildren, useContext } from "react";
import CopyIcon from "./icons/copy.svg";
import ShareIcon from "./icons/share.svg";
import * as Popover from "@radix-ui/react-popover";
import { copyToClipboard, generateCode } from "./helpers";
import { Context } from "./context";
import { LuBookmarkMinus, LuBookmarkPlus } from "react-icons/lu";
import { BookmarkContext } from "./Bookmarks";

const CodeMenu = (
  props: PropsWithChildren<ComponentProps<typeof Popover.Root>>
) => {
  const { state } = useContext(Context);
  let bg = (_deg: number) => state.colors[0].code;

  if (state.colors.length > 1) {
    bg = (deg: number) =>
      `${state.gradientType}(${
        state.gradientType === "linear-gradient"
          ? `${deg}deg`
          : "circle at center"
      }, ${state.colors
        .map((color) => `${color.code} ${color.stop}%`)
        .join(", ")})`;
  }

  const generate = (kind: string) => {
    return generateCode({
      background: bg(state.gradientAngle),
      baseFrequency: state.noiseIntensity,
      noiseType: state.noiseType,
      opacity: state.noiseOpacity,
      kind: kind as any,
    });
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>{props.children}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded-[20px] bg-white translate-y-[-8px] shadow-lg"
          sideOffset={5}
        >
          <div className="flex flex-col px-2 py-2">
            <div className="hover:bg-black/10 rounded-[12px]">
              <button
                onClick={() => {
                  copyToClipboard(generate("html")!, () => {
                    toast.success("Html is copied to clipboard");
                  });
                }}
                className="flex items-center gap-2 px-2 py-1"
              >
                <span className="text-[#586F92]">
                  <CopyIcon />
                </span>
                <span className="text-[15px]">Copy HTML</span>
              </button>
            </div>
            <div className="hover:bg-black/10 rounded-[12px]">
              <button
                onClick={() => {
                  copyToClipboard(generate("jsx")!, () => {
                    toast.success("JSX is copied to clipboard");
                  });
                }}
                className="flex items-center gap-2 px-2 py-1"
              >
                <span className="text-[#586F92]">
                  <CopyIcon />
                </span>
                <span className="text-[15px]">Copy JSX</span>
              </button>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export const CopyCode = () => {
  const { addBookmark, bookmarks, removeBookmark } =
    useContext(BookmarkContext);
  const id = String(window.location.href.split("/").pop()?.replaceAll("=", ""));
  const isBookmarked = bookmarks.includes(id);
  const bookmarkAction = isBookmarked ? removeBookmark : addBookmark;
  return (
    <div>
      <div className="flex py-2 justify-center">
        <div className="bg-[#202e42] p-2 rounded-[20px] flex items-center gap-4">
          <CodeMenu>
            <button
              className={[
                "bg-gradient-to-t from-[#9730ff] to-[#7f30ff]",
                "py-2 px-4 rounded-[12px] text-white",
                "flex gap-2 items-center",
                "active:scale-[0.99]",
              ].join(" ")}
            >
              <CopyIcon /> <span className="text-[15px]">Copy Code</span>
            </button>
          </CodeMenu>
          <button
            onClick={() => {
              copyToClipboard(window.location.href, () => {
                toast.success("Link copied to clipboard");
              });
            }}
            className="py-2 px-4 flex gap-2 items-center active:scale-[0.99]"
          >
            <ShareIcon /> <span className="text-[15px] text-white">Share</span>
          </button>
          <button
            onClick={() => {
              bookmarkAction(id);
              if (isBookmarked) {
                toast.success("Bookmark removed");
              } else {
                toast.success("Bookmark saved");
              }
            }}
            className="py-2 px-4 flex gap-2 items-center active:scale-[0.99]"
          >
            {isBookmarked ? (
              <LuBookmarkMinus className="text-white text-2xl" />
            ) : (
              <LuBookmarkPlus className="text-white text-2xl" />
            )}
            <span className="text-[15px] text-white">Bookmark</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-sm py-1">
        <div>
          Built by{" "}
          <a
            className="underline"
            href="https://x.com/nstfkc"
            target="_blank"
            rel="noopener noreferrer"
          >
            @nstfkc
          </a>{" "}
          and{" "}
          <a
            className="underline"
            href="https://x.com/emblemo"
            target="_blank"
            rel="noopener noreferrer"
          >
            @emblemo
          </a>
        </div>
      </div>
    </div>
  );
};
