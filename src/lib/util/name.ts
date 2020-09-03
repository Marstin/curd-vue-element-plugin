const name = function () {
  const nameObj: any = {}
  return function (name: string) {
    if (nameObj[name]) {
      nameObj[name] += 1;
      return name + '_' + (nameObj[name] - 1);
    } else {
      nameObj[name] = 1;
      return name;
    }
  }
}
const getName = name();
export default { getName }