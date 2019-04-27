<template>
  <div class="card">
    <div class="card-header">
      <span>{{ interHash }}</span>
    </div>
    <div class="card-body">
      <div class="row">

        <div class="col-sm-6">
          <div class="break-word txn-input truncate">用户:{{user}} </div>
        </div>

        <div class="col-sm-6">
          <div class="txn-input truncate">
            <div class="row">
              <div class="col">
                应用ID: {{appId}}
              </div>
              <div class="col">
                交互时间: {{ getTime(Ixtime)}}
              </div>
              <div class="col">
                请求API: {{requestApi}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:
      ['interHash', 'user', 'appId', 'Ixtime', 'requestApi'],
    methods: {
      getTime: function (time) {
        return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
      }
    }

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
