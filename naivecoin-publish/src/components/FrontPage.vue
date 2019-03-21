<template>
  <div>
    <div class="break-word">
      您的公钥地址: <h5 class="break-word">{{ address }}</h5>
    </div>
    <div class="">
      您的余额: <h5>{{ balance }}</h5>
    </div>
    <br>
    <h5>发送货币</h5>
    <form>
      <div class="row">

        <div class="col form-group">
          <label for="receiverAddress">接收者地址</label>
          <input v-model="receiverAddress" class="form-control" type="text" placeholder="04f72a4541275aeb4344a8b04..."
                 id="receiverAddress">
        </div>
        <div class="col form-group">
          <label for="amount">金额</label>
          <input v-model="receiverAmount" class="form-control" type="number" placeholder="0" id="amount">
        </div>
        <div class="col form-group ">
          <label for="isLOCK">锁定交易</label>
          <input v-model="isLOCK" class="form-control" type="text" placeholder="false" id="islock">
        </div>
      </div>
      <div class="">
        <button v-on:click="sendTransaction" class="btn  btn-lg btn-primary">发送</button>
      </div>
      <div class="row">

        <div class="col form-group ">
          <label for="IPadd">IP地址</label>
          <input v-model="IPadd" class="form-control" type="text" placeholder="部署者IP" id="IPadd">
        </div>
        <div class="col form-group ">
          <label for="TaskName">任务名</label>
          <input v-model="TaskName" class="form-control" type="text" placeholder="任务名" id="TaskName">
        </div>
        <div class="col form-group ">
          <label for="dockerAdd">docker地址</label>
          <input v-model="dockerAdd" class="form-control" type="text" placeholder="docker地址" id="dockerAdd">
        </div>
      </div>

      <div class="">
        <button v-on:click="deployTask" class="btn btn-lg btn-primary">部署应用</button>
      </div>
        <!--<div class="col">-->
          <!--<button v-on:click="generateInteraction" class="btn btn-block btn-lg btn-primary">interaction</button>-->
        <!--</div>-->

    </form>

    <h5>可执行计算任务列表</h5>
    <table class="table table-hover table-striped">
      <thead>
      <tr class="text-center">
        <th>任务序号</th>
        <th>任务名</th>
        <th>任务描述</th>
        <th>基础镜像地址</th>
        <th>需要参数描述</th>
      </tr>
      </thead>

      <tbody>
      <tr  class="text-center">
        <td> 1 </td>
        <td> computeMatrix </td>
        <td> 计算两个矩阵乘法的计算结果 </td>
        <td> www.computeMatrix.com</td>
        <td> 计算的两个矩阵</td>
      </tr>
      <tr  class="text-center">
        <td> 2 </td>
        <td> caffe </td>
        <td> 训练mnist数据集 </td>
        <td> www.caffe.com</td>
        <td> 制作好的docker地址</td>
      </tr>
      <tr  class="text-center">
        <td> 3 </td>
        <td> hadoop </td>
        <td> hadoop wordcount 任务 </td>
        <td>www.hadoop.com</td>
        <td> 需要进行统计的txt文件</td>
      </tr>
      </tbody>
    </table>

    <br>

    <h5>交易池</h5>
    <div class="" v-for="tx in transactionPool">
      <trans-item :transHash="tx.id" :txIns="tx.txIns" :txOuts="tx.txOuts"></trans-item>
    </div>
    <div v-if="transactionPool.length === 0"><span>交易池为空......</span></div>
    <br>

    <!--<h5>交互池</h5>-->
    <!--<div class="" v-for="ix in interactionPool">-->
      <!--<inter-item :interHash="ix.id" :user="ix.user" :appId="ix.appId" :Ixtime="ix.time" :requestApi="ix.requestApi"></inter-item>-->
    <!--</div>-->
    <!--<div v-if="interactionPool.length === 0"><span>交互池为空......</span></div>-->
    <!--<br>-->
    <!--<h5>Mine block</h5>-->
    <!--<div align="">&lt;!&ndash;center&ndash;&gt;-->
    <!--<button v-on:click="mineBlock" class="btn  btn-lg btn-primary">Click to mine block</button>-->
    <!--</div>-->
    <footer id="footer" style="margin-top: 10%">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <span class=""> <em>Copyright &copy; 2018.SJUT All rights reserved.</em></span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import Vue from 'vue'
  import TransItem from './TransItem.vue'
  import Router from 'vue-router'
  import InterItem from './InterItem.vue'
  Vue.use(Router);
  export default {
    name: 'FrontPage',
    data() {
      return {
        'address': null,
        'balance': null,
        'transactionPool': [],
        'interactionPool': [],
        'receiverAddress': null,
        'receiverAmount': null,
        'IPadd': null,
        'TaskName': null,
        'dockerAdd':null,
        'tasks': [],
        'isLOCK': null
      }
    },
    created() {
      this.init();
    },
    components: {
      TransItem,
      InterItem
    },
    methods: {
      init: function () {
        this.getAddress();
        this.getBalance();
        this.getTransactionPool();
        this.getInteractionPool();
        this.getAlltasks();
      },
      getAddress: function () {
        this.$http.get('/api/address')
          .then(resp => {
            this.address = resp.data.address;
          })
      },
      getAlltasks: function(){
        this.$http.get('/api/getAlltasks')
          .then(resp => {
            this.tasks = resp.data;
          })
      },
      goToApp: function(){
        window.location.href = "http://localhost:9010/login.html";
      },
      getBalance: function () {
        this.$http.get('/api/balance')
          .then(resp => {
            this.balance = resp.data.balance;
          })
      },
      deployTask: function () {
        // console.log(this.name);
        // agent.deployTask(req.body.address, req.body.taskName, req.body.dockerAdd);
        this.$http.post('/api/deployTask',
          {'address': this.IPadd, 'taskName': this.TaskName, "dockerAdd": this.dockerAdd}
        )
          .then(() => {
//            this.init();
          })
      },
      generateInteraction: function () {
        this.$http.post('/api/generateInteraction/task1',
          {'name': 'task1', "computePower": 10, "price": 10}
        )
          .then(() => {
//            this.init();
          })
      },
      sendTransaction: function () {
        this.$http.post('/api/sendTransaction',
          {'amount': parseInt(this.receiverAmount), 'address': this.receiverAddress, 'isLOCK': this.isLOCK=="false"?false:true}
        )
          .then(() => {
            this.receiverAmount = null;
            this.receiverAddress = null;
            this.init();
          })
      },
      mineBlock: function () {
        this.$http.post('/api/mineBlock')
          .then(() => {
            this.init();
          })
      },
      getTransactionPool: function () {
        this.$http.get('/api/transactionPool')
          .then((resp) => {
            this.transactionPool = resp.data;
          });
      },
      getInteractionPool: function () {
        this.$http.get('/api/interactionPool')
          .then((resp) => {
            this.interactionPool = resp.data;
          });
      }

    }
  }
</script>
