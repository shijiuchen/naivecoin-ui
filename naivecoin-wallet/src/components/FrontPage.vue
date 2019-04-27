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

        <div class="col form-group ">
          <label for="receiverAddress">接收者地址</label>
          <input v-model="receiverAddress" class="form-control" type="text" placeholder="04f72a4541275aeb4344a8b04..."
                 id="receiverAddress">
        </div>
        <div class="col form-group ">
          <label for="amount">金额</label>
          <input v-model="receiverAmount" class="form-control" type="number" placeholder="0" id="amount">
        </div>
        <div class="col form-group ">
          <label for="isLOCK">锁定交易</label>
          <input v-model="isLOCK" class="form-control" type="text" placeholder="false" id="islock">
        </div>
      </div>
      <div class="row">
        <div class="col">
          <button v-on:click="sendTransaction" class="btn  btn-lg btn-primary">发送</button>
        </div>
        <!--<div class="col">-->
        <!--<button v-on:click="publishTask" class="btn btn-block btn-lg btn-primary">PublishTask</button>-->
        <!--</div>-->
        <!--<div class="col">-->
        <!--<button v-on:click="generateInteraction" class="btn btn-block btn-lg btn-primary">interaction</button>-->
        <!--</div>-->
      </div>
    </form>

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

    <div v-if="taskName.length !== 0 ">开始执行任务:{{taskName}}</div>

    <div v-if="taskName === 'hadoop' ">您被选为master节点</div>

    <div v-if="taskName.length === 0 "><span>暂无任务执行......</span></div>

    <br>
    <div v-if="taskTime1.length !== 0 && taskTime2.length !== 0 && this.progress===100">执行任务{{taskName}}的执行时间为：<p class="text" v-html="parseInt(taskTime2)-parseInt(taskTime1)"></p>ms</div>
    <div v-if="taskTime1.length === 0 || taskTime2.length === 0 || this.progress!==100"><span>暂无执行时间返回......</span></div>
    <br>
    <div v-if="taskResult.length !== 0 && this.progress===100">执行任务{{taskName}}的执行结果为：<p class="text" v-html="taskResult"></p></div>
    <div v-if="taskResult.length === 0 || this.progress!==100"><span>暂无执行任务结果返回......</span></div>
    <br>

    <div v-if="taskExen.length !== 0 ">该任务执行工作量为:{{taskExen}}cores*s</div>

    <div v-if="taskExenMaster.length !== 0 && taskExenWorker1.length !== 0 && taskExenWorker2.length !== 0">该任务执行工作量为:master:{{taskExenMaster}}cores*s;worker1:{{taskExenWorker1}}cores*s;worker2:{{taskExenWorker2}}cores*s</div>

    <div v-if="taskExenWorker.length !== 0 ">执行任务hadoop，您是worker节点，该任务执行工作量为:{{taskExenWorker}}cores*s</div>

    <div v-if="taskExen.length === 0 &&  taskExenMaster.length === 0 && taskExenWorker1.length === 0 && taskExenWorker2.length === 0 && taskExenWorker.length === 0"><span>暂无任务工作量返回......</span></div>

    <br>
    <br>


    <h5>交易池</h5>
    <div class="" v-for="tx in transactionPool">
      <trans-item :transHash="tx.id" :txIns="tx.txIns" :txOuts="tx.txOuts"></trans-item>
    </div>
    <div v-if="transactionPool.length === 0"><span>交易池为空</span></div>
    <br>

    <!--<h5>交互池</h5>-->
    <!--<div class="" v-for="ix in interactionPool">-->
    <!--<inter-item :interHash="ix.id" :user="ix.user" :appId="ix.appId" :Ixtime="ix.time" :requestApi="ix.requestApi"></inter-item>-->
    <!--</div>-->
    <!--<div v-if="interactionPool.length === 0"><span>交互池为空</span></div>-->
    <!--<br>-->
    <h5>产生区块</h5>
    <div align=""><!--center-->
      <button v-on:click="mineBlock" class="btn  btn-lg btn-primary">点击挖矿</button>
      <!--<progress></progress>-->
    </div>
    <br>
    <br>


    <!--<div class="progressContainer">-->
    <!--<div class="progress" :style="{width:progress+'%'}">-->
    <!--<b>{{progress}}% Completed</b>-->
    <!--</div>-->
    <!--</div>-->




    <br>
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
  import TransItem from './TransItem.vue'
  import InterItem from './InterItem.vue'
  // import progress from './progress-bar.vue'
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
        'isLOCK' : null,
        'progress':0,
        'interval': null,
        'taskName': "",
        'taskTime1': "",
        'taskTime2':"",
        'taskResult':"",
        'taskExen':"",
        'taskExenMaster':"",
        'taskExenWorker1':"",
        'taskExenWorker2':"",
        'taskExenWorker': "",
        'interval1': null,
        'interval2': null,
        'interval3': null,
        'interval4': null,
        'interval5': null,
        'interval6': null,
        'interval7': null,
        'interval8': null,
        'interval9': null,
        'intervaldone': null
      }
    },
    created() {
      this.init();
      // this.play();
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
        this.timeTogetResults();
      },
      getAddress: function () {
        this.$http.get('/api/address')
          .then(resp => {
            this.address = resp.data.address;
          })
      },
      getBalance: function () {
        this.$http.get('/api/balance')
          .then(resp => {
            this.balance = resp.data.balance;
          })
      },
      publishTask: function () {
        this.$http.post('/api/publishTask',
          {'name': 'task1', 'computePower': 10, "price": 10}
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
          {'amount': parseInt(this.receiverAmount), 'address': this.receiverAddress , 'isLOCK': this.isLOCK=="false"?false:true}
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
      },
      gettaskName: function () {
        if(this.taskName.length===0){
          this.$http.get('/api/getTaskName')
            .then((resp) => {
              this.taskName = resp.data;
              console.log("this.taskName="+this.taskName);
              console.log("length="+this.taskName.length);
              if(this.taskName.length!==0){
                this.play();
              }
            });
          //clearInterval(this.interval1);
        }
      },
      getBegintaskTime: function () {
        if(this.taskTime1.length===0){
          this.$http.get('/api/getBeginTaskTime')
            .then((resp) => {
              this.taskTime1 = resp.data;
            });
          //clearInterval(this.interval2);
        }
      },
      getEndtaskTime: function () {
        if(this.taskTime2.length===0){
          this.$http.get('/api/getEndTaskTime')
            .then((resp) => {
              this.taskTime2 = resp.data;
            });
          //clearInterval(this.interval2);
        }
      },
      gettaskExen: function () {
        if(this.taskExen.length===0){
          this.$http.get('/api/getSingleExen')
            .then((resp) => {
              this.taskExen = resp.data;
              console.log("this.exen="+this.taskExen);
            });
          //clearInterval(this.interval1);
          // this.play();
        }
      },
      gettaskExenMaster: function () {
        if(this.taskExenMaster.length===0){
          this.$http.get('/api/getExenMaster')
            .then((resp) => {
              this.taskExenMaster = resp.data;
              console.log("this.exenMaster="+this.taskExenMaster);
            });
          //clearInterval(this.interval1);
          // this.play();
        }
      },
      gettaskExenWorker1: function () {
        if(this.taskExenWorker1.length===0){
          this.$http.get('/api/getExenWorker1')
            .then((resp) => {
              this.taskExenWorker1 = resp.data;
              console.log("this.exenWorker1="+this.taskExenWorker1);
            });
          //clearInterval(this.interval1);
          // this.play();
        }
      },
      gettaskExenWorker2: function () {
        if(this.taskExenWorker2.length===0){
          this.$http.get('/api/getExenWorker2')
            .then((resp) => {
              this.taskExenWorker2 = resp.data;
              console.log("this.exenWorker2="+this.taskExenWorker2);
            });
          //clearInterval(this.interval1);
          // this.play();
        }
      },
      gettaskExenWorker: function () {
        if(this.taskExenWorker.length===0){
          this.$http.get('/api/getExenWorker')
            .then((resp) => {
              this.taskExenWorker = resp.data;
              console.log("this.exenWorker="+this.taskExenWorker);
            });
          //clearInterval(this.interval1);
          // this.play();
        }
      },,
      gettaskResult: function () {
        if(this.taskResult.length===0){
          this.$http.get('/api/getResult_miner')
            .then((resp) => {
              let reg=new RegExp("\n","g");
              this.taskResult = resp.data.replace(reg,"<br>");
              console.log("taskResult="+this.taskResult);
            });
          //clearInterval(this.interval2);
        }
      },
      timeTogetResults(){
        this.interval1=setInterval(this.gettaskName, 500);
        this.interval2=setInterval(this.gettaskExen,5000);
        this.interval3=setInterval(this.gettaskResult,5000);
        this.interval4=setInterval(this.getBegintaskTime,5000);
        this.interval5=setInterval(this.getEndtaskTime,5000);
        this.interval6=setInterval(this.gettaskExenMaster,5000);
        this.interval7=setInterval(this.gettaskExenWorker1,5000);
        this.interval8=setInterval(this.gettaskExenWorker2,5000);
        this.interval9=setInterval(this.gettaskExenWorker,5000);
      },
      setProgress: function () {
        this.progress++;
        if(this.progress === 31){
          clearInterval(this.interval);
          this.play();
        }else if(this.progress === 71){
          clearInterval(this.interval);
          this.play();
        }else if(this.progress === 99) {
          clearInterval(this.interval);
          this.listen();
        }
      },
      getProgress:function(){
        if(this.progress === 99 && this.taskResult.length!==0){
          //this.setProgress();
          this.setProgress();
          clearInterval(this.intervaldone);
          // clearInterval(this.interval1);
          // clearInterval(this.interval2);
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
