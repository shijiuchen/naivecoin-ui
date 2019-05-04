<template>
  <div>
    <div class="break-word">
      您的公钥地址: <h5 class="break-word">{{ address }}</h5>
    </div>
    <div class="">
      您的余额: <h5>{{ balance }}</h5>
    </div>
    <br>
    <form>
      <h5>发送货币</h5>
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
        <!--<div class="col form-group ">-->
          <!--<label for="isLOCK">锁定交易</label>-->
          <!--<input v-model="isLOCK" class="form-control" type="text" placeholder="false" id="islock">-->
        <!--</div>-->
      </div>
      <div class="">
        <button v-on:click="sendTransaction" class="btn  btn-lg btn-primary">发送</button>
      </div>
      <br><br>

      <h5>部署任务</h5>
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
          <label for="detail">任务描述</label>
          <input v-model="detail" class="form-control" type="text" placeholder="任务名" id="detail">
        </div>
        <div class="col form-group ">
          <label for="use">任务参数</label>
          <input v-model="use" class="form-control" type="text" placeholder="任务名" id="use">
        </div>
        <div class="col form-group ">
          <label for="dockerAdd">docker地址</label>
          <input v-model="dockerAdd" class="form-control" type="text" placeholder="docker地址" id="dockerAdd">
        </div>
      </div>
      <div class="">
        <button v-on:click="deployTask" class="btn btn-lg btn-primary">部署任务</button>
      </div>
      <br><br>

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
        <tr  class="text-center" v-if="flagAsylo === true ">
          <td> 1 </td>
          <td> computeMatrix </td>
          <td> 计算两个矩阵乘法的计算结果 </td>
          <td> gcr.io/asylo-framework/asylo:latest</td>
          <td> 计算的两个矩阵文件全路径，格式为((1,2;3,4):(1,3;2,9))</td>
        </tr>
        <tr  class="text-center" v-if="flagCaffe === true ">
          <td> 2 </td>
          <td> caffe </td>
          <td> 训练mnist数据集 </td>
          <td> shijiuchen/caffe_mnist:v1</td>
          <td> 制作好镜像的docker地址</td>
        </tr>
        <tr  class="text-center" v-if="flagHadoop === true ">
          <td> 3 </td>
          <td> hadoop </td>
          <td> hadoop wordcount 任务 </td>
          <td>kiwenlau/hadoop:v1</td>
          <td> 需要进行统计的txt文件本地全路径</td>
        </tr>

        </tbody>
      </table>

      <br>

      <h5>发布任务</h5>
      <div class="row">

        <div class="col form-group ">
          <label for="IPaddrun">IP地址</label>
          <input v-model="IPaddrun" class="form-control" type="text" placeholder="任务发布者IP" id="IPaddrun">
        </div>
        <div class="col form-group ">
          <label for="TaskNamerun">任务名</label>
          <input v-model="TaskNamerun" class="form-control" type="text" placeholder="任务名" id="TaskNamerun">
        </div>
        <div class="col form-group ">
          <label for="params">任务执行参数</label>
          <input v-model="params" class="form-control" type="text" placeholder="所需参数" id="params">
        </div>
      </div>

      <div class="row">
        <div class="col form-group ">
          <label for="CPU">预计CPU/%cores</label>
          <input v-model="CPU" class="form-control" type="text" placeholder="CPU" id="CPU">
        </div>
        <div class="col form-group ">
          <label for="MEM">预计MEM/MB</label>
          <input v-model="MEM" class="form-control" type="text" placeholder="MEM" id="MEM">
        </div>
        <div class="col form-group ">
          <label for="Time">预计Time/s</label>
          <input v-model="Time" class="form-control" type="text" placeholder="Time" id="Time">
        </div>
      </div>

      <div class="">
        <button v-on:click="schedulerTask" class="btn btn-lg btn-primary">发布任务</button>
      </div>

        <!--<div class="col">-->
          <!--<button v-on:click="generateInteraction" class="btn btn-block btn-lg btn-primary">interaction</button>-->
        <!--</div>-->

    </form>
    <br><br>

    <h5>任务执行情况记录</h5>
    <br>
    <h6>任务完成进度</h6>
    <br>
    <div class="progressContainer">
      <div class="progress" :style="{width:progress+'%'}">
        <b>{{progress}}% Completed</b>
      </div>
    </div>
    <br>
    <h6>任务过程记录</h6>
    <br>
    <div v-if="preMoney.length !== 0 ">估算执行任务钱数:{{preMoney}}</div>
    <div v-if="preMoney.length === 0 "><span>暂无任务进行花费估算......</span></div>
    <br>
    <div v-if="taskResult.length !== 0 && this.progress===100">执行任务{{TaskNamerun}}的返回结果为：<p class="text" v-html="taskResult"></p></div>
    <div v-if="taskResult.length === 0 || this.progress!==100"><span>暂无任务结果返回......</span></div>
    <br>
    <br>


    <h5>交易池</h5>
    <div class="" v-for="tx in transactionPool">
      <trans-item :transHash="tx.id" :txIns="tx.txIns" :txOuts="tx.txOuts" :txReport="tx.report" :txProof="tx.proof" :txWL="tx.workload"></trans-item>
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
            <span class=""> <em>Copyright &copy; 2019.DLUT All rights reserved.</em></span>
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
        'isLOCK': null,
        'IPaddrun': null,
        'TaskNamerun': null,
        'params': null,
        'CPU': null,
        'MEM': null,
        'Time': null,
        'preMoney': "",
        'taskResult': "",
        'progress':0,
        'interval': null,
        'interval1': null,
        'interval2': null,
        'intervaldone': null,
        'flagAsylo': false,
        'flagCaffe': false,
        'flagHadoop': false,
        'detail': "",
        'use':""
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
        if(this.TaskName === "computeMatrix"){
          this.TaskName="asylo";
        }
        this.$http.post('/appi/deployTask',
          {'address': this.IPadd,'taskName': this.TaskName, "dockerAdd": this.dockerAdd}
        )
          .then(() => {
//            this.init();
          });
        console.log(this.TaskName);
        if(this.TaskName === "asylo" ){
          this.flagAsylo=true;
        }else if(this.TaskName === "caffe"){
          this.flagCaffe=true;
        }else if(this.TaskName === "hadoop"){
          this.flagHadoop=true;
        }
        console.log(this.flagCaffe);
      },
      schedulerTask: function () {
        // console.log(this.name);
        // agent.deployTask(req.body.address, req.body.taskName, req.body.dockerAdd);
        this.progress=0;
        this.preMoney="";
        this.taskResult="";
        if(this.TaskNamerun === "computeMatrix"){
          this.TaskNamerun="asylo";
        }
        this.$http.post('/appi/schedulerTask',
          //req.body.address,req.body.taskName,req.body.params,req.body.reqCPU,req.body.reqMEM,req.body.eltiTime
          {'address': this.IPaddrun, 'taskName': this.TaskNamerun, "params": this.params, "reqCPU": this.CPU, "reqMEM": this.MEM, "eltiTime": this.Time}
        )
          .then(() => {
//            this.init();
          });
        this.timeTogetResults();
        // this.play();
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
      getpreMoney: function () {
        if(this.preMoney.length===0){
          this.$http.get('/api/getMoney')
            .then((resp) => {
              this.preMoney = resp.data;
            });
          //clearInterval(this.interval1);
          this.play();
        }
      },
      getResult: function () {
        if(this.taskResult.length===0){
          this.$http.get('/api/getResult')
            .then((resp) => {
              let reg=new RegExp("\n","g");
              this.taskResult = resp.data.replace(reg,"<br>");
            });
          //clearInterval(this.interval2);
        }
      },
      setProgress: function () {
        this.progress++;
        if(this.progress === 31){
          clearInterval(this.interval);
          this.play();
        }else if(this.progress === 71){
          clearInterval(this.interval);
          this.play();
        }else if(this.progress === 98) {
          clearInterval(this.interval);
          this.listen();
        }
      },
      getProgress:function(){
        if(this.progress === 98 && this.taskResult.length!==0){
          this.setProgress();
          this.setProgress();
          clearInterval(this.intervaldone);
          clearInterval(this.interval1);
          clearInterval(this.interval2);
          this.getTransactionPool();
        }
      },
      play () {
        if(this.progress<=30){
          this.interval=setInterval(this.setProgress, 100);
        }else if(this.progress<=70){
          this.interval=setInterval(this.setProgress, 250);
        }else{
          this.interval=setInterval(this.setProgress, 500);
        }
      },
      timeTogetResults(){
        this.interval1=setInterval(this.getpreMoney, 500);
        this.interval2=setInterval(this.getResult,500);
      },
      listen(){
        this.intervaldone=setInterval(this.getProgress,500);
      }
    }
  }
</script>
<style>
  div.progressContainer{
    height: 30px;
    width: 60%;
    border-radius: 10px;
    background-color: #ddd;
    margin-left: 2%;
  }
  div.progress{
    background-color: #1C8DE0;
    border-radius: 10px;
    height:30px;
    line-height: 20px;
  }
  b{
    color:#fff;
    font-weight: 600;
    font-size: 24px;
    position:absolute;
    left:30%;
  }
</style>
