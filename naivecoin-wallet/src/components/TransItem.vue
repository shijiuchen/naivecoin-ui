<template>
  <div class="card">
    <div class="card-header">
      <span style="color: #6f42c1">{{ transHash }}</span>
    </div>

    <div class="card-body">

      <div class="row">

        <div class="col-sm-6">
          <div v-for="txIn in txIns">
            <div class ='txn-input truncate' v-if="txIn.signature === ''">coinbase</div>
            <div class="break-word txn-input truncate" style="color: #27ad60" v-else>{{ txIn.txOutId }}{{ txIn.txOutIndex }}</div>
          </div>
        </div>

        <div class="col-sm-6">
          <div class="txn-input truncate" v-for="txOut in txOuts">
            <div class="break-word truncate">
              <router-link :to="{ name: 'Address', params: {address: txOut.address}}">
                <span>{{ txOut.address }}</span>
              </router-link>
            </div>
            金额: {{ txOut.amount}}
            <br>
            锁定标志: {{txOut.LOCK}}
            <br>
            <div  class="truncate" v-if="txOut.codeHash === ''">
              锁定代码hash: 此交易无任务锁定
            </div>
            <div  class="truncate" v-else>
              锁定代码hash: {{txOut.codeHash}}
            </div>
          </div>
        </div>

      </div>


      <div class="txn-input truncate" v-if="txReport === ''">
        report: 此交易无算力report
      </div>
      <div class="txn-input truncate" v-else>
        report: {{ txReport }}
      </div>

      <div class="txn-input truncate" v-if="txProof === ''">
        proof: 此交易无算力proof
      </div>
      <div class="txn-input truncate" v-else>
        proof: {{txProof}}
      </div>

      <div class="txn-input truncate" v-if="txWL === 0">
        workload: 此交易无算力workload
      </div>
      <div class="txn-input truncate" v-else>
        workload: {{txWL}}
      </div>


    </div>

  </div>
</template>

<script>
  export default {
    props:
      ['transHash', 'txIns', 'txOuts', 'txReport', 'txProof', 'txWL']
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
