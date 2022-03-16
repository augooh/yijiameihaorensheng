<template>
  <div class="retire">
    <div class="title">请回答以下问题：</div>

    <gorupinput title="你的生活费" label="元/月" v-model="alimony"></gorupinput>
    <gorupinput title="距离退休还有" label="年" v-model="year"></gorupinput>
    <gorupinput title="养老金" label="元/月" order="按现在标准计算" v-model="retire"></gorupinput>
    <gorupinput title="你的理财年收益率" label="%" v-model="yield"  order="比如7%"></gorupinput>
    <gorupinput title="通货膨胀" label="%" order="比如3%" v-model="inflation"></gorupinput>

    <div class="title">计算结果：</div>
    <p class="ret">恭喜！只要你从现在起每月存下
      <span class="sign">{{calculate().toFixed(0)}}</span>元，并每年以
      <span class="sign">{{inflation==null?0.00: parseFloat(inflation).toFixed(2)}}</span>
      %追加存款，你就能在退休后实现理想的生活水平！
    </p>


    <div class="img-wechat">
      <img src="static/wechat.gif"/>
    </div>
  </div>
</template>

<script>
  import GorupInput from '@/components/GorupInput'

  export default {
    name: "Retire",
    components: {
      'gorupinput': GorupInput,
    },
    data: function () {
      var ret = {
        alimony: null,    //请输生活费
        year: null,       //距离退休还有
        retire: null,    //养老金
        yield: null,      //请输入收益率
        inflation: null,  //通货膨胀

        living: 0,       //每月开消
        social: 0,       //每月养老金
        gap_month: 0,    //每月养老需补
        gap_year: 0,     //每年养老需补
        real_return: 0,   //实际回报率
        capital: 0        //需准备资金
      }
      return ret;
    },
    methods: {
      calculate: function () {
        if (null != this.alimony
          && null != this.retire
          && null != this.yield
          && null != this.year
          && null != this.inflation) {

          //每月开消
          this.living = this.alimony * Math.pow(1 + this.inflation / 100, this.year)
          console.log(this.living.toFixed(2))

          //每月养老金
          this.social = this.retire * Math.pow(1 + this.inflation / 100, this.year)
          console.log(this.social.toFixed(2))

          //每月养老金
          this.gap_month = this.living - this.social
          console.log(this.gap_month.toFixed(2))

          //每年养老需补
          this.gap_year = this.gap_month * 12
          console.log(this.gap_year.toFixed(2))

          //实际回报率
          this.real_return = this.yield / 100 - this.inflation / 100
          console.log(this.real_return.toFixed(2))

          //需准备资金
          this.capital = this.gap_year / this.real_return
          console.log(this.capital.toFixed(2))

          return ((this.capital * this.real_return) / ((1 - Math.pow((1 + this.inflation / 100) / (1 + this.yield / 100), this.year)) *
            Math.pow(1 + this.yield / 100, this.year))) / 12
        }
        return 0;
      }
    }
  }
</script>

<style type="text/css">
  .retire {
    margin: 8px;
  }


</style>
