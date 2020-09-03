const assign = function (object: any, ...args: any) {
  let target = Object.assign({}, object);
  for (const arg of args) {
    target = _assign(target, arg)
  }
  return target;
}

const _assign = function (object: any, source: any) {
  let target = Object.assign({}, object);
  Object.keys(target).forEach(key => {
    let val = source[key];
    if (_isObject(val)) {
      target[key] = _assign(target[key], val)
    } else {
      val && (target[key] = val)
    }
  })
  return target;
}

const _isObject = function (val: any) {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}

export default { assign };