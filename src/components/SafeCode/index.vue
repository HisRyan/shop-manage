<script lang="ts">
import { defineComponent,toRefs, ref} from 'vue'

const safeCode = defineComponent({
  props:{
    fontSizeMin: {
      type: Number,
      default: 16
    },
    fontSizeMax: {
      type: Number,
      default: 40
    },
    backgroundColorMin: {
      type: Number,
      default: 180
    },
    backgroundColorMax: {
      type: Number,
      default: 240
    },
    colorMin: {
      type: Number,
      default: 50
    },
    colorMax: {
      type: Number,
      default: 160
    },
    lineColorMin: {
      type: Number,
      default: 40
    },
    lineColorMax: {
      type: Number,
      default: 180
    },
    dotColorMin: {
      type: Number,
      default: 0
    },
    dotColorMax: {
      type: Number,
      default: 255
    },
    contentWidth: {
      type: Number,
      default: 112
    },
    identifyCodes: {
      type: String,
      default: "1234567890"
    },
    contentHeight: {
      type: Number,
      default: 40
    }
  },
  setup(props) {
    //验证码画布相关配置
    const {
      backgroundColorMin,
      backgroundColorMax,
      contentWidth,
      contentHeight,
      colorMin,
      colorMax,
      fontSizeMin,
      fontSizeMax
    }
      = toRefs(props)
    //验证码数字
    const safeCode = ref<string>('')

    //随机返回min到max的随机数
    const randomNum = (min,max) => {
      return Math.floor(Math.random() * (max - min + 1) ) + min
    }

    //生成一个随机颜色
    const randomColor = (min,max) => {
      let r = randomNum(min,max)
      let g = randomNum(min,max)
      let b = randomNum(min,max)
      return "rgb(" + r + "," + g + "," + b + ")";
    }

    const drawPainter = () => {
      let canvas = document.getElementById("canvas_code")
      let ctx = canvas.getContext("2d");
      ctx.textBaseline = "bottom"
      // ctx.fillStyle = this.randomNum(backgroundColorMin,backgroundColorMax)
      ctx.fillRect(0,0, contentWidth, contentHeight)
      //绘制文字
      for(let i = 0; i< safeCode.value.length; i++) {
        drawText(ctx, safeCode.value[i], i)
      }
    }

    //描绘数字
    const drawText = (ctx, txt, i) => {
      ctx.fillStyle = randomColor(colorMin,colorMax)
      ctx.font = randomNum(fontSizeMin, fontSizeMax) + 'px SimHei'



    }
    return {
      safeCode,
      randomNum,
      randomColor
    }
  }
})

export default safeCode

</script>

<template>
  <div id="canvas">
    <canvas id="canvas_code" />
  </div>
</template>

<style lang='scss' scoped>

</style>
