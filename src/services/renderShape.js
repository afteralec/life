import makeId from "./makeId";
import shapes from "./shapes";

export default function renderShape({ row, col }, selectedShape, key = "main") {
  if (!row || !col) return false;

  const shape = {};

  shapes[selectedShape].coords.forEach((coords) => {
    shape[makeId(key, row + coords[0], col + coords[1])] = true;
  });

  return shape;
}

export function renderAccordionShape({ row, col }, selectedShape, key) {
  if (!row || !col) return false;

  const shape = {};

  const coords =
    shapes[selectedShape].accordion.coords || shapes[selectedShape].coords;

  coords.forEach((coords) => {
    shape[makeId(key, row + coords[0], col + coords[1])] = true;
  });

  return shape;
}
