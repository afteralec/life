// Function to standardize building the id for each cell
export default function (key, row, col) {
  return `${key}: ${row}, ${col}`;
}
