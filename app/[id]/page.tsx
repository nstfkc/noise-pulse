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
      title: "Noisy Gradient Background",
      description: "Create a noisy gradient background",
      images: [`/${id}/api/og`],
    },
    twitter: {
      title: "Noisy Gradient Background",
      description: "Create a noisy gradient background",
      images: [`/${id}/api/og`],
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
