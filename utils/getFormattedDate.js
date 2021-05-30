const parseISOString = (date) => {
  const dateString = date.toString().split(/\D+/);

  return new Date(
    Date.UTC(dateString[0], --dateString[1], dateString[2], dateString[3])
  )
    .toString()
    .split(" ")
    .slice(0, 4)
    .join(" ");
};

export default parseISOString;
