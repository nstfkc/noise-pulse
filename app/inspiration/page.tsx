import { Toaster } from "sonner";
import { BookmarkProvider } from "../components/Bookmarks";
import { InspirationGrid } from "./components/InspirationGrid";

const Inspiration = () => {
  return (
    <BookmarkProvider>
      <Toaster />
      <InspirationGrid />
    </BookmarkProvider>
  );
};

export default Inspiration;
