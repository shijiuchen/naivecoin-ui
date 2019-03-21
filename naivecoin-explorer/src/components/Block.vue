<template>
  <div v-if="block.hash">

    <h3>Block #{{ block.index }}</h3>
    <table class="table">
      <tbody>
      <tr>
        <th>Hash</th>
        <td>{{ block.hash }}</td>
      </tr>
      <tr>
        <th>Previous hash</th>
        <td>{{ block.previousHash}}</td>
      </tr>
      <tr>
        <th>Timestamp</th>
        <td>{{ block.timestamp}}</td>
      </tr>
      <tr>
        <th>Difficulty</th>
        <td>{{ block.difficulty}}</td>
      </tr>
      <tr>
        <th>Nonce</th>
        <td>{{ block.nonce}}</td>
      </tr>
      <tr>
        <th>Number of transactions</th>
        <td>{{ block.data.length}}</td>
      </tr>

      </tbody>
    </table>
    <h3>Transactions</h3>
    <div class="" v-for="tx in block.data">
      <trans-item :transHash="tx.id" :txIns="tx.txIns" :txOuts="tx.txOuts"></trans-item>
    </div>
  </div>
</template>

<script>
  import TransItem from './TransItem.vue'
  export default {
    name: 'Block',
    data() {
      return {
        block :{}
      }
    },
    created() {
      this.getBlock(this.$route.params.id)
    },
    methods: {
      getBlock: function (hash) {
        this.$http.get('/api/block/' + hash)
          .then(resp => {
            this.block = resp.data;
          })
      },
      trimAddress: function(address) {
        return address.substr(0,12) + '...';
      }
    },
    components: {
      TransItem
    }
  }
</script>

<style scoped>
  .transaction {
    padding: 1em;
    margin-bottom: 1em;
    background-color: gainsboro;
  }

</style>
