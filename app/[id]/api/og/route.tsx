import { decompressState } from "@/app/components/helpers";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const {
    colors,
    gradientAngle,
    gradientType,
    noiseIntensity,
    noiseOpacity,
    noiseType,
  } = decompressState(params.id);
  let bg = (_deg: number) => colors[0].code;

  if (colors.length > 1) {
    bg = (deg: number) =>
      `${gradientType}(${
        gradientType === "linear-gradient" ? `${deg}deg` : "circle at center"
      }, ${colors.map((color) => `${color.code} ${color.stop}%`).join(", ")})`;
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "1200px",
          height: "630px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            background: bg(gradientAngle),
          }}
        ></div>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="n" x="0" y="0">
            <feTurbulence
              type={noiseType}
              baseFrequency={noiseIntensity * 10}
              stitchTiles={"stitch"}
            />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter="url(#n)"
            opacity={noiseOpacity}
          />
        </svg>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
