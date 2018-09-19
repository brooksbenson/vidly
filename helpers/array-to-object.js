module.exports = function(arr) {
  const obj = {};
  arr.forEach(v => (obj[v] = true));
  return obj;
};
