
function Table1 (ele) {
  this.ele = ele
  this.config = {}
}

Table1.prototype = {
  changePage: function (page) {
    var getUrl = this.config.getUrl
    var self = this
    $.ajax(getUrl(page), {
      dataType: 'json',
      success: function(data) {
        self.vc.setData(data.dataList)
      }
    })
  },
  init: function (config) {
    var self = this
    this.config = config
    var data = config.data
    var totalCount = config.totalCount
    var getUrl = config.getUrl
    $.ajax(getUrl(1), {
      dataType: 'json',
      success: function(data) {
        self.render({
          tableData: data.dataList,
          totalCount: data.iTotalDisplayRecords
        })
      }
    })
  },
  render: function (data) {
    var self = this
    $('body').append('<style>.mk-table {  width: 100%;  border-collapse: collapse;  border: 1px solid #eee;  text-align: center}.mk-table thead th {  background-color: #fff;  text-align: center;  font-size: 14px;  padding: 20px 0;  border-bottom: 1px solid #ddd;}.mk-table tbody tr {  transition: all 0.2s ease;}.mk-table tbody td {  padding: 20px 10px;}.mk-table tbody tr:nth-child(odd) {  background-color: #f8f8f9;}.mk-table tbody tr:hover {  background-color: #ebf7ff;}</style>')
    $(this.ele).append('<table class="mk-table"><thead><tr><th>申请日期</th><th>物料编号</th><th>物料描述</th><th>品牌</th><th>数量</th><th>单位</th><th>用户名</th><th>终端医院</th><th>供应商名称</th><th>仪器金额</th><th>合作模式</th><th>租赁年限</th><th>产权归属</th><th>任务量</th><th>备注</th><th>修改</th></tr></thead><tbody><tr v-for="item in tableData"><td>{{ item.sQRQ }}</td><td>{{ item.mATERIAL }}</td><td>{{ item.mATERIALTXT }}</td><td>{{ item.pINGP }}</td><td>{{ item.qUANTITY }}</td><td>{{ item.mSEHT }}</td><td>{{ item.lASTNAME }}</td><td>{{ item.zDYYXTX }}</td><td>{{ item.gysmc }}</td><td>{{ item.yqje }}</td><td>租赁</td><td>{{ item.tf }}</td><td>{{ item.cqgs }}</td><td>{{ item.rwl }}</td><td>{{ item.bz2 }}</td><td><i-button size="small" type="primary" v-on:click="edit(item)">修改</i-button></td></tr></tbody></table><div style="text-align: right;margin: 10px;"><Page :total="totalCount" v-on:on-change="changePage" show-total></Page></div><Modal v-model="modal" title="编辑"><div><Row :gutter="8" style="margin-top: 10px"><i-col style="text-align: right; line-height: 30px" span="6">申请日期：</i-col><i-col span="18"><i-input :value="editItem.sQRQ" :disabled="true"></i-input></i-col></Row><Row :gutter="8" style="margin-top: 10px"><i-col style="text-align: right; line-height: 30px" span="6">物料编号：</i-col><i-col span="18"><i-input :value="editItem.mATERIAL" :disabled="true"></i-input></i-col></Row><Row :gutter="8" style="margin-top: 10px"><i-col style="text-align: right; line-height: 30px" span="6">物料描述：</i-col><i-col span="18"><i-input :value="editItem.mATERIALTXT" :disabled="true"></i-input></i-col></Row><Row :gutter="8" style="margin-top: 10px"><i-col style="text-align: right; line-height: 30px" span="6">品牌：</i-col><i-col span="18"><i-input :value="editItem.pINGP" :disabled="true"></i-input></i-col></Row><Row :gutter="8" style="margin-top: 10px"><i-col style="text-align: right; line-height: 30px" span="6">数量：</i-col><i-col span="18"><i-input :value="editItem.qUANTITY" :disabled="true"></i-input></i-col></Row><Row :gutter="8" style="margin-top: 10px"><i-col style="text-align: right; line-height: 30px" span="6">单位：</i-col><i-col span="18"><i-input :value="editItem.mSEHT" :disabled="true"></i-input></i-col></Row><Row :gutter="8" style="margin-top: 10px"><i-col style="text-align: right; line-height: 30px" span="6">用户名：</i-col><i-col span="18"><i-input :value="editItem.lASTNAME" :disabled="true"></i-input></i-col></Row><Row :gutter="8" style="margin-top: 10px"><i-col style="text-align: right; line-height: 30px" span="6">终端医院：</i-col><i-col span="18"><i-input :value="editItem.zDYYXTX" :disabled="true"></i-input></i-col></Row><Row :gutter="8" style="margin-top: 10px"><i-col style="text-align: right; line-height: 30px" span="6">供应商名称：</i-col><i-col span="18"><i-input v-model="editItem.gysmc"></i-input></i-col></Row><Row style="margin-top: 10px" :gutter="8"><i-col style="text-align: right; line-height: 30px" span="6">仪器金额：</i-col><i-col span="18"><i-input v-model="editItem.yqje"></i-input></i-col></Row><Row style="margin-top: 10px" :gutter="8"><i-col style="text-align: right; line-height: 30px" span="6">合作模式：</i-col><i-col span="18"><i-input :disabled="true" value="租赁"></i-input></i-col></Row><Row style="margin-top: 10px" :gutter="8"><i-col style="text-align: right; line-height: 30px" span="6">租赁年限：</i-col><i-col span="18"><i-input v-model="editItem.tf"></i-input></i-col></Row><Row style="margin-top: 10px" :gutter="8"><i-col style="text-align: right; line-height: 30px" span="6">产权归属：</i-col><i-col span="18"><i-input v-model="editItem.cqgs"></i-input></i-col></Row><Row style="margin-top: 10px" :gutter="8"><i-col style="text-align: right; line-height: 30px" span="6">任务量：</i-col><i-col span="18"><i-input v-model="editItem.rwl"></i-input></i-col></Row><Row style="margin-top: 10px" :gutter="8"><i-col style="text-align: right; line-height: 30px" span="6">备注：</i-col><i-col span="18"><i-input v-model="editItem.bz2"></i-input></i-col></Row></div><div slot="footer"><i-button v-on:click="cancelModal">取消</i-button><i-button v-on:click="confirmModal" type="primary">修改</i-button></div></Modal>')
    var component = new Vue({
      el: this.ele,
      data: {
        tableData: data.tableData,
        totalCount: data.totalCount,
        modal: false,
        editItem: {},
        currentPage: 1
      },
      methods: {
        refresh() {
          var comp = this
          $.ajax(self.config.getUrl(this.currentPage), {
            dataType: 'json',
            success: function(data) {
              comp.setData(data.dataList)
            }
          })
        },
        setData: function(sd) {
          Vue.set(this, 'tableData', sd)
        },
        changePage: function(val) {
          this.currentPage = val
          self.changePage(val)
        },
        edit(item) {
          this.modal = true
          Vue.set(this, 'editItem', $.extend({}, item))
        },
        cancelModal() {
          this.modal = false
        },
        confirmModal() {
          var comp = this
          $.ajax(self.config.postUrl(this.editItem), {
            success: function(res) {
              console.log(res)
              comp.modal = false
              comp.refresh()
            }
          })
        }
      }
    })
    this.vc = component
  }

}


