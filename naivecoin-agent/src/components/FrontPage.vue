<template>
  <div>
    <h5>节点资源信息统计列表</h5>
    <br>
    <table class="table table-hover table-striped">
      <thead>
      <tr class="text-center">
        <th>序号</th>
        <th>IP地址</th>
        <th>总任务执行数量</th>
        <th>CPU(cores)</th>
        <th>Memory(GB)</th>
        <th>更新时间</th>
      </tr>
      </thead>

      <tbody>
      <tr  class="text-center">
           <!--v-if="flagAsylo === true ">-->
        <td> node1 </td>
        <td> 192.168.1.56 </td>
        <td> 8 </td>
        <td> 10.82 </td>
        <td> 166.7</td>
        <td> 31 seconds ago </td>
      </tr>
      <tr  class="text-center">
        <td> node2 </td>
        <td> 192.168.1.119 </td>
        <td> 8 </td>
        <td> 14.80 </td>
        <td> 200.0 </td>
        <td> 29 seconds ago </td>
      </tr>
      <tr  class="text-center">
        <td> node3 </td>
        <td> 192.168.1.121 </td>
        <td> 6 </td>
        <td> 5.66 </td>
        <td> 122.1 </td>
        <td> 25 seconds ago </td>
      </tr>

      </tbody>
    </table>
<br>
    <h5>节点资源信息统计图</h5>
    <br>
    <div class="div-inline"  id="myChart3" :style="{width: '540px', height: '550px'}"></div>
    <div class="div-inline"  id="myChart4" :style="{width: '560px', height: '550px'}"></div>
    <div class="div-inline"  id="myChart5" :style="{width: '540px', height: '550px'}"></div>
    <div class="div-inline"  id="myChart6" :style="{width: '560px', height: '550px'}"></div>
    <div class="div-inline"  id="myChart7" :style="{width: '540px', height: '550px'}"></div>
    <div class="div-inline"  id="myChart8" :style="{width: '560px', height: '550px'}"></div>
<br>
    <h5>最近调度任务列表</h5>
    <table class="table table-hover table-striped">
      <thead>
      <tr class="text-center">
        <th>序号</th>
        <th>ID</th>
        <th>任务描述</th>
        <th>发布节点</th>
        <th>请求CPU</th>
        <th>请求MEM</th>
        <th>请求时间</th>
        <th>预估价格</th>
        <th>调度节点</th>
        <th>请求时间</th>
      </tr>
      </thead>

      <tbody>
      <!--<tr v-for="(task,index) in tasks" class="text-center">-->
      <tr class="text-center">
        <td>1</td>
        <td>0x7265...</td>
        <td>hadoop</td>
        <td>node2</td>
        <td>9cores</td>
        <td>3000MB</td>
        <td>100s</td>
        <td>139</td>
        <td>node1/2/3</td>
        <td>3 min ago</td>
      </tr>
      <tr class="text-center">
        <td>2</td>
        <td>0x7983...</td>
        <td>Mnist</td>
        <td>node2</td>
        <td>2cores</td>
        <td>50MB</td>
        <td>300s</td>
        <td>31</td>
        <td>node3</td>
        <td>5 min ago</td>
      </tr>
      <tr class="text-center">
        <td>3</td>
        <td>0x4086...</td>
        <td>Matrix</td>
        <td>node2</td>
        <td>8cores</td>
        <td>200MB</td>
        <td>20s</td>
        <td>32</td>
        <td>node1</td>
        <td>7 min ago</td>
      </tr>
      </tbody>
    </table>
    <br>
    <h5>任务调度示意图</h5>
    <br>
    <div class="div-inline" id="myChart2" :style="{width: '550px', height: '550px'}"></div>
    <div class="div-inline" id="myChart9" :style="{width: '550px', height: '550px'}"></div>
    <div id="myChart10" :style="{width: '700px', height: '700px'}"></div>

    <br>
    <!--<h5>正在执行任务列表</h5>-->
    <!--<table class="table table-hover table-striped">-->
      <!--<thead>-->
      <!--<tr class="text-center">-->
        <!--<th>应用序号</th>-->
        <!--<th>应用ID</th>-->
        <!--<th>需求算力</th>-->
        <!--<th>价格</th>-->
        <!--<th>操作</th>-->
      <!--</tr>-->
      <!--</thead>-->

      <!--<tbody>-->
      <!--&lt;!&ndash;<tr v-for="(task,index) in tasks" class="text-center">&ndash;&gt;-->
      <!--<tr class="text-center">-->
        <!--<td>1</td>-->
        <!--<td>0x</td>-->
        <!--<td>100</td>-->
        <!--<td width="150px">150</td>-->
        <!--<td>-->
          <!--<button v-on:click="" class="btn btn-lg btn-primary">终止应用</button>-->
          <!--<button v-on:click="goToApp" class="btn btn-lg btn-primary">我的应用</button>-->
        <!--</td>-->
      <!--</tr>-->
      <!--</tbody>-->
    <!--</table>-->

    <!--<h5>最近完成任务列表</h5>-->
    <!--<table class="table table-hover table-striped">-->
      <!--<thead>-->
      <!--<tr class="text-center">-->
        <!--<th>应用序号</th>-->
        <!--<th>应用ID</th>-->
        <!--<th>需求算力</th>-->
        <!--<th>价格</th>-->
        <!--<th>操作</th>-->
      <!--</tr>-->
      <!--</thead>-->

      <!--<tbody>-->
      <!--&lt;!&ndash;<tr v-for="(task,index) in tasks" class="text-center">&ndash;&gt;-->
      <!--<tr class="text-center">-->
        <!--<td>1</td>-->
        <!--<td>0x</td>-->
        <!--<td>100</td>-->
        <!--<td width="150px">150</td>-->
        <!--<td>-->
          <!--<button v-on:click="" class="btn btn-lg btn-primary">终止应用</button>-->
          <!--<button v-on:click="goToApp" class="btn btn-lg btn-primary">我的应用</button>-->
        <!--</td>-->
      <!--</tr>-->
      <!--</tbody>-->
    <!--</table>-->


    <!--<div id="myChart" :style="{width: '300px', height: '300px'}"></div>-->
    <!--<div id="myChart1" :style="{width: '300px', height: '300px'}"></div>-->


    <!--<div class="div-inline">第一个div盒子</div>-->
    <!--<div class="div-inline">第二个盒子</div>-->
    <!--<div class="div-inline">第三个盒子</div>-->

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
  import Schart from 'vue-schart';

  // import progress from './progress-bar.vue'
  export default {
    name: 'FrontPage',
    data() {
      return {
        canvasId: 'myCanvas',
        type: 'bar',
        width: 500,
        height: 400,
        data: [
          {name: '2014', value: 1342},
          {name: '2015', value: 2123},
          {name: '2016', value: 1654},
          {name: '2017', value: 1795},
        ],
        options: {
          padding: 50,                   // canvas 内边距
          bgColor: '#FFFFFF',            // 默认背景颜色
          title: 'vue-schart互动演示案例',// 图表标题
          titleColor: '#000000',         // 图表标题颜色
          titlePosition: 'top',      // 图表标题位置: top / bottom
          yEqual: 5,                     // y轴分成5等分
          fillColor: '#1E9FFF',          // 默认填充颜色
          contentColor: '#eeeeee',       // 内容横线颜色
          axisColor: '#666666',          // 坐标轴颜色

        }
      }
    },
    created() {
      this.init();
      // this.play();
    },
    components: {
      Schart
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      init: function () {

      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        // let myChart = this.$echarts.init(document.getElementById('myChart'));
        // let myChart1 = this.$echarts.init(document.getElementById('myChart1'));
        let myChart2 = this.$echarts.init(document.getElementById('myChart2'));
        let myChart3=  this.$echarts.init(document.getElementById('myChart3'));
        let myChart4=  this.$echarts.init(document.getElementById('myChart4'));
        let myChart5=  this.$echarts.init(document.getElementById('myChart5'));
        let myChart6=  this.$echarts.init(document.getElementById('myChart6'));
        let myChart7=  this.$echarts.init(document.getElementById('myChart7'));
        let myChart8=  this.$echarts.init(document.getElementById('myChart8'));
        let myChart9=  this.$echarts.init(document.getElementById('myChart9'));
        let myChart10=  this.$echarts.init(document.getElementById('myChart10'));
        // 绘制图表
        // myChart.setOption({
        //   xAxis: {
        //     type: 'category',
        //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        //   },
        //   yAxis: {
        //     type: 'value'
        //   },
        //   series: [{
        //     data: [120, 200, 150, 80, 70, 110, 130],
        //     type: 'bar'
        //   }]
        // });
        // myChart1.setOption({
        //   xAxis: {
        //     type: 'category',
        //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        //   },
        //   yAxis: {
        //     type: 'value'
        //   },
        //   series: [{
        //     data: [820, 932, 901, 934, 1290, 1330, 1320],
        //     type: 'line'
        //   }]
        // });
        myChart2.setOption({
          title: {
            text: '0x7265... 调度示意图'
          },
          tooltip: {},
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series : [
            {
              type: 'graph',
              layout: 'none',
              symbolSize: 50,
              roam: true,
              label: {
                normal: {
                  show: true
                }
              },
              edgeSymbol: ['circle', 'arrow'],
              edgeSymbolSize: [4, 10],
              edgeLabel: {
                normal: {
                  textStyle: {
                    fontSize: 20
                  }
                }
              },
              data: [{
                name: 'Agent',
                x: 300,
                y: 300
              }, {
                name: 'node1',
                x: 800,
                y: 300
              }, {
                name: 'node2',
                x: 550,
                y: 100
              }, {
                name: 'node3',
                x: 550,
                y: 500
              }],
              links: [ {
                source: 'Agent',
                target: 'node1',
                value: "task+master",
                label: {
                  normal: {
                    formatter: "{c}",
                    show: true
                  }
                }
              }, {
                source: 'Agent',
                target: 'node2',
                value: "slave1",
                label: {
                  normal: {
                    formatter: "{c}",
                    show: true
                  }
                }
              }, {
                source: 'Agent',
                target: 'node3',
                value: "slave2",
                label: {
                  normal: {
                    formatter: "{c}",
                    show: true
                  }
                }
              }, {
                source: 'node1',
                target: 'node2',
                value: "map",
                label: {
                  normal: {
                    formatter: "{c}",
                    show: true
                  }
                },
                lineStyle: {
                  normal: { curveness: 0.2 }
                }
              }, {
                source: 'node1',
                target: 'node3',
                value: "map",
                label: {
                  normal: {
                    formatter: "{c}",
                    show: true
                  }
                },
                lineStyle: {
                  normal: { curveness: 0.2 }
                }
              }, {
                source: 'node3',
                target: 'node1',
                value: "reduce",
                label: {
                  normal: {
                    formatter: "{c}",
                    show: true
                  }
                },
                lineStyle: {
                  normal: { curveness: 0.2 }
                }
              }, {
                source: 'node2',
                target: 'node1',
                value: "reduce",
                label: {
                  normal: {
                    formatter: "{c}",
                    show: true
                  }
                },
                lineStyle: {
                  normal: { curveness: 0.2 }
                }
              }],
              lineStyle: {
                normal: {
                  opacity: 0.9,
                  width: 2,
                  curveness: 0
                }
              }
            }
          ]
        });
        myChart9.setOption({
          title: {
            text: '0x7983... 调度示意图'
          },
          tooltip: {},
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series : [
            {
              type: 'graph',
              layout: 'none',
              symbolSize: 50,
              roam: true,
              label: {
                normal: {
                  show: true
                }
              },
              edgeSymbol: ['circle', 'arrow'],
              edgeSymbolSize: [4, 10],
              edgeLabel: {
                normal: {
                  textStyle: {
                    fontSize: 10
                  }
                }
              },
              data: [{
                name: 'node3',
                x: 300,
                y: 300
              }, {
                name: 'node1',
                x: 800,
                y: 300
              }, {
                name: 'chosen',
                x: 550,
                y: 100
              }, {
                name: 'Agent',
                x: 550,
                y: 500
              }],
              links: [ {
                source: 'Agent',
                target: 'node1',
                value: "CPU: 4.61 > 2 MEM: 114.1GB > 50MB",
                label: {
                  normal: {
                    formatter: "{c}",
                    show: true
                  }
                }
              }, {
                source: 'Agent',
                target: 'chosen',
                value: "choose\nnode3",
                label: {
                  normal: {
                    formatter: "{c}",
                    show: true
                  }
                }
              }, {
                source: 'Agent',
                target: 'node3',
                value: "CPU: 10.69 > 2 MEM: 166.7GB > 50MB",
                label: {
                  normal: {
                    formatter: "{c}",
                    show: true
                  }
                }
              }, {
                source: 'node1',
                target: 'node3',
                value: "compare CPU: node3 CPU > node1 CPU",
                label: {
                  normal: {
                    formatter: "{c}",
                    show: true
                  }
                },
                lineStyle: {
                  normal: { curveness: 0.2 }
                }
              }, {
                source: 'node3',
                target: 'node1',
                value: "compare MEM: node3 MEM > node1 MEM",
                label: {
                  normal: {
                    formatter: "{c}",
                    show: true
                  }
                },
                lineStyle: {
                  normal: { curveness: 0.2 }
                }
              }],
              lineStyle: {
                normal: {
                  opacity: 0.9,
                  width: 2,
                  curveness: 0
                }
              }
            }
          ]
        });
        myChart10.setOption({
          title: {
            text: '0x4086... 调度示意图'
          },
          tooltip: {},
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series : [
            {
              type: 'graph',
              layout: 'none',
              symbolSize: 50,
              roam: true,
              label: {
                normal: {
                  show: true
                }
              },
              edgeSymbol: ['circle', 'arrow'],
              edgeSymbolSize: [4, 10],
              edgeLabel: {
                normal: {
                  textStyle: {
                    fontSize: 10
                  }
                }
              },
              data: [{
                name: 'Agent',
                x: 300,
                y: 300
              }, {
                name: 'chosen',
                x: 800,
                y: 300
              }, {
                name: 'node1',
                x: 550,
                y: 100
              }, {
                name: 'node3',
                x: 550,
                y: 500
              }],
              links: [ {
                source: 'Agent',
                target: 'node1',
                value: "CPU: 12.99 > 8 MEM: 166.7GB > 200MB",
                label: {
                  normal: {
                    formatter: "{c}",
                    show: true
                  }
                }
              }, {
                source: 'Agent',
                target: 'chosen',
                value: "abs(CPU1/MEM1-reqCPU/reqMEM) < abs(CPU3/MEM3-reqCPU/reqMEM)\nchoose node1",
                label: {
                  normal: {
                    formatter: "{c}",
                    show: true
                  }
                }
              }, {
                source: 'Agent',
                target: 'node3',
                value: "CPU: 10.28 > 8 MEM: 177.1GB > 200MB",
                label: {
                  normal: {
                    formatter: "{c}",
                    show: true
                  }
                }
              }, {
                source: 'node1',
                target: 'node3',
                value: "compare CPU: node3 CPU < node1 CPU",
                label: {
                  normal: {
                    formatter: "{c}",
                    show: true
                  }
                },
                lineStyle: {
                  normal: { curveness: 0.2 }
                }
              }, {
                source: 'node3',
                target: 'node1',
                value: "compare MEM: node3 MEM > node1 MEM",
                label: {
                  normal: {
                    formatter: "{c}",
                    show: true
                  }
                },
                lineStyle: {
                  normal: { curveness: 0.2 }
                }
              }],
              lineStyle: {
                normal: {
                  opacity: 0.9,
                  width: 2,
                  curveness: 0
                }
              }
            }
          ]
        });
        myChart3.setOption({
          title : {
            text: 'node1执行任务统计',
            x:'center',
            textStyle: {
              color: '#CC0099'
            }
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['matrix','Caffe','Hadoop master','Hadoop slave']
          },
          series : [
            {
              name: '任务来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:3, name:'matrix'},
                {value:2, name:'Caffe'},
                {value:1, name:'Hadoop master'},
                {value:2, name:'Hadoop slave'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        // app.title = '多 Y 轴示例';
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        var CPUNode1 = [4.92, 4.61, 10.20, 11.45, 13.27, 11.06, 15.89, 15.90, 14.80, 13.20, 10.82, 10.12];
        var MEMNode1 =  [115.1, 114.1, 180.9, 200.6, 202, 183.4, 210.2, 232.5, 200, 172.3, 166.7, 159];
        var rateNode1 = [];
        for(let i=0;i<CPUNode1.length;i++){
          rateNode1.push((CPUNode1[i]/20 + MEMNode1[i]/256)/2*100);
        }
        myChart4.setOption({
          color: colors,
          title : {
            text: 'node1资源闲置变化',
            x:'left',
            textStyle: {
                  color: '#CC0099'
                }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '20%'
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data:['CPU','MEM','资源闲置率']
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              data: ['5.5min','5min','4.5min','4min','3.5min','3min','2.5min','2min','1.5min','1min','0.5min','0min']
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'CPU',
              min: 0,
              max: 20,
              position: 'right',
              axisLine: {
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value} cores'
              }
            },
            {
              type: 'value',
              name: 'MEM',
              min: 0,
              max: 256,
              position: 'right',
              offset: 60,
              axisLine: {
                lineStyle: {
                  color: colors[1]
                }
              },
              axisLabel: {
                formatter: '{value} GB'
              }
            },
            {
              type: 'value',
              name: '资源闲置率',
              min: 0,
              max: 100,
              position: 'left',
              axisLine: {
                lineStyle: {
                  color: colors[2]
                }
              },
              axisLabel: {
                formatter: '{value} %'
              }
            }
          ],
          series: [
            {
              name:'CPU',
              type:'bar',
              data:CPUNode1
            },
            {
              name:'MEM',
              type:'bar',
              yAxisIndex: 1,
              data:MEMNode1
            },
            {
              name:'资源闲置率',
              type:'line',
              yAxisIndex: 2,
              data:rateNode1
            }
          ]
        });
        myChart5.setOption({
          title : {
            text: 'node2执行任务统计',
            x:'center',
            textStyle: {
              color: '#CC0099'
            }
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['matrix','Caffe','Hadoop master','Hadoop slave']
          },
          series : [
            {
              name: '任务来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:4, name:'matrix'},
                {value:1, name:'Caffe'},
                {value:1, name:'Hadoop master'},
                {value:2, name:'Hadoop slave'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        // app.title = '多 Y 轴示例';
        var colorss = ['#5793f3', '#d14a61', '#675bba'];
        var CPUNode2 = [11.10, 10.50, 5.06, 4.10, 10.89, 10.99, 12.06, 13.27, 16.0, 16.30, 14.80, 13.20];
        var MEMNode2 =  [199.6, 182.9, 117.1, 111.1, 163, 168.7, 189.4, 202, 212.2, 239.5, 200, 172.3];
        var rateNode2 = [];
        for(let i=0;i<CPUNode2.length;i++){
          rateNode2.push((CPUNode2[i]/20 + MEMNode2[i]/256)/2*100);
        }
        myChart6.setOption({
          color: colorss,
          title : {
            text: 'node2资源闲置变化',
            x:'left',
            textStyle: {
              color: '#CC0099'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '20%'
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data:['CPU','MEM','资源闲置率']
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              data: ['5.5min','5min','4.5min','4min','3.5min','3min','2.5min','2min','1.5min','1min','0.5min','0min']
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'CPU',
              min: 0,
              max: 20,
              position: 'right',
              axisLine: {
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value} cores'
              }
            },
            {
              type: 'value',
              name: 'MEM',
              min: 0,
              max: 256,
              position: 'right',
              offset: 60,
              axisLine: {
                lineStyle: {
                  color: colors[1]
                }
              },
              axisLabel: {
                formatter: '{value} GB'
              }
            },
            {
              type: 'value',
              name: '资源闲置率',
              min: 0,
              max: 100,
              position: 'left',
              axisLine: {
                lineStyle: {
                  color: colors[2]
                }
              },
              axisLabel: {
                formatter: '{value} %'
              }
            }
          ],
          series: [
            {
              name:'CPU',
              type:'bar',
              data:CPUNode2
            },
            {
              name:'MEM',
              type:'bar',
              yAxisIndex: 1,
              data:MEMNode2
            },
            {
              name:'资源闲置率',
              type:'line',
              yAxisIndex: 2,
              data:rateNode2
            }
          ]
        });
        myChart7.setOption({
          title : {
            text: 'node3执行任务统计',
            x:'center',
            textStyle: {
              color: '#CC0099'
            }
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['matrix','Caffe','Hadoop master','Hadoop slave']
          },
          series : [
            {
              name: '任务来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:1, name:'matrix'},
                {value:2, name:'Caffe'},
                {value:1, name:'Hadoop master'},
                {value:2, name:'Hadoop slave'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        // app.title = '多 Y 轴示例';
        var colorsss = ['#5793f3', '#d14a61', '#675bba'];
        var CPUNode3 = [10.49, 10.69, 11.89, 13.77, 15.79, 16.73, 14.55, 13.90, 11.10, 10.22, 5.66, 4.10];
        var MEMNode3 =  [161, 166.7, 186.2, 205.9, 210.2, 242.5, 200, 178.3, 199.6, 180.9, 122.1, 111.1];
        var rateNode3 = [];
        for(let i=0;i<CPUNode3.length;i++){
          rateNode3.push((CPUNode3[i]/20 + MEMNode3[i]/256)/2*100);
        }
        myChart8.setOption({
          color: colorsss,
          title : {
            text: 'node3资源闲置变化',
            x:'left',
            textStyle: {
              color: '#CC0099'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '20%'
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data:['CPU','MEM','资源闲置率']
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              data: ['5.5min','5min','4.5min','4min','3.5min','3min','2.5min','2min','1.5min','1min','0.5min','0min']
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'CPU',
              min: 0,
              max: 20,
              position: 'right',
              axisLine: {
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value} cores'
              }
            },
            {
              type: 'value',
              name: 'MEM',
              min: 0,
              max: 256,
              position: 'right',
              offset: 60,
              axisLine: {
                lineStyle: {
                  color: colors[1]
                }
              },
              axisLabel: {
                formatter: '{value} GB'
              }
            },
            {
              type: 'value',
              name: '资源闲置率',
              min: 0,
              max: 100,
              position: 'left',
              axisLine: {
                lineStyle: {
                  color: colors[2]
                }
              },
              axisLabel: {
                formatter: '{value} %'
              }
            }
          ],
          series: [
            {
              name:'CPU',
              type:'bar',
              data:CPUNode3
            },
            {
              name:'MEM',
              type:'bar',
              yAxisIndex: 1,
              data:MEMNode3
            },
            {
              name:'资源闲置率',
              type:'line',
              yAxisIndex: 2,
              data:rateNode3
            }
          ]
        });
      },

    }
  }
</script>
<style>
  div.div-inline{ display:inline-block}
</style>
.div-inline{ display:inline}
