import { BookmarkProvider } from "../components/Bookmarks";
import { InspirationGrid } from "./components/InspirationGrid";

const Inspiration = () => {
  return (
    <BookmarkProvider>
      <InspirationGrid />
    </BookmarkProvider>
  );
};

export default Inspiration;
