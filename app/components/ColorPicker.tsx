import { ColorPicker } from "@ark-ui/react/color-picker";
import { ComponentProps } from "react";

import EyeDropper from "./icons/color-picker.svg";

export const ColorInput = (props: ComponentProps<typeof ColorPicker.Root>) => {
  return (
    <ColorPicker.Root {...props}>
      {(api) => {
        const hueLeft = api.getChannelSliderThumbProps({ channel: "hue" }).style
          ?.left;
        return (
          <>
            <ColorPicker.Control className="size-6 overflow-hidden">
              <ColorPicker.Trigger className="w-full h-full">
                <ColorPicker.TransparencyGrid className="rounded-[7px]" />
                <ColorPicker.Swatch
                  className="size-6 rounded-md"
                  value={api.valueAsString}
                ></ColorPicker.Swatch>
              </ColorPicker.Trigger>
            </ColorPicker.Control>
            <ColorPicker.Positioner
              style={{
                background: "rgba(255,255,255,1)",
                zIndex: 1000,
                minWidth: "270px",
              }}
              className="bg-white w-[290px] rounded-[20px] overflow-hidden shadow-md"
            >
              <ColorPicker.Content className="p-[12px]">
                <ColorPicker.Area
                  style={{ border: "none" }}
                  className="w-full aspect-video rounded-[12px] overflow-hidden"
                >
                  <ColorPicker.AreaBackground className="w-full h-full" />
                  <ColorPicker.AreaThumb className="size-[20px] rounded-full shadow-md border-[4px] border-white shadow-[0_0_0_1px_rgba(0,0,0,0.2)]" />
                </ColorPicker.Area>
                <div className="h-4"></div>
                <ColorPicker.ChannelSlider className="h-[12px]" channel="hue">
                  <ColorPicker.ChannelSliderTrack className="h-full rounded-lg" />
                  <ColorPicker.ChannelSliderThumb
                    style={{
                      top: "-4px",
                      left: `calc(${hueLeft} - (${hueLeft} / 15))`,
                    }}
                    className="size-[20px] rounded-full shadow-md border-[4px] border-white shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
                  />
                </ColorPicker.ChannelSlider>
                <div className="h-3"></div>
                <ColorPicker.ChannelSlider
                  className="h-[12px] py-0"
                  channel="alpha"
                >
                  <ColorPicker.TransparencyGrid className="h-full" />
                  <ColorPicker.ChannelSliderTrack className="h-full rounded-lg" />
                  <ColorPicker.ChannelSliderThumb
                    style={{
                      top: "-4px",
                      left: `${100 * api.alpha - api.alpha * 6.8}%`,
                    }}
                    className="size-[20px] rounded-full shadow-md border-[4px] border-white shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
                  />{" "}
                </ColorPicker.ChannelSlider>
                <ColorPicker.SwatchGroup className="hidden">
                  <ColorPicker.SwatchTrigger value="red">
                    <ColorPicker.Swatch value="red">
                      <ColorPicker.SwatchIndicator>
                        ✓
                      </ColorPicker.SwatchIndicator>
                    </ColorPicker.Swatch>
                  </ColorPicker.SwatchTrigger>
                  <ColorPicker.SwatchTrigger value="blue">
                    <ColorPicker.Swatch value="blue">
                      <ColorPicker.SwatchIndicator>
                        ✓
                      </ColorPicker.SwatchIndicator>
                    </ColorPicker.Swatch>
                  </ColorPicker.SwatchTrigger>
                  <ColorPicker.SwatchTrigger value="green">
                    <ColorPicker.Swatch value="green">
                      <ColorPicker.SwatchIndicator>
                        ✓
                      </ColorPicker.SwatchIndicator>
                    </ColorPicker.Swatch>
                  </ColorPicker.SwatchTrigger>
                </ColorPicker.SwatchGroup>
                <div className="h-4"></div>
                <div className="flex flex-col gap-2">
                  <ColorPicker.FormatSelect className="hidden outline-none rounded-md py-1" />
                  <div className="flex justify-between gap-2">
                    <ColorPicker.View format="rgba" className="flex gap-2">
                      <div className="border flex items-center rounded-xl p-2 h-[40px] gap-1">
                        <div
                          style={{ backgroundColor: api.valueAsString }}
                          className="size-[24px] rounded-[8px]"
                        ></div>
                        <ColorPicker.ChannelInput
                          className="rounded-md px-1 outline-none max-w-[100px] text-black text-sm px-2 py-1"
                          channel="hex"
                        />
                      </div>
                      <ColorPicker.ChannelInput
                        className="rounded-xl px-1 outline-none max-w-[77px] text-black border text-sm px-2"
                        channel="alpha"
                      />
                    </ColorPicker.View>
                    <ColorPicker.View
                      data-open="true"
                      className="flex gap-2"
                      format="hsla"
                    >
                      <ColorPicker.ChannelInput
                        className="rounded-md px-1 outline-none min-w-[76px] text-black"
                        channel="hue"
                      />
                      <ColorPicker.ChannelInput
                        className="bg-white/80 rounded-md px-1 outline-none min-w-[76px]"
                        channel="saturation"
                      />
                      <ColorPicker.ChannelInput
                        className="bg-white/80 rounded-md px-1 outline-none min-w-[76px]"
                        channel="lightness"
                      />
                    </ColorPicker.View>
                    <ColorPicker.EyeDropperTrigger>
                      <EyeDropper />
                    </ColorPicker.EyeDropperTrigger>
                  </div>
                </div>
              </ColorPicker.Content>
            </ColorPicker.Positioner>
          </>
        );
      }}
    </ColorPicker.Root>
  );
};
