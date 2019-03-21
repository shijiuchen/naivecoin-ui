<template>
  <div>
    <div class="row" style="height:100px;background-color: #73c6b6">
      <div class="container"><h3>
        <img src="/static/images/brand.png" width="64" height="64">
        <a class="header-link" href="/">
        BB-RAP区块浏览器</a>
        </h3>
      </div>

    </div>
    <h4><span style="margin-top: 5em">区块</span></h4>
    <table class="table table-hover table-striped">
      <thead>
      <tr class="text-center">
        <th>区块高度</th>
        <th>哈希值</th>
        <th>交易数量</th>
        <th>时间戳</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="block in sortBlocks(blocks)" class="text-center">
        <td>{{ block.index }}</td>
        <td><router-link :to="{ name: 'Block', params: { id: block.hash }}">{{ block.hash }}</router-link></td>
        <td>{{ block.data.length }}</td>
        <td width="150px">{{ block.timestamp}}</td>
      </tr>
      </tbody>
    </table>
    <h4 style="margin-top: 4em"><span>最新交易</span></h4>
    <table class="table table-hover table-striped" >
      <thead>
      <tr class="text-center">
        <th>交易序号</th>
        <th>交易ID</th>
        <th>交易额</th>
        <th>交易时间</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(tx,index) in transactions" class="text-center">
        <td>{{index+1}}</td>
        <td class="break-word"><router-link :to="{ name: 'Transaction', params: { id: tx.id }}">{{ tx.id }}</router-link></td>
        <td>{{totalValue(tx)}}</td>
        <td width="150px">1 minutes ago</td>
      </tr>
      </tbody>
    </table>
    <br>
    <h4><span style="margin-top: 5em">最新交互</span></h4>
    <table class="table table-hover table-striped">
      <thead>
      <tr class="text-center">
        <th>交互序号</th>
        <th>交互ID</th>
        <th>AppID</th>
        <th>交互时间</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(ix,index) in interactions" class="text-center">
        <td>{{index+1}}</td>
        <td>{{ ix.id}}</td>
        <td>{{ix.appId}}</td>
        <td width="150px">{{ getTime(ix.time)}}</td>
      </tr>
      </tbody>
    </table>
    <br>


    </div>
</template>

<script>
  import {ServerTable, ClientTable, Event} from 'vue-tables-2';
  import Vue from 'vue';
  Vue.use(ClientTable, {}, false, 'bootstrap4', 'footerPagination');
  export default {
    name: 'FrontPage',
    data() {
      return {
        blocks: [],
//        columns: ['id', 'name', 'age'],
        transactions: [],
        interactions: []
      }
    },
    created() {
      this.getBlocks();
      this.getTrans();
      this.getInters();
    },
    methods: {
      getBlocks: function () {
        this.$http.get('/api/blocks')
          .then((resp) => {
            this.blocks = resp.data;
          })
      },
      getTrans: function (){
        this.$http.get('/api/transactionPool')
          .then((resp) => {
            this.transactions = resp.data;
          })
      },
      getInters: function (){
        this.$http.get('/api/interactionPool')
          .then((resp) => {
            this.interactions = resp.data;
            console.log(resp.data);
          })
      },
      sortBlocks : function(blocks) {
        return _(blocks)
          .sortBy('index')
          .reverse()
          .value();
      },
      totalValue: function(transaction) {
        return _(transaction.txOuts)
          .map(txOut => txOut.amount)
          .sum()
      },
      getTime: function(time){
        return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
      }
    }
  }
</script>


<style scoped>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .tdv{
    vertical-align: middle;
    text-align: center;
  }
</style>
