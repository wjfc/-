function _getLocalStorage(item) {
  let type = Object.prototype.toString.call(item);
  if (type !="[object String]" || item === "") {
    console.error("_getLocalStorage 你必须传一个非空字符串");
    return;
  }
  let res = localStorage.getItem(item);
  try {
    return JSON.parse(res);
  } catch (error) {
    return res
  }
}

function _setLocalStorage(item, value) {
  if (typeof value == 'object') {
    localStorage.setItem(item, JSON.stringify(value));
  } else {
    localStorage.setItem(item, value);
  }
}

// token
export function setToken(value) {
  _setLocalStorage('x-long-token', value);
}

export function getToken() {
  return _getLocalStorage('x-long-token');
}

// 微信用户信息
export function setWechatInfo(value) {
  _setLocalStorage('wechatInfo', value);
}

export function getWechatInfo() {
  return _getLocalStorage('wechatInfo');
}

// 位置信息
export function setLocation(value) {
  _setLocalStorage('location', value);
}

export function getLocation() {
  return _getLocalStorage('location');
}

export const setLocalStorage = _setLocalStorage;

export const getLocalStorage = _getLocalStorage;




