import { toast } from "sonner";
import {
  ComponentProps,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import CopyIcon from "./icons/copy.svg";
import ShareIcon from "./icons/share.svg";
import * as Popover from "@radix-ui/react-popover";
import { copyToClipboard, generateCode } from "./helpers";
import { Context } from "./context";
import { LuBookmarkMinus, LuBookmarkPlus } from "react-icons/lu";
import { BookmarkContext } from "./Bookmarks";
import { useParams } from "next/navigation";

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
        .map((color: any) => `${color.code} ${color.stop}%`)
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
  const params = useParams();
  const id = String(params.id);

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setIsBookmarked(bookmarks.includes(id));
  }, [bookmarks, id]);

  const bookmarkAction = isBookmarked ? removeBookmark : addBookmark;
  return (
    <div>
      <div className="flex py-2">
        <div className="bg-[#202e42] md:p-2 rounded-[20px] flex w-full justify-between items-center gap-2">
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
            className="py-2 flex gap-2 items-center active:scale-[0.99]"
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
    </div>
  );
};
