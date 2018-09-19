module.exports = function(obj, flag) {
  const arr = [];
  for (path in obj) {
    flag === 'value' ? arr.push(obj[path]) : arr.push(path);
  }
  return arr;
};
