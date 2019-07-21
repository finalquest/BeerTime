const merge = (oldValue, newValue, oldKey = 'old', newKey = 'new') => {
  if (!oldValue) {
    return newValue;
  }
  if (!newValue) {
    return oldValue;
  }
  const isObj = obj => typeof (obj) === 'object' && !Array.isArray(obj);
  const objResult = isObj(newValue) ? newValue : { [newKey]: newValue };
  const objValue = isObj(oldValue) ? oldValue : { [oldKey]: oldValue };
  return { ...objResult, ...objValue };
};

export default merge;
