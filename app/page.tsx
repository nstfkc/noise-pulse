import { App } from "./components/App";
import { decompressState } from "./components/helpers";
import { generateRandomState } from "./components/reducer";

const Page = (props: any) => {
  const { searchParams } = props;

  let initialState = generateRandomState();
  if (searchParams["state"]) {
    try {
      initialState = decompressState(searchParams["state"]);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="w-screen h-screen">
      <App initialState={initialState} />
    </div>
  );
};

export default Page;
