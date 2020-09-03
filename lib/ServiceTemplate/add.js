"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.funcName = exports.getTemplate = void 0;
const getTemplate = function (url = '/add') {
    return `
  add(data: any) {
    return new Promise((resolve: Function,reject: Function) => {
      axios({
        url:'${url}',
        method:'post',
        data:data
      }).then((res: any) => {
        resolve(res.data)
      }).catch((err: any) => {
        reject(err)
      });
    })
  },`;
};
exports.getTemplate = getTemplate;
const funcName = 'add';
exports.funcName = funcName;
