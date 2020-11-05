export default function (id) {
  const split = id.split(": ");

  return split[1].split(", ");
}
