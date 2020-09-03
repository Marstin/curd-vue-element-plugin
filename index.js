"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const TemplateExecute_1 = tslib_1.__importDefault(require("./lib/TemplateExecute"));
const util_1 = tslib_1.__importDefault(require("./lib/util"));
const DefaultOptions_1 = require("./lib/DefaultOptions");
class CurdVueElementPlugin {
    constructor(PluginParam) {
        this.PluginParam = this.getOption(PluginParam);
    }
    apply(compiler) {
        compiler.plugin('environment', () => {
            this.execute();
        });
    }
    getOption(param) {
        return util_1.default.assign(DefaultOptions_1.DefaultPluginParam, param);
    }
    execute() {
        for (let opt of this.PluginParam.options) {
            let curdObj = new TemplateExecute_1.default(opt, this.PluginParam.baseDir);
            curdObj.execute();
        }
    }
}
module.exports = CurdVueElementPlugin;
