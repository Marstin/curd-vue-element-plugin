"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultOption = exports.DefaultItem = exports.DefaultComponentTemplate = exports.DefaultPluginParam = void 0;
const DefaultPluginParam = {
    baseDir: './src',
    options: []
};
exports.DefaultPluginParam = DefaultPluginParam;
const DefaultComponentTemplate = {
    primaryKey: 'id',
    model: []
};
exports.DefaultComponentTemplate = DefaultComponentTemplate;
const DefaultOption = {
    name: "default",
    serviceDir: "/services",
    componentDir: "/views",
    service: ['list'],
    component: DefaultComponentTemplate,
};
exports.DefaultOption = DefaultOption;
const DefaultItem = {
    name: '',
    text: '',
    isSearch: false,
    isEdit: true
};
exports.DefaultItem = DefaultItem;
