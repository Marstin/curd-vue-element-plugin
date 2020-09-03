"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const util_1 = tslib_1.__importDefault(require("../util"));
const DefaultOptions_1 = require("../DefaultOptions");
class ViewTemplate {
    constructor(config, serviceTemplate) {
        this.component = util_1.default.assign(DefaultOptions_1.DefaultComponentTemplate, config);
        this._assign();
        this.serviceTemplate = serviceTemplate;
    }
    _assign() {
        for (let key in this.component.model) {
            let obj = Object.assign({}, this.component.model[key]);
            this.component.model[key] = util_1.default.assign(DefaultOptions_1.DefaultItem, obj);
        }
        console.log(this.component);
    }
    hasAdd() {
        return this.serviceTemplate.hasOpt('add');
    }
    hasDel() {
        return this.serviceTemplate.hasOpt('del');
    }
    hasUpdate() {
        return this.serviceTemplate.hasOpt('update');
    }
    getSearchContext() {
        return `<el-header style="height:100px">
    <el-form :inline="true" :model="searchModel" class="search-form-inline" size="big">
      ${this._getSearchContext()}
      <el-form-item class="el-form-search-button-item">
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </el-header>
  <el-divider></el-divider>`;
    }
    _getSearchContext() {
        return this.component.model.filter(item => item.isSearch === true).map(item => `<el-form-item label="${item.text}">
        <el-input v-model="searchModel.${item.name}"></el-input>
      </el-form-item>`).join("\n      ");
    }
    getButtonContext() {
        return `<div style="text-align: left;margin-bottom:20px;">
      ${this.hasAdd() ? `<el-button @click="onAdd">新增</el-button>` : ''}
      ${this.hasUpdate() ? `<el-button :disabled="disabledModel.editDisabled" @click="onEdit">修改</el-button>` : ''}
      ${this.hasDel() ? `<el-button :disabled="disabledModel.delDisabled" @click="onDelete">删除</el-button>` : ''}
    </div>`;
    }
    getColumnsContext() {
        return `<el-table-column type="selection"> </el-table-column>
        ${this._getColumnsContext()}`;
    }
    _getColumnsContext() {
        return this.component.model.map(item => `<el-table-column prop="${item.name}" label="${item.text}"></el-table-column>`).join('\n        ');
    }
    getFormItemModel() {
        let columns = this.component.model.filter(item => item.isEdit === true).map(item => `${item.name}:""`);
        columns.unshift(`${this.component.primaryKey}:""`);
        return columns.join(",\n          ");
    }
    getSearchItemModel() {
        return this.component.model.filter(item => item.isSearch === true).map(item => `${item.name}:""`).join(",\n          ");
    }
    getFormDialogContext() {
        return `<el-dialog
    :title="dialogModel.dialogTitle"
    :visible.sync="dialogModel.dialogVisible"
    width="30%">
    <el-form :model="form" ref="appDataForm" label-width="80px">
      ${this._getFormDialogContext()}
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogModel.dialogVisible=false">关闭</el-button>
      <el-button type="primary" @click="onSave">保存</el-button>
    </span>
  </el-dialog>`;
    }
    _getFormDialogContext() {
        return this.component.model.filter(item => item.isEdit === true).map(item => `<el-form-item label="${item.text}">
        <el-input v-model="form.${item.name}" autocomplete="off"></el-input>
      </el-form-item>`).join("\n    ");
    }
    getServicePath() {
        return "@" + this.serviceTemplate.getFilePath();
    }
    getServiceOptToStr() {
        return this.serviceTemplate.getAllFunc().join(', ');
    }
    getTemplate() {
        return `<template>
  <el-container class="total-container">
    ${this.getSearchContext()}
    <el-main>
      ${this.getButtonContext()}
      <el-table
        ref="mainTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        ${this.getColumnsContext()}
      </el-table>
      <el-pagination
        :current-page="pageModel.pageNo"
        :page-sizes="[10, 20, 50]"
        :page-size="pageModel.pageSize"
        @size-change="pageSizeChanged"
        @current-change="pageNumChanged"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageModel.pageTotal">
      </el-pagination>
    </el-main>
    ${this.getFormDialogContext()}
  </el-container>
</template>
  
<script>
  import Services from '${this.getServicePath()}'
  const { ${this.getServiceOptToStr()} } = Services;
  export default {
    data(){
      return {
        tableData:[],
        searchModel:{
          ${this.getSearchItemModel()}
        },
        disabledModel:{
          editDisabled: true,
          delDisabled: true
        },
        ${this.hasAdd() || this.hasUpdate() ? `form:{
          ${this.getFormItemModel()}
        },` : ''}
        pageModel:{
          pageNo:1,
          pageSize:10,
          pageTotal:1
        },
        dialogModel:{
          dialogTitle:'',
          dialogVisible:false
        }
      }
    },
    mounted(){
      this.refreshTable();
    },
    methods:{
      onSearch(){
        this.refreshTable();
      },
      ${this.hasUpdate() ? `onEdit(){
        this._showDialog("编辑",this.$refs.mainTable.selection[0])
      },` : ''}
      ${this.hasAdd() ? `onAdd(){
        this._showDialog("新增",{})
      },` : ''}
      ${this.hasDel() ? `onDelete(){
        del(this.$refs.mainTable.selection.map(d => d.id).join()) 
        .then((mes) => this.showMessage(mes))
        .then(() => this.refreshTable())
      },` : ''}
      ${this.hasAdd() || this.hasUpdate() ? `onSave(){
        const saveFunc = this.form.id ? update : add;
        saveFunc(this.form)
        .then((mes) => this.showMessage(mes))
        .then(() => this.refreshTable())
      },
       _showDialog(title,data){
        this.form = Object.assign({},data);
        this.dialogModel.dialogTitle = title;
        this.dialogModel.dialogVisible = true;
      },` : ''}
      showMessage(){
        return new Promise((resolve,reject) => {
          resolve(true)
        })
      },
      handleSelectionChange(){
        const selectedLength = this.$refs.mainTable.selection.length;
        this.disabledModel.editDisabled = this.$refs.mainTable.selection.length !== 1;
        this.disabledModel.delDisabled = this.$refs.mainTable.selection.length  === 0;
      },
      pageSizeChanged(size){
        this.pageModel.pageSize = size;
        this.loadTableData()
      },
      pageNumChanged(num){
        this.pageModel.pageNo = num;
        this.loadTableData()
      },
      refreshTable(params){
        return list(params||this._getQueryParams()).then(data => this.setTableDataAndTotalNum(data));
      },
      setTableDataAndTotalNum(data){
        this.pageModel.pageTotal = data.total;
        this.tableData = this.convertDataToTableData(data.list)
      },
      convertDataToTableData (data) {
        return [...data];
      },
      _getQueryParams(){
        return Object.assign({},{...{pageNo:this.pageModel.pageNo,pageSize:this.pageModel.pageSize},...this.searchModel})
      }
    }
  }
</script>

<style>
  .total-container {
    position: absolute;
    left: 10px;
    right: 10px;
    padding: 10px;
  }
  .el-divider {
    width: 98%;
    margin: 0px auto 10px auto;
  }
  .el-header {
    height: 100px;
    align-items: center;
    display: flex;
  }
  .search-form-inline {
    padding: 20px 20px 0 20px;
  }
  .el-form--inline .el-form-item {
    margin-right: 50px;
  }
  .el-form-search-button-item {
    position: absolute;
    right: 20px;
  }
  .el-pagination {
    position: absolute;
    bottom: -30px;
    right: 70px;
  }
</style>`;
    }
}
exports.default = ViewTemplate;
