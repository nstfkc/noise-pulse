import uniqolor from "uniqolor";

import { State, arrayDiff, generateRandomId } from "./helpers";
import { Reducer } from "react";

type AddColor = {
  type: "ADD_COLOR";
  payload: {
    code?: string;
    stop?: number;
  };
};

type RemoveColor = {
  type: "REMOVE_COLOR";
  payload: {
    id: string;
  };
};

type UpdateColorCode = {
  type: "UPDATE_COLOR_CODE";
  payload: {
    id: string;
    code?: string;
  };
};

type UpdateSelectedGradientColorId = {
  type: "UPDATE_SELECTED_GRADIENT_COLOR_ID";
  payload: {
    id: string;
  };
};

type UpdateColorStops = {
  type: "UPDATE_COLOR_STOPS";
  payload: {
    colorStopsArray: number[];
  };
};

type UpdateGradientAngle = {
  type: "UPDATE_GRADIENT_ANGLE";
  payload: {
    gradientAngle: number;
  };
};

type UpdateGradientType = {
  type: "UPDATE_GRADIENT_TYPE";
  payload: {
    gradientType: "linear-gradient" | "radial-gradient";
  };
};

type UpdateNoiseType = {
  type: "UPDATE_NOISE_TYPE";
  payload: {
    noiseType: "turbulence" | "fractalNoise";
  };
};

type UpdateNoiseIntensity = {
  type: "UPDATE_NOISE_INTENSITY";
  payload: {
    noiseIntensity: number;
  };
};

type UpdateNoiseOpacity = {
  type: "UPDATE_NOISE_OPACITY";
  payload: {
    noiseOpacity: number;
  };
};

type Reset = {
  type: "RESET";
  payload: {};
};

export type Action =
  | AddColor
  | RemoveColor
  | UpdateSelectedGradientColorId
  | UpdateColorCode
  | UpdateColorStops
  | UpdateGradientAngle
  | UpdateGradientType
  | UpdateNoiseType
  | UpdateNoiseIntensity
  | UpdateNoiseOpacity
  | Reset;

type Handler<T extends Action> = (payload: T["payload"], state: State) => State;

const addColor: Handler<AddColor> = (payload, state) => {
  let nextId = generateRandomId();

  return {
    ...state,
    colors: [
      ...state.colors,
      {
        id: nextId,
        code: payload.code || uniqolor.random().color,
        stop: payload.stop || 100,
      },
    ].sort((a, b) => a.stop - b.stop),
  };
};

const updateSelectedGradientColorId: Handler<UpdateSelectedGradientColorId> = (
  payload,
  state
) => {
  return {
    ...state,
    selectedColorId: payload.id,
  };
};

const removeColor: Handler<RemoveColor> = (payload, state) => {
  const updatedColors = state.colors.filter((color) => color.id !== payload.id);
  let selectedColorId = state.selectedColorId;
  if (state.selectedColorId === payload.id) {
    selectedColorId = updatedColors[0]?.id ?? "";
  }
  return {
    ...state,
    colors: updatedColors,
    selectedColorId,
  };
};

const updateColorCode: Handler<UpdateColorCode> = (payload, state) => {
  const { id, code } = payload;

  return {
    ...state,
    colors: state.colors.map((color) => {
      if (color.id === id) {
        return {
          ...color,
          code: code || color.code,
        };
      }
      return color;
    }),
  };
};

const updateColorStops: Handler<UpdateColorStops> = (payload, state) => {
  const currentStops = state.colors.map((color) => color.stop);

  let updatedColorId = "";
  const diff = arrayDiff(payload.colorStopsArray, currentStops);

  if (!diff) {
    return state;
  }

  for (const color of state.colors) {
    if (!payload.colorStopsArray.includes(color.stop)) {
      updatedColorId = color.id;
      break;
    }
  }

  const updatedColorIndex = state.colors
    .map((color, index) => (color.id === updatedColorId ? index : undefined))
    .filter((index) => index !== undefined)[0];

  if (updatedColorIndex === undefined) {
    return state;
  }

  const min = state.colors?.[updatedColorIndex - 1]?.stop ?? 0;
  const max = state.colors?.[updatedColorIndex + 1]?.stop ?? 100;

  if (diff >= min && diff <= max) {
    return {
      ...state,
      colors: state.colors.map((color) => {
        if (color.id === updatedColorId) {
          return {
            ...color,
            stop: diff,
          };
        }
        return color;
      }),
    };
  }
  return state;
};

const updateGradientAngle: Handler<UpdateGradientAngle> = (payload, state) => {
  return {
    ...state,
    gradientAngle: payload.gradientAngle,
  };
};

const updateGradientType: Handler<UpdateGradientType> = (payload, state) => {
  return {
    ...state,
    gradientType: payload.gradientType,
  };
};

const updateNoiseType: Handler<UpdateNoiseType> = (payload, state) => {
  return {
    ...state,
    noiseType: payload.noiseType,
  };
};
const updateNoiseIntensity: Handler<UpdateNoiseIntensity> = (
  payload,
  state
) => {
  return {
    ...state,
    noiseIntensity: payload.noiseIntensity,
  };
};

const updateNoiseOpacity: Handler<UpdateNoiseOpacity> = (payload, state) => {
  return {
    ...state,
    noiseOpacity: payload.noiseOpacity,
  };
};

const reset = (): State => {
  const id1 = generateRandomId();
  const id2 = generateRandomId();

  const firstStop = Math.floor(Math.random() * 30) + 1;
  const secondStop = Math.floor(Math.random() * 30) + 30;
  const thirdStop = Math.floor(Math.random() * 30) + 70;

  const thridColor =
    Math.random() * 10 > 5
      ? {
          id: generateRandomId(),
          code: uniqolor.random().color,
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
    noiseIntensity: Number((Math.random() * 5).toFixed(2)),
    noiseOpacity: Number(Math.random().toFixed(2)),
  };
};

const handlers = {
  ADD_COLOR: addColor,
  REMOVE_COLOR: removeColor,
  UPDATE_SELECTED_GRADIENT_COLOR_ID: updateSelectedGradientColorId,
  UPDATE_COLOR_CODE: updateColorCode,
  UPDATE_COLOR_STOPS: updateColorStops,
  UPDATE_GRADIENT_ANGLE: updateGradientAngle,
  UPDATE_GRADIENT_TYPE: updateGradientType,
  UPDATE_NOISE_TYPE: updateNoiseType,
  UPDATE_NOISE_INTENSITY: updateNoiseIntensity,
  UPDATE_NOISE_OPACITY: updateNoiseOpacity,
  RESET: reset,
};

export const reducer: Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  const handler = handlers[action.type] ?? (() => state);
  return handler(action.payload as any, state);
};
