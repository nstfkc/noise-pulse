import { redirect } from "next/navigation";
import { decompressState, compressState } from "./components/helpers";
import { generateRandomState } from "./components/reducer";

const Page = (props: any) => {
  const { searchParams } = props;

  let initialState = generateRandomState();
  if (searchParams["i"]) {
    try {
      initialState = decompressState(searchParams["i"]);
    } catch (e) {
      console.error(e);
    }
  }

  redirect(`/${compressState(initialState)}`);
};

export default Page;
