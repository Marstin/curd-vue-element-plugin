const getTemplate = function (url: string = '/update') {
  return `
  update(data: any) {
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

const funcName = 'update';

export { getTemplate,funcName };