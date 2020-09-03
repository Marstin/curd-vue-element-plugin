import fs from 'fs'
const writeTemplate = function (dir: string, name: string, content: string) {
  return new Promise((resolve, reject) => {
    const path = dir + '/' + name;
    hasNoFile(path)
      .then(() => createDir(dir))
      .then(() => writeFile(path, content))
      .then(() => resolve(`Info:${path}文件写入完成`))
      .catch((err: any) => reject(err));
  })
}

const createDir = function (dir: string) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, { recursive: true }, (err) => {
      err ? reject(err) : resolve()
    })
  })
}

const writeFile = function (path: string, content: string) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, 'utf8', (err) => {
      err ? reject(err) : resolve()
    })
  })
}

const hasNoFile = function (path: string): any {
  return new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      err ? resolve() : reject(`Warn: ${path} 已存在`)
    });
  })
}

export default { writeTemplate }