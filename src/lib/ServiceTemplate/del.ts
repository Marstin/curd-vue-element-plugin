const getTemplate = function (url: string = '/del') {
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
  },`
}

const funcName = 'del';

export { getTemplate,funcName };