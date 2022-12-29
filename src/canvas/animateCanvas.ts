import { Canvas, PNGStream } from 'canvas';
import Monokai from "monaco-themes/themes/Monokai.json";
import { colorCodeCharacter } from "./colorCodeCharacter";
import { MimicTypos } from "../enums/MimicTypos";
import { runTypoLogic } from "../canvas/runTypoLogic";
import { sleep } from "../utils/sleep";
import { IToken } from '../interfaces/IToken';

export const animateCanvas = async (
  canvas: Canvas,
  code: string,
  tokens: IToken[][],
  mimicTypos: MimicTypos
): Promise<Array<PNGStream>> => {
  const ctx = canvas.getContext("2d");

  // create array of readable streams to add to
  const readableStreams: Array<PNGStream> = [];

  // font stuff
  const paddingAmountX = 120;
  const paddingAmountY = 170;
  const fontSize = 20;
  const characterOffset = fontSize / 1.7;
  const lineHeight = fontSize * 1.5;
  ctx.font = `bold ${fontSize}px Fira Code`;

  const codeLines = code.split("\n");

  // add a sleep for a smooth start
  await sleep(500);

  // add an initial snapshot of the canvas
  readableStreams.push(canvas.createPNGStream({ compressionLevel: 0, filters: canvas.PNG_FILTER_NONE }));

  // now loop at each line and each character
  // and color code it based on the token type
  for (let lineIndex = 0; lineIndex < tokens.length; lineIndex++) {
    const sleepAmount = 50;
    // calculate a sleep amount randomly anywhere between 50 - 100 - but this seems to make ffmpeg go haywire
    // const sleepAmount = Math.floor(Math.random() * 50) + 50;
    const lineCharacters = codeLines[lineIndex];
    for (
      let characterIndex = 0;
      characterIndex < lineCharacters.length;
      characterIndex++
    ) {
      console.log("characterIndex", characterIndex);
      // TODO: theme should also come from redux
      const tokenStyle = colorCodeCharacter(
        lineIndex,
        characterIndex,
        tokens,
        Monokai,
        codeLines[lineIndex][characterIndex]
      );
      // TODO: fallback should come from redux
      // TODO: would be also cool to use background color
      // only change if foreground was foreground
      if (tokenStyle.foreground) {
        ctx.fillStyle = tokenStyle.foreground;
      }
      // fill text of character at proper coordinates
      ctx.fillText(
        codeLines[lineIndex][characterIndex],
        characterIndex * characterOffset + paddingAmountX,
        lineIndex * lineHeight + paddingAmountY
      );

      // run typo logic
      await runTypoLogic(
        mimicTypos,
        ctx,
        characterIndex * characterOffset + paddingAmountX,
        lineIndex * lineHeight + paddingAmountY,
        characterOffset
      );

      console.log({
        color: tokenStyle.foreground,
        character: codeLines[lineIndex][characterIndex],
        x: characterIndex * characterOffset + paddingAmountX,
        y: lineIndex * lineHeight + paddingAmountY,
      });
      // lil' checky sleep to make it look like it's typing
      await sleep(sleepAmount);
      readableStreams.push(canvas.createPNGStream({ compressionLevel: 0, filters: canvas.PNG_FILTER_NONE }));
    }
    await sleep(sleepAmount);
      readableStreams.push(canvas.createPNGStream({ compressionLevel: 0, filters: canvas.PNG_FILTER_NONE }));
  }

  // all was well
  console.log("returning readableStreams!");
  return readableStreams;
};
