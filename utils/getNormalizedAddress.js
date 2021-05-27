const getNormalizedAddress = (addressToDisplay) => {
  const addressValues = [];

  for (const item in addressToDisplay) {
    if (!["_id", "is_default", "phone_number"].includes(item)) {
      addressValues.push(addressToDisplay[item]);
    }
  }

  return addressValues.join(", ");
};

export default getNormalizedAddress;
