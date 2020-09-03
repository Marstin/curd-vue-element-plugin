import { PluginParamInterface,ComponentTemplateInterface,OptionInterface,ItemInterface } from './Interface'

const DefaultPluginParam: PluginParamInterface = {
  baseDir: './src',
  options: []
}

const DefaultComponentTemplate: ComponentTemplateInterface = {
  primaryKey:'id',
  model:[]
}

const DefaultOption: OptionInterface = {
  name: "default",
  serviceDir: "/services",
  componentDir: "/views",
  service: ['list'],
  component: DefaultComponentTemplate,
}

const DefaultItem: ItemInterface = {
  name: '',
  text: '',
  isSearch: false,
  isEdit: true
}

export { DefaultPluginParam,DefaultComponentTemplate,DefaultItem,DefaultOption };