module.exports = function(obj, props) {
  const newObj = {};
  props.forEach(p => (newObj[p] = obj[p]));
  return newObj;
};
