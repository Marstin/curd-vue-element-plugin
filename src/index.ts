import TemplateExecute from './lib/TemplateExecute'
import Util from './lib/util'
import { PluginParamInterface, CurdVueElementPluginInterface } from './lib/Interface'
import { DefaultPluginParam } from './lib/DefaultOptions'

class CurdVueElementPlugin implements CurdVueElementPluginInterface {
  PluginParam: PluginParamInterface
  constructor(PluginParam: PluginParamInterface) {
    this.PluginParam = this.getOption(PluginParam)
  }
  apply(compiler: any) {
    compiler.plugin('environment', () => {
      this.execute()
    });
  }
  getOption(param: PluginParamInterface) {
    return Util.assign(DefaultPluginParam, param)
  }
  execute() {
    for (let opt of this.PluginParam.options) {
      let curdObj = new TemplateExecute(opt, this.PluginParam.baseDir)
      curdObj.execute()
    }
  }
}
module.exports = CurdVueElementPlugin;