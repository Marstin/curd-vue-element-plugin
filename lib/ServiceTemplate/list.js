"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.funcName = exports.getTemplate = void 0;
const getTemplate = function (url = '/list') {
    return `
  list(data: any){
    return new Promise((resolve: Function, reject: Function) => {
      axios({
        url:'${url}',
        method:'get',
        params:data
      }).then((res: any) => {
        resolve(res.data)
      }).catch((err: any) => {
        reject(err)
      })
    })
  },`;
};
exports.getTemplate = getTemplate;
const funcName = 'list';
exports.funcName = funcName;
