const getTemplate = function (url: string = '/add') {
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
  },`
}

const funcName = 'add';

export { getTemplate,funcName };