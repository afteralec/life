import ShapeGrid from "../components/ShapeGrid";
import makeId from "./makeId";
import shapes from "./shapes";

export default function renderShape({ row, col }, selectedShape, key = "main") {
  if (!row || !col) return false;

  const shape = {};

  shapes[selectedShape].forEach((coords) => {
    shape[makeId(key, row + coords[0], col + coords[1])] = true;
  });

  return shape;
}
