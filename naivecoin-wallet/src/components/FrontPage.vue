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
    </div>

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
        'isLOCK' : null
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
      }

    }
  }
</script>
