import SpaceScene from "./SpaceScene";

/**
 * CanvasBackground — Renders the 3D space scene (stars, constellations, nebulas)
 * behind all content. Delegates to SpaceScene for the canvas-based rendering.
 */
export default function CanvasBackground() {
  return <SpaceScene />;
}
