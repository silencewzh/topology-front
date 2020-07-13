<template>
  <div id="app">
    <div><h1>拓扑分析</h1></div>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="uploadSuccess"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
      </el-col>
      <el-col :span="16">
        <div id="main" style="width: 800px;height:500px;">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
  },
  // var chartData = null;
   data() {
      return {
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      };
    },
  methods:{
    myEcharts(){
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      var option = {
    title: {
        text: '告警根因分析'
    },
    tooltip: {},
    legend:{
      data:['其他节点','根因节点']
    },
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
        {
            type: 'graph',
            layout: "force",
            symbol: "circle",
            symbolSize: 10,
            roam: true,
            focusNodeAdjacency: true,
            label: {
                show: false
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
                fontSize: 20
            },
            categories:[
              {
                name:'其他节点',
                base:'其他节点'
              },
              {
                name:'根因节点',
                base:'根因节点'
              }
            ],
            force: {
              repulsion: 40,
              gravity: 0.11,
              edgeLength: 15,
              layoutAnimation: true,
              friction: 0.6
              },
            draggable: true,
            data: [{
                name: '节点1',
                category:0
            }, {
                name: '节点2',
                category:0
            }, {
                name: '节点3',
                category:0
            }, {
                name: '节点4',
                category:1
            }],
            // links: [],
            links: [{
                source: 0,
                target: 1,

            }, {
                source: '节点2',
                target: '节点1',

            }, {
                source: '节点1',
                target: '节点3'
            }, {
                source: '节点2',
                target: '节点3'
            }, {
                source: '节点2',
                target: '节点4'
            }, {
                source: '节点1',
                target: '节点4'
            }],
            lineStyle: {
                opacity: 0.9,
                width: 2,
                curveness: 0
            }
        }
    ]
    };

      myChart.setOption(option);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      // eslint-disable-next-line no-unused-vars
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      // uploadSuccess(response, file, fileList){

      // }
  },
  mounted(){
    this.myEcharts();
  }


}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif,'PingFang SC';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
