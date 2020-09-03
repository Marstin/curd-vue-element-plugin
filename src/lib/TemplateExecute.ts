import { OptionInterface, TemplateInterface } from './Interface'
import Util from './util'
import ServiceTemplate from './ServiceTemplate'
import ViewTemplate from './ViewTemplate'
import { DefaultOption } from './DefaultOptions'

class TemplateExecute {
  option: OptionInterface
  basedir: string
  name: string
  constructor(param: OptionInterface, basedir: string) {
    this.option = this.getOption(param)
    this.basedir = basedir
    this.name = Util.getName(this.option.name)
  }
  getOption(param: OptionInterface) {
    return Util.assign(DefaultOption, param)
  }
  writeService(serviceTemplate: ServiceTemplate) {
    return serviceTemplate.getTemplate().then((res: any) => {
      return Util.writeTemplate(this.basedir + this.option.serviceDir, this.name + '.ts', res)
    })
  }
  writeView(viewTemplate: ViewTemplate) {
    Util.writeTemplate(this.basedir  + this.option.componentDir, this.name + '.vue', viewTemplate.getTemplate())
  }
  execute() {
    let serviceTemplate = new ServiceTemplate(this.option.service,this.option.serviceDir + '/'+ this.name)
    this.writeService(serviceTemplate).then( () => {
      let viewTemplate = new ViewTemplate(this.option.component,serviceTemplate)
      this.writeView(viewTemplate);
    });
  }
}

export default TemplateExecute;