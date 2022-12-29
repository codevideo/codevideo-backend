import { CanvasRenderingContext2D } from "canvas";

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  fill: string,
  // TODO: reinclude later with more themes
  // stroke?: string,
  // strokeWidth?: number
) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = fill;
  ctx.fill();
  // if (stroke && strokeWidth) {
  //   ctx.lineWidth = strokeWidth;
  //   ctx.strokeStyle = stroke;
  //   ctx.stroke();
  // }
};
