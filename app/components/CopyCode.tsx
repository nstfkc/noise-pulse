import CopyIcon from "./icons/copy.svg";

export const CopyCode = () => {
  return (
    <div className="flex py-4 justify-center">
      <button
        className={[
          "bg-gradient-to-t from-[#9730ff] to-[#7f30ff]",
          "shadow-[0_0_0_4px_#202e42]",
          "py-2 px-4 rounded-xl text-white",
          "flex gap-2 items-center",
        ].join(" ")}
      >
        <CopyIcon /> <span className="text-[15px]">Copy Code</span>
      </button>
      <button></button>
    </div>
  );
};
