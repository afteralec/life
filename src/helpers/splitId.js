// Function to split the standard id back into row, column coordinates
export default function splitId(id) {
  const split = id.split(": ");

  return split[1].split(", ");
}
