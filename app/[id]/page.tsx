import { Metadata } from "next";
import { App } from "../components/App";
import { decompressState } from "../components/helpers";
import { generateRandomState } from "../components/helpers";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const id = params.id;

  return {
    title: "Noise Pulse",
    description: "Background generator with noise and gradients",
    metadataBase: new URL(
      process.env.NODE_ENV !== "development"
        ? `https://noise-pulse.vercel.app`
        : "http://localhost:3000"
    ),
    openGraph: {
      title: "Noise Pulse",

      description: "Background generator with noise and gradients",
      images: [`${id}/api/og`],
    },
    twitter: {
      title: "Noise Pulse",
      description: "Background generator with noise and gradients",
      images: [`${id}/api/og`],
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
