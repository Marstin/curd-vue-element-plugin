"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.funcName = exports.getTemplate = void 0;
const getTemplate = function (url = '/del') {
    return `
  del(ids: any) {
    return new Promise((resolve: Function, reject: Function) => {
      axios({
        url:'${url}',
        method:'get',
        params:{ids:ids}
      }).then((res: any) => {
        resolve(res.data)
      }).catch ((err) => {
        reject(err)
      })
    })
  },`;
};
exports.getTemplate = getTemplate;
const funcName = 'del';
exports.funcName = funcName;
