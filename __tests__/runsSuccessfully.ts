import { createCanvas } from "canvas";
import { codeToVideo } from "../src/codeToVideo";
import { MimicTypos } from "../src/enums/MimicTypos";
import { describe, expect, test } from "@jest/globals";

describe("codeToVideo runs successfully", () => {
  
  jest.setTimeout(60000);
  
  test("codeToVideo runs successfully", async () => {
    const width = 1920;
    const height = 1080;
    const canvas = createCanvas(width, height);

    // sample code
    const code = `// My awesome TypeScript function!
export const areEqual = (a: number, b: number): boolean => {
    return a === b;
}`;

    // and the corresponding tokens as generated by a monaco tokenizer (must be done in client for now unfortunately, maybe there is a node engine that can do this)
    const tokens = [
      [{ offset: 0, type: "comment.ts", language: "typescript" }],
      [
        { offset: 0, type: "keyword.ts", language: "typescript" },
        { offset: 6, type: "", language: "typescript" },
        { offset: 7, type: "keyword.ts", language: "typescript" },
        { offset: 12, type: "", language: "typescript" },
        { offset: 13, type: "identifier.ts", language: "typescript" },
        { offset: 21, type: "", language: "typescript" },
        { offset: 22, type: "delimiter.ts", language: "typescript" },
        { offset: 23, type: "", language: "typescript" },
        {
          offset: 24,
          type: "delimiter.parenthesis.ts",
          language: "typescript",
        },
        { offset: 25, type: "identifier.ts", language: "typescript" },
        { offset: 26, type: "delimiter.ts", language: "typescript" },
        { offset: 27, type: "", language: "typescript" },
        { offset: 28, type: "keyword.ts", language: "typescript" },
        { offset: 34, type: "delimiter.ts", language: "typescript" },
        { offset: 35, type: "", language: "typescript" },
        { offset: 36, type: "identifier.ts", language: "typescript" },
        { offset: 37, type: "delimiter.ts", language: "typescript" },
        { offset: 38, type: "", language: "typescript" },
        { offset: 39, type: "keyword.ts", language: "typescript" },
        {
          offset: 45,
          type: "delimiter.parenthesis.ts",
          language: "typescript",
        },
        { offset: 46, type: "delimiter.ts", language: "typescript" },
        { offset: 47, type: "", language: "typescript" },
        { offset: 48, type: "keyword.ts", language: "typescript" },
        { offset: 55, type: "", language: "typescript" },
        { offset: 56, type: "delimiter.ts", language: "typescript" },
        { offset: 58, type: "", language: "typescript" },
        { offset: 59, type: "delimiter.bracket.ts", language: "typescript" },
      ],
      [
        { offset: 0, type: "", language: "typescript" },
        { offset: 4, type: "keyword.ts", language: "typescript" },
        { offset: 10, type: "", language: "typescript" },
        { offset: 11, type: "identifier.ts", language: "typescript" },
        { offset: 12, type: "", language: "typescript" },
        { offset: 13, type: "delimiter.ts", language: "typescript" },
        { offset: 16, type: "", language: "typescript" },
        { offset: 17, type: "identifier.ts", language: "typescript" },
        { offset: 18, type: "delimiter.ts", language: "typescript" },
      ],
      [{ offset: 0, type: "delimiter.bracket.ts", language: "typescript" }],
    ];

    const readableStreamsTypoNever = await codeToVideo(
      canvas,
      width,
      height,
      code,
      tokens,
      ["blue", "red"],
      MimicTypos.NEVER
    );

    expect(readableStreamsTypoNever.length).toBeGreaterThan(0);

    const readableStreamsTypoSometimes = await codeToVideo(
      canvas,
      width,
      height,
      code,
      tokens,
      ["blue", "red"],
      MimicTypos.SOMETIMES
    );

    expect(readableStreamsTypoSometimes.length).toBeGreaterThan(0);

    const readableStreamsTypoOften = await codeToVideo(
      canvas,
      width,
      height,
      code,
      tokens,
      ["blue", "red"],
      MimicTypos.OFTEN
    );

    expect(readableStreamsTypoOften.length).toBeGreaterThan(0);
  })
});
