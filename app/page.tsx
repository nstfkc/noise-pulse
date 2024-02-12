import { App } from "./components/App";
import { generateRandomState } from "./components/reducer";

const Page = () => {
  const initialState = generateRandomState();
  return (
    <div className="w-screen h-screen">
      <App initialState={initialState} />
    </div>
  );
};

export default Page;
