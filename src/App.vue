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
      var nodeD = []
      var edge;
      var linkData= [];
      // var linkItem;
      var edgesOrigin = {"node_50": ["node_4", "node_83", "node_33", "node_17"], "node_0": ["node_4", "node_83", "node_33", "node_17"], "node_58": ["node_4", "node_83", "node_33", "node_17"], "node_4": ["node_31", "node_15", "node_73", "node_93"], "node_83": ["node_31", "node_15", "node_73", "node_93"], "node_33": ["node_31", "node_15", "node_73", "node_93"], "node_17": ["node_31", "node_15", "node_73", "node_93"], "node_70": ["node_37", "node_55", "node_21"], "node_30": ["node_37", "node_55", "node_21"], "node_45": ["node_37", "node_55", "node_21"], "node_37": ["node_18", "node_7", "node_99", "node_8", "node_91"], "node_55": ["node_18", "node_7", "node_99", "node_8", "node_91"], "node_21": ["node_18", "node_7", "node_99", "node_8", "node_91"], "node_57": ["node_28", "node_3", "node_97"], "node_20": ["node_28", "node_3", "node_97"], "node_28": ["node_39", "node_86", "node_94"], "node_3": ["node_39", "node_86", "node_94"], "node_97": ["node_39", "node_86", "node_94"], "node_72": ["node_62", "node_77"], "node_34": ["node_62", "node_77"], "node_81": ["node_62", "node_77"], "node_36": ["node_62", "node_77"], "node_62": ["node_69", "node_13", "node_9", "node_19", "node_27", "node_5"], "node_77": ["node_69", "node_13", "node_9", "node_19", "node_27", "node_5"], "node_14": ["node_65", "node_2", "node_76", "node_38"], "node_26": ["node_65", "node_2", "node_76", "node_38"], "node_65": ["node_82", "node_60", "node_6", "node_74", "node_85"], "node_2": ["node_82", "node_60", "node_6", "node_74", "node_85"], "node_76": ["node_82", "node_60", "node_6", "node_74", "node_85"], "node_38": ["node_82", "node_60", "node_6", "node_74", "node_85"], "node_56": ["node_25", "node_48", "node_59", "node_32"], "node_67": ["node_25", "node_48", "node_59", "node_32"], "node_25": ["node_35", "node_46", "node_1", "node_98"], "node_48": ["node_35", "node_46", "node_1", "node_98"], "node_59": ["node_35", "node_46", "node_1", "node_98"], "node_32": ["node_35", "node_46", "node_1", "node_98"], "node_63": ["node_61", "node_89"], "node_53": ["node_61", "node_89"], "node_61": ["node_54", "node_24", "node_23", "node_51"], "node_89": ["node_54", "node_24", "node_23", "node_51"], "node_84": ["node_88", "node_43", "node_41"], "node_10": ["node_88", "node_43", "node_41"], "node_49": ["node_88", "node_43", "node_41"], "node_95": ["node_88", "node_43", "node_41"], "node_88": ["node_71", "node_79", "node_87"], "node_43": ["node_71", "node_79", "node_87"], "node_41": ["node_71", "node_79", "node_87"], "node_68": ["node_47", "node_75"], "node_16": ["node_47", "node_75"], "node_92": ["node_47", "node_75"], "node_78": ["node_47", "node_75"], "node_47": ["node_22", "node_80", "node_66", "node_12", "node_44"], "node_75": ["node_22", "node_80", "node_66", "node_12", "node_44"], "node_29": ["node_42", "node_90", "node_11"], "node_64": ["node_42", "node_90", "node_11"], "node_96": ["node_42", "node_90", "node_11"], "node_42": ["node_52", "node_40"], "node_90": ["node_52", "node_40"], "node_11": ["node_52", "node_40"], "node_31": ["node_63", "node_53", "node_68", "node_16", "node_92", "node_78"], "node_15": ["node_63", "node_53", "node_68", "node_16", "node_92", "node_78"], "node_73": ["node_63", "node_53", "node_68", "node_16", "node_92", "node_78"], "node_93": ["node_63", "node_53", "node_68", "node_16", "node_92", "node_78"], "node_18": ["node_84", "node_10", "node_49", "node_95"], "node_7": ["node_84", "node_10", "node_49", "node_95"], "node_99": ["node_84", "node_10", "node_49", "node_95"], "node_8": ["node_84", "node_10", "node_49", "node_95"], "node_91": ["node_84", "node_10", "node_49", "node_95"], "node_39": ["node_56", "node_67", "node_84", "node_10", "node_49", "node_95"], "node_86": ["node_56", "node_67", "node_84", "node_10", "node_49", "node_95"], "node_94": ["node_56", "node_67", "node_84", "node_10", "node_49", "node_95"], "node_69": ["node_50", "node_0", "node_58", "node_14", "node_26"], "node_13": ["node_50", "node_0", "node_58", "node_14", "node_26"], "node_9": ["node_50", "node_0", "node_58", "node_14", "node_26"], "node_19": ["node_50", "node_0", "node_58", "node_14", "node_26"], "node_27": ["node_50", "node_0", "node_58", "node_14", "node_26"], "node_5": ["node_50", "node_0", "node_58", "node_14", "node_26"], "node_82": ["node_56", "node_67", "node_63", "node_53"], "node_60": ["node_56", "node_67", "node_63", "node_53"], "node_6": ["node_56", "node_67", "node_63", "node_53"], "node_74": ["node_56", "node_67", "node_63", "node_53"], "node_85": ["node_56", "node_67", "node_63", "node_53"], "node_35": ["node_72", "node_34", "node_81", "node_36", "node_29", "node_64", "node_96"], "node_46": ["node_72", "node_34", "node_81", "node_36", "node_29", "node_64", "node_96"], "node_1": ["node_72", "node_34", "node_81", "node_36", "node_29", "node_64", "node_96"], "node_98": ["node_72", "node_34", "node_81", "node_36", "node_29", "node_64", "node_96"], "node_54": ["node_57", "node_20", "node_29", "node_64", "node_96"], "node_24": ["node_57", "node_20", "node_29", "node_64", "node_96"], "node_23": ["node_57", "node_20", "node_29", "node_64", "node_96"], "node_51": ["node_57", "node_20", "node_29", "node_64", "node_96"], "node_71": ["node_72", "node_34", "node_81", "node_36"], "node_79": ["node_72", "node_34", "node_81", "node_36"], "node_87": ["node_72", "node_34", "node_81", "node_36"], "node_22": ["node_70", "node_30", "node_45"], "node_80": ["node_70", "node_30", "node_45"], "node_66": ["node_70", "node_30", "node_45"], "node_12": ["node_70", "node_30", "node_45"], "node_44": ["node_70", "node_30", "node_45"], "node_52": ["node_72", "node_34", "node_81", "node_36", "node_70", "node_30", "node_45"], "node_40": ["node_72", "node_34", "node_81", "node_36", "node_70", "node_30", "node_45"]};
      Object.keys(edgesOrigin).forEach(function(index) {
        //console.log(index)
         for(edge in edgesOrigin[index]){
           //console.log(edgesOrigin[index][edge])
           linkData.push({source:index,target:edgesOrigin[index][edge]})
         }
      });
      console.log(linkData)
      for(var i=0;i<100;i++) {
        nodeD.push({
          name:'node_'+i,
          category:1
        })
      }
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
            // edgeSymbol: ['circle', 'arrow'],
            // edgeSymbolSize: [2, 5],
            // edgeLabel: {
            //     fontSize: 10
            // },
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
              repulsion: 20,
              gravity: 0.11,
              edgeLength: [15,40],
              layoutAnimation: true,
              friction: 0.6
              },
            draggable: true,
            data: nodeD,
            // [{
            //     name: '节点1',
            //     category:0
            // }, {
            //     name: '节点2',
            //     category:0
            // }, {
            //     name: '节点3',
            //     category:0
            // }, {
            //     name: '节点4',
            //     category:1
            // }],
            links: linkData,
            // links: [{
            //     source: 0,
            //     target: 1,

            // }, {
            //     source: '节点2',
            //     target: '节点1',

            // }, {
            //     source: '节点1',
            //     target: '节点3'
            // }, {
            //     source: '节点2',
            //     target: '节点3'
            // }, {
            //     source: '节点2',
            //     target: '节点4'
            // }, {
            //     source: '节点1',
            //     target: '节点4'
            // }],
            // lineStyle: {
            //     opacity: 0.9,
            //     width: 1,
            //     curveness: 0
            // }
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
