import { BookmarkProvider } from "../components/Bookmarks";

const Bookmarks = () => {
  return (
    <BookmarkProvider>
      <BookmarksGrid />
    </BookmarkProvider>
  );
};

export default Bookmarks;
