import { Canvas, PNGStream } from "canvas";
import { prepareCanvas } from "./canvas/prepareCanvas";
import { ArrayOfTwoOrMore } from "./types/ArrayOfTwoOrMore";
import {MimicTypos} from "./enums/MimicTypos";
import { animateCanvas } from "./canvas/animateCanvas";
import { IToken } from "./interfaces/IToken";

export const codeToVideo = async (
  canvas: Canvas,
  width: number,
  height: number,
  code: string,
  tokens: IToken[][],
  gradientColors: ArrayOfTwoOrMore<string>,
  mimicTypos: MimicTypos,
): Promise<Array<PNGStream>> => {
  await prepareCanvas(canvas, width, height, gradientColors);
  return await animateCanvas(canvas, code, tokens, mimicTypos);
};
