<template>
  <div>
    <h3>Transaction</h3>

    <table class="table">
      <tbody>
      <tr>
        <th>id:</th>
        <td>{{ transaction.id }}</td>
      </tr>
      <tr>
        <th>report：</th>
        <td><div v-if="transaction.report===''">此区块非算力交易，无report</div><div v-else>{{ transaction.report }}</div></td>
      </tr>
      <tr>
        <th>proof：</th>
        <td><div v-if="transaction.proof===''">此区块非算力交易，无proof</div><div v-else>{{ transaction.proof }}</div></td>
      </tr>
      <tr>
        <th>workload：</th>
        <td><div v-if="transaction.workload===0">此区块非算力交易，无workload</div><div v-else>{{ transaction.workload}}</div></td>
      </tr>
      <tr>
        <th>Total amount:</th>
        <td>{{ totalValue(transaction) }}</td>
      </tr>

      </tbody>
    </table>
    <h5>TxIns</h5>
    <div class="txIn break-word" v-for="txIn in transaction.txIns">
      <div class="row bold" v-if="txIn.signature ===''">Coinbase transaction</div>
      <div class="row">TxOutId: <router-link :to="{ name: 'Transaction', params: {id: txIn.txOutId }}"> <span>{{ txIn.txOutId }}</span></router-link></div>
      <div class="row">TxOutIndex:  {{ txIn.txOutIndex }}</div>
      <div class="row">Signature: {{ txIn.signature }}</div>
    </div>
    <h5>TxOuts</h5>
    <div class="txIn break-word" v-for="txOut in transaction.txOuts">
      <div class="row">Address: <router-link :to="{ name: 'Address', params: {address: txOut.address}}"> <span>{{ txOut.address }}</span></router-link> </div>
      <div class="row">Amount: {{ txOut.amount}}</div>
      <div class="row">LOCK: {{ txOut.LOCK}}</div>
      <div class="row"><div v-if="txOut.codeHash===''">codeHash: 此交易非锁定交易，无codeHash</div><div v-else>codeHash: {{ txOut.amount}}</div></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Transaction',
    data() {
      return {
        transaction :{}
      }
    },
    created() {
      this.getTransaction(this.$route.params.id)
    },
    update() {
      console.log('update')
    },
    methods: {
      getTransaction: function (id) {
          console.log('tsers')
        this.$http.get('/api/transaction/' + id)
          .then(resp => {
            this.transaction = resp.data;
          })
      },
      trimAddress: function(address) {
        return address.substr(0,24) + '...';
      },
      totalValue: function(transaction) {
        return transaction.txOuts[0].amount
      }
    }
  }
</script>

<style scoped>
.bold {
  font-weight: bold;
}

.txIn {
  border: 1px solid #ddd;
  padding: 20px 30px;
  margin-bottom: 10px;
  position: relative;
  background: #fff;
  border-radius: 40px;
}
</style>
