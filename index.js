function called (compute) {
  const fn = function () {
    let error = null; let result = null; let self = this
    try {
      result = compute.apply(this, arguments)
    } catch (e) {
      error = e
    }
    setTimeout(() => handlers.forEach((h) => h.call(self, error, result)), 0)
    return result
  }

  const handlers = []
  fn.subscribe = function (callback) {
    handlers.push(callback)
    return () => void handlers.splice(handlers.indexOf(callback) >>> 0, 1)
  }
  return fn
};

module.exports = called
