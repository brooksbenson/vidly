module.exports = function(input, schema) {
  const derivedSchema = {};
  for (let key of Object.keys(input)) {
    derivedSchema[key] = schema[key];
  }
  return derivedSchema;
};
