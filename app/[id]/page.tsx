import { Metadata } from "next";
import { App } from "../components/App";
import { decompressState } from "../components/helpers";
import { generateRandomState } from "../components/reducer";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  // read route params
  const id = params.id;

  return {
    title: "Noisy Gradient Background",
    openGraph: {
      images: [`api/og/${id}`],
    },
    twitter: {
      images: [`api/og/${id}`],
    },
  };
}

const Page = (props: any) => {
  const { params } = props;

  let initialState = generateRandomState();
  if (params["id"]) {
    try {
      initialState = decompressState(params["id"]);
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