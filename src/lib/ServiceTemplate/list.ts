const getTemplate = function (url: string = '/list') {
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
  },`
}

const funcName = 'list';

export { getTemplate,funcName };