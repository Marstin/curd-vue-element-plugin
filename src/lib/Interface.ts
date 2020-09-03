export interface PluginParamInterface {
  baseDir: string,
  options: Array<OptionInterface>
}

export interface OptionInterface {
  name: string,
  serviceDir?: string,
  componentDir?: string,
  service: Array<string | ServiceOptionsInterface>,
  component: ComponentTemplateInterface,
}

export interface ComponentTemplateInterface {
  primaryKey?: string,
  model: Array<ItemInterface>
}

export interface ItemInterface {
  name: string,
  text: string,
  isSearch: boolean,
  isEdit: boolean
}

export interface ServiceOptionsInterface {
  func: string
  url?: string
}

export interface CurdVueElementPluginInterface {
  apply(compiler: any): any
}

export interface TemplateInterface {
  getTemplate(): any
}