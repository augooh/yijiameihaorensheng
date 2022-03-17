<template>
  <div class="wheel">
    <div class="title">请给你现阶段各项人生命题的满意度打分（0-10分，10为非常满意)：</div>
    <!--<mt-field label="健康" type="number" v-model="health" :attr="{min:1,max:10}">分<span>1－10分</span></mt-field>-->

    <gorupstar ref="star1" title="健康" count="10" v-on:onClick="onClick"></gorupstar>
    <gorupstar ref="star2" title="事业" count="10" v-on:onClick="onClick"></gorupstar>
    <gorupstar ref="star3" title="伴侣" count="10" v-on:onClick="onClick"></gorupstar>
    <gorupstar ref="star4" title="家庭" count="10" v-on:onClick="onClick"></gorupstar>
    <gorupstar ref="star5" title="财务" count="10" v-on:onClick="onClick"></gorupstar>
    <gorupstar ref="star6" title="朋友" count="10" v-on:onClick="onClick"></gorupstar>

    <div class="title">你的生命轮：</div>
    <lifechart ref="chart" :options="options" :height="350"></lifechart>

    <div class="img-wechat">
      <img src="static/wechat.gif"/>
    </div>
  </div>
</template>

<script>
import LifeChart from '@/components/LifeChart'
import GorupStar from '@/components/GorupStar'
import {Field} from 'mint-ui'

export default {                     ///////////////////////////
  name: "Wheel",                    //                       ///
  components: {                    //                       ////
    'lifechart': LifeChart,       //                       // //
    'gorupstar': GorupStar,      ///////////////////////////  //
    'mt-field': Field            //                      //   //
  },                             //                      //   //
  data: function () {            //       长方形          //  //
    return {                     //                      // //
      health: null,              //                      ////
      cause: null,               ///////////////////////////
      pastime: null,
      finance: null,
      mission: null,
      mate: null,
      options: {
        startAngle: -3.1415926,
        animation: {
          animateRotate: true,
          animateScale: true
        }
      }
    }
  },
  mounted: function () {
    this.$refs.chart.draw(this.getData());
  },
  methods: {
    onClick: function (value) {
      this.$refs.chart.draw(this.getData());
    },
    getData: function () {
      return [
        {
          stroke: '#000000',
          lineWidth: 1,
          fill: '#FFFFFF',
          outer: {
            text: "朋友",
            color: '#000000',
            background: '#8064A1'
          },
          data: {
            val: this.$refs.star6.value,
            color: '#E6E6FA'
          }
        },
        {
          stroke: '#000000',
          lineWidth: 1,
          fill: '#FFFFFF',
          outer: {
            text: "财务",
            color: '#000000',
            background: '#50609C'
          },
          data: {
            val: this.$refs.star5.value,
            color: '#E0FFFF'
          }
        },
        {
          stroke: '#000000',
          lineWidth: 1,
          fill: '#FFFFFF',
          outer: {
            text: "事业",
            color: '#000000',
            background: '#96B653'
          },
          data: {
            val: this.$refs.star2.value,
            color: '#EEFFBB'
          }
        },
        {
          stroke: '#000000',
          lineWidth: 1,
          fill: '#FFFFFF',
          outer: {
            text: "健康",
            color: '#000000',
            background: '#579B9A'
          },
          data: {
            val: this.$refs.star1.value,
            color: '#AAFFEE'
          }
        },
        {
          stroke: '#000000',
          lineWidth: 1,
          fill: '#FFFFFF',
          outer: {
            text: "伴侣",
            color: '#000000',
            background: '#D88A40'
          },
          data: {
            val: this.$refs.star3.value,
            color: '#FFDDAA'
          }
        },
        {
          stroke: '#000000',
          lineWidth: 1,
          fill: '#FFFFFF',
          outer: {
            text: "家庭",
            color: '#000000',
            background: '#C14F4F'
          },
          data: {
            val: this.$refs.star4.value,
            color: '#FFA488'
          }
        },

      ];
    }
  },

}
</script>
<!--watch: {-->
<!--'health': 'fillData',-->
<!--}-->
<style type="text/css">
.wheel {
  margin: 8px;
}

.wheel .mint-field .mint-cell-title {
  width: 100px;
  text-align: right;
}

.wheel .mint-field-other {
  width: 140px;
  text-align: left;
}

.wheel canvas {
  margin-top: 8px;
}


</style>
