import makeId from "../helpers/makeId";
import shapes from "../data/shapes";

// Function to, given a center point on the grid, render the ids of the rest
//  of the shape's points
export default function renderShape({ row, col }, selectedShape, key = "main") {
  if (!row || !col) return false;

  const shape = {};

  shapes[selectedShape].coords.forEach((coords) => {
    shape[makeId(key, row + coords[0], col + coords[1])] = true;
  });

  return shape;
}

// Function to, given a center point, draw a truncated shape for use in the
//   shapes drawer at the top of the UI
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
