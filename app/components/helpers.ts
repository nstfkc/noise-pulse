import uniqolor from "uniqolor";
import { log } from "util";

export type Color = {
  id: string;
  code: string;
  stop: number;
};

export function generateRandomId(length: number = 6): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export function arrayDiff<T>(arr1: T[], arr2: T[]): T | undefined {
  for (const x of arr1) {
    if (!arr2.includes(x)) {
      return x;
    }
  }
}

export function base64Encode(str: string): string {
  return btoa(encodeURIComponent(str));
}

export function base64Decode(str: string): string {
  try {
    return decodeURIComponent(atob(str.replaceAll("%3D", "")));
  } catch (err) {
    console.log(str);
    throw new Error("Invalid base64 string");
    // Do something
  }
}

export const compressState = (state: State): string => {
  const {
    colors,
    gradientAngle,
    gradientType,
    noiseType,
    noiseIntensity,
    noiseOpacity,
  } = state;
  return base64Encode(
    [
      colors
        .map(({ code, stop }) => `${code.replaceAll(" ", "")}:${stop}`)
        .join("|"),
      gradientAngle,
      gradientType === "linear-gradient" ? "l" : "r",
      noiseType === "turbulence" ? "t" : "f",
      noiseIntensity,
      noiseOpacity,
    ].join(";")
  );
};

export const decompressState = (str: string): State => {
  const [
    colors,
    gradientAngle,
    gradientType,
    noiseType,
    noiseIntensity,
    noiseOpacity,
  ] = base64Decode(str).split(";");
  const id1 = generateRandomId();

  return {
    colors: colors.split("|").map((color, index) => {
      const [code, stop] = color.split(":");
      return {
        id: index === 0 ? id1 : generateRandomId(),
        code,
        stop: Number(stop),
      };
    }),
    gradientAngle: Number(gradientAngle),
    gradientType: gradientType === "l" ? "linear-gradient" : "radial-gradient",
    noiseType: noiseType === "t" ? "turbulence" : "fractalNoise",
    noiseIntensity: Number(noiseIntensity),
    noiseOpacity: Number(noiseOpacity),
    selectedColorId: id1,
  };
};

type Params = {
  background: string;
  noiseType: string;
  baseFrequency: number;
  opacity: number;
  kind: "html" | "jsx";
};

export function generateCode(params: Params) {
  const { background, baseFrequency, noiseType, opacity } = params;
  if (params.kind === "jsx") {
    return `<div style={{ position:'absolute', width:'100%',height:'100%',zIndex:0,pointerEvents:'none',background:'${background}'}}>
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <filter id="n" x="0" y="0">
      <feTurbulence
        type="${noiseType}"
        baseFrequency="${baseFrequency}"
        stitchTiles="stitch"
      />
    </filter>
    <rect
      width="100%"
      height="100%"
      filter="url(#n)"
      opacity="${opacity}"
    />
  </svg>
</div>`;
  }
  if (params.kind === "html") {
    return `<div style="position:absolute;width:100%;height:100%;z-index:0;pointer-events:none;background:${background}">
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <filter id="n" x="0" y="0">
      <feTurbulence
        type="${noiseType}"
        baseFrequency="${baseFrequency}"
        stitchTiles="stitch"
      />
    </filter>
    <rect
      width="100%"
      height="100%"
      filter="url(#n)"
      opacity="${opacity}"
    />
  </svg>
</div>
`;
  }
}

export const copyToClipboard = (str: string, cb: VoidFunction) => {
  navigator.permissions
    .query({ name: "clipboard-write" } as any)
    .then((result) => {
      if (result.state === "granted" || result.state === "prompt") {
        navigator.clipboard.writeText(str);
        cb();
      }
    });
};

export type State = {
  colors: Color[];
  gradientAngle: number;
  selectedColorId: string;
  gradientType: "linear-gradient" | "radial-gradient";
  noiseType: "turbulence" | "fractalNoise";
  noiseIntensity: number;
  noiseOpacity: number;
};

export const generateRandomState = (): State => {
  const id1 = generateRandomId();
  const id2 = generateRandomId();

  const firstStop = Math.floor(Math.random() * 30) + 1;
  const secondStop = Math.floor(Math.random() * 30) + 30;
  const thirdStop = Math.floor(Math.random() * 30) + 70;

  const thridColor =
    Math.random() * 10 > 5
      ? {
          id: generateRandomId(),
          code: uniqolor.random({
            saturation: Math.random() * 100,
            lightness: Math.random() * 100,
            differencePoint: Math.random() * 100,
          }).color,
          stop: thirdStop,
        }
      : null;
  return {
    colors: [
      {
        id: id1,
        code: uniqolor.random().color,
        stop: firstStop,
      },
      {
        id: id2,
        code: uniqolor.random().color,
        stop: thridColor ? secondStop : thirdStop,
      },
      ...(thridColor ? [thridColor] : []),
    ],
    selectedColorId: id1,
    gradientAngle: Math.floor(Math.random() * 360) + 1,
    gradientType:
      Math.random() * 10 > 5 ? "linear-gradient" : "radial-gradient",
    noiseType: Math.random() * 10 > 5 ? "turbulence" : "fractalNoise",
    noiseIntensity: Math.max(0.2, Number((Math.random() * 5).toFixed(2))),
    noiseOpacity: Number(Math.random().toFixed(2)),
  };
};
