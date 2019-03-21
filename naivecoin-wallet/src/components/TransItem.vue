<template>
  <div class="card">
    <div class="card-header">
      <span>{{ transHash }}</span>
    </div>
    <div class="card-body">

      <div class="row">

        <div class="col-sm-6">
          <div v-for="txIn in txIns">
            <div class ='txn-input truncate' v-if="txIn.signature === ''">coinbase</div>
            <div class="break-word txn-input truncate" v-else>{{ txIn.txOutId }} {{ txIn.txOutIndex }}</div>
          </div>
        </div>

        <div class="col-sm-6">
          <div class="txn-input truncate" v-for="txOut in txOuts">
            <div class="break-word">
              <router-link :to="{ name: 'Address', params: {address: txOut.address}}">
                <span>{{ txOut.address }}</span>
              </router-link>
            </div>
            金额: {{ txOut.amount}}
            <br>
            锁定交易: {{txOut.LOCK}}
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
  export default {
    props:
      ['transHash', 'txIns', 'txOuts']
  }
</script>
<style>
  .txn-input, .txn-output {
    border: 1px solid #ddd;
    padding: 20px 30px;
    margin-bottom: 10px;
    position: relative;
    background: #fff;
    border-radius: 40px;
  }
  .truncate {
    min-width: 5em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
