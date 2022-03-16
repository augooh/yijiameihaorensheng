<template>
  <div class="finance">
    <div class="title">请回答以下问题：</div>
    <gorupinput title="你的生活费" label="元/月" v-model="alimony"></gorupinput>
    <gorupinput title="你现有存款" label="元" v-model="deposit"></gorupinput>
    <gorupinput title="你计划在" label="年后实现财务自由" v-model="year"></gorupinput>
    <gorupinput title="你的理财年收益率" label="%" v-model="yield"  order="比如7%"></gorupinput>
    <gorupinput title="通货膨胀" label="%"  order="比如3%" v-model="inflation"></gorupinput>

    <div class="title">计算结果：</div>
    <p class="ret">恭喜！只要你从现在起每月存下
      <span class="sign">{{calculate().toFixed(0)}}</span>元，并每年以
      <span class="sign">{{inflation==null?0.00: parseFloat(inflation).toFixed(2)}}</span>%追加存款，就能在
      <span class="sign">{{year==null?"0": year}}</span>年后实现财务自由！
    </p>
    <div class="img-wechat">
      <img src="static/wechat.gif"/>
    </div>
  </div>
</template>

<script>
  import GorupInput from '@/components/GorupInput'

  export default {
    name: "Finance",
    components: {
      'gorupinput': GorupInput,
    },
    data: function () {
      var ret = {
        alimony: null,    //请输生活费
        deposit: null,    //请输入有存款
        year: null,       //你计划时间
        yield: null,      //请输入收益率
        inflation: null,  //通货膨胀
        capital: 0,       //x年后实现财务自由需要的资本
        existing: 0,      //现有存款终值
        FV: 0,            //增长年金终值
        PV: 0,            //增长年金现值

      }
      return ret;
    },
    methods: {
      calculate: function () {
        if (null != this.alimony
          && null != this.deposit
          && null != this.yield
          && null != this.year
          && null != this.inflation) {

          // x年后实现财务自由需要的资本
          this.capital = (this.alimony * 12 * Math.pow(1 + this.inflation / 100, this.year)) / (this.yield / 100 - this.inflation / 100)
          // console.log(this.capital.toFixed(2))

          //现有存款终值
          this.existing = this.deposit * Math.pow(1 + this.yield / 100, this.year)
          // console.log(this.existing.toFixed(2))

          //增长年金终值
          this.FV = this.capital - this.existing
          // console.log(this.FV.toFixed(2))

          //增长年金现值
          this.PV = this.FV / Math.pow(1 + this.yield / 100, this.year)
          // console.log(this.PV.toFixed(2))

          return this.PV * (this.yield / 100 - this.inflation / 100) / ((1 - Math.pow((1 + this.inflation / 100) / (1 + this.yield / 100), this.year)) * 12)

        }
        return 0;
      }
    }
  }
</script>

<style type="text/css">
  .finance {
    margin: 8px;
  }

</style>
