
// hash
function generateGroup() {
  const data = {};
  return (key, value) => {
    if (data[key] !== undefined) {
      data[key].push(value);
    } else {
      data[key] = [value];
    }
    return data;
  };
};
