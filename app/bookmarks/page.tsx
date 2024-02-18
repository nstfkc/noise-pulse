import { BookmarkProvider } from "../components/Bookmarks";
import { BookmarksGrid } from "./components/BookmarksGrid";

const Bookmarks = () => {
  return (
    <BookmarkProvider>
      <BookmarksGrid />
    </BookmarkProvider>
  );
};

export default Bookmarks;
