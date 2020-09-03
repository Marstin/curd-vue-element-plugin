"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceTemplate {
    constructor(config, filePath) {
        this.templateFuncStack = this.getTemplateStack(config);
        this.filePath = filePath;
        this.hasOpt('list') || this.templateFuncStack.push({ opt: 'list' });
    }
    getFilePath() {
        return this.filePath;
    }
    async getTemplate() {
        let codeStr = "";
        for (let f of this.templateFuncStack) {
            await Promise.resolve().then(() => __importStar(require('./' + f.opt))).then(module => {
                codeStr += module.getTemplate(f.url);
                f.funcName = module.funcName;
            })
                .catch(err => {
                console.warn(`${f.opt} 未定义`);
            });
        }
        return this.getChunkCodeTemplate(codeStr);
    }
    hasOpt(opt) {
        return this.templateFuncStack.some((s) => s.opt === s.opt);
    }
    getAllFunc() {
        return this.templateFuncStack.map((s) => s.funcName);
    }
    getFunc(opt) {
        let func = this.templateFuncStack.find((s) => s.opt === opt);
        return func && func.funcName;
    }
    getTemplateStack(config) {
        const templateFuncStack = [];
        config.forEach(c => {
            if (c && typeof c === 'string') {
                templateFuncStack.push({ opt: c });
            }
            else {
                let obj = c;
                templateFuncStack.push({ opt: obj.func, url: obj.url });
            }
        });
        return templateFuncStack;
    }
    getChunkCodeTemplate(funcCode) {
        return `import axios from "axios"

const Services = {${funcCode}
}

export default Services`;
    }
}
exports.default = ServiceTemplate;
