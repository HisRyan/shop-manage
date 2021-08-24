<script lang="ts">
import { defineComponent, h,onMounted,ref , nextTick, getCurrentInstance} from 'vue'
import { table } from  './index'
import { Button, Checkbox, Image } from 'ant-design-vue'
import BasicForm from  '@/components/BasicForm/index.vue'
import gzData from '@/assets/china.json';
import * as echarts from 'echarts'
const Table = defineComponent({
  components:{
    Button,
    'a-checkbox-group':Checkbox.Group,
    'a-checkbox':Checkbox,
    BasicForm,
    'a-image':Image,
  },
  setup() {

    //合并后的数组
    const { proxy } = getCurrentInstance();

    const marathonSchemas = ref([
      {
        label: "电子证书功能开关",
        field: 'openCertificate',
        placeholder:'请输入名字',
        component: 'Input',
        defaultValue: false,
        required: false,
        cancelVerify: true,
      },
      {
        label: "证书显示条件设置",
        field: 'electronicCertificateType',
        component: 'InputTextArea',
        placeholder:'请输入名字',
        defaultValue: 0,
        required: false,
      },
    ])
    const myCharts = ref<any>();
    function getJson () {
      option.value.series[0].data = gzData.features.map((item) => { // 显示窗口的数据转换
        return {
          value: (Math.random() * 1000).toFixed(2),
          name: item.properties.name,
          number: 10
        };
      });
    }
    const option = ref( {
      title: {
        text: '四川地图'
      },
      tooltip: { // 窗口外框
        backgroundColor: 'rgba(0,0,0,0)',
        trigger: 'item',
        formatter: function (item) {
          var tipHtml = '';
          tipHtml = `<div style="padding: .6rem .8rem;font-size: .325rem;color:#fff;border-radius:10%;background: linear-gradient(#cccecf, #cccecf) left top,
									linear-gradient(#cccecf, #cccecf) left top,
									linear-gradient(#cccecf, #cccecf) right top,
									linear-gradient(#cccecf, #cccecf) right top,
									linear-gradient(#cccecf, #cccecf) left bottom,
									linear-gradient(#cccecf, #cccecf) left bottom,
									linear-gradient(#cccecf, #cccecf) right bottom,
									linear-gradient(#cccecf, #cccecf) right bottom;
							background-repeat: no-repeat;
							background-size: .08rem .3rem, .3rem .08rem;background-color:rgba(6, 79, 111,.6);">${item.data.name}  </div><span>${item.data.number}</span>`;
          return tipHtml;
        },
      },
      // legend: { // 注释掉有文字
      // 	show: false,
      // },
      series: [{
        name: '广东省数据',
        type: 'map',
        map: '广东', // 自定义扩展图表类型
        zoom: 0.65, // 缩放
        showLegendSymbol: true,
        label: { // 文字
          show: true,
          color: '#fff',
          fontSize: 10
        },
        itemStyle: { // 地图样式
          borderColor: 'blue',
          borderWidth: 1,
          areaColor: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [{
              offset: 0,
              color: 'white' // 0% 处的颜色
            }, {
              offset: 1,
              color: 'yellow' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          },
          shadowColor: 'rgba(128, 217, 248, 1)',
          // shadowColor: 'rgba(255, 255, 255, 1)',
          shadowOffsetX: -2,
          shadowOffsetY: 2,
          shadowBlur: 10
        },

        layoutCenter: ['50%', '50%'],
        layoutSize: '160%',
        markPoint: {
          symbol: 'none'
        },
        data: [],
      }],
    })
    const cityData = {

    }
    onMounted(() => {
      echarts.registerMap('广东', gzData);
      getJson();
      const myChart = echarts.init(document.getElementById('myChart'))
      myChart.setOption(option.value);
      myChart.on('click', function (params) {
        console.log(params)
      });
    })
    return {
      marathonSchemas,
    }
  }
})

export default Table

</script>
<template>
  <div>
    <BasicForm :basic-props="marathonSchemas" />
  </div>
  <div
    id="homebarcharts"
    :class="className"
  />
  <div id="myChart" ref="myChart" style="width:100%;height:520px" />
</template>
<style lang='scss' scoped >
@import "src/style/mixin";
.table_columns {
  @include fSizeColor(15px,#000);
  @include flexDisplay(center,center);
  div {
    @include wh(70px,50px);
    @include flexDisplay(center,center);
  }
  .gzMap{
    width:100%;
    height:100%
  }
}
</style>
