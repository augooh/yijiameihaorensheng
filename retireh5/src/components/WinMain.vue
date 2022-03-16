<template>
  <div class="win-main">
    <mt-header :title="getTitle()" fixed>
    </mt-header>

    <mt-tab-container v-model="active">
      <mt-tab-container-item id="0">
        <wheel></wheel>
      </mt-tab-container-item>

      <mt-tab-container-item id="1">
        <retire></retire>
      </mt-tab-container-item>

      <mt-tab-container-item id="2">
        <finance></finance>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>

<script>
  import {
    TabContainer,
    TabContainerItem,
    Tabbar,
    TabItem,
    Header
  } from 'mint-ui';

  import Finance from '@/components/Finance'
  import Retire from '@/components/Retire'
  import Wheel from '@/components/Wheel'

  export default {
    name: "WinMain",
    components: {
      'mt-tab-container': TabContainer,
      'mt-tab-container-item': TabContainerItem,
      'mt-tabbar': Tabbar,
      'mt-tab-item': TabItem,
      'mt-header': Header,
      'finance': Finance,
      'retire': Retire,
      'wheel': Wheel
    },
    data: function () {
      var ret = {
        active: '0'
      }
      return ret
    },
    methods: {
      getTitle: function () {
        switch (this.active) {
          case '0':
            let title = '美好人生---生命轮';
            document.title = title;
            return title;

          case '1':
            title = '美好人生---舒适退休计算器';
            document.title = title;
            return title;

          case '2':
            title = '美好人生---财务自由计算器';
            document.title = title;
            return title;
            return '';

          default:
            return ""
        }
      }
    },
    mounted: function () {
      console.log(this.$route.params.pagename)
      switch (this.$route.params.pagename) {
        case 'wheel':
          this.active = '0';
          break;

        case 'retire':
          this.active = '1';
          break;

        case 'finance':
          this.active = '2';
          break;
      }
    }
  }
</script>

<style type="text/css">
  .win-main .mint-tab-container {
    padding: 40px 0 160px
  }

  .win-main .mint-header {
    background-color: #BE3841;
  }

  .win-main .mint-header-title {
    font-size: 17px;
    font-weight: bold;
    line-height: 18px
  }

  .win-main .mint-tabbar > .mint-tab-item.is-selected {
    color: #BE3841;
  }

  .win-main .title {
    text-align: left;
    font-weight: bold;
    padding: 20px 0px 5px;
    margin-left: 10px;
    border-bottom: 1px #BE3841 solid;
  }

  .win-main .ret {
    font-size: 14px;
    margin: 8px 0;
    text-align: justify;
    text-indent: 2em;
  }

  .win-main .remark {
    margin: 40px 0 0 2em;
    text-align: justify;
    text-indent: -2em;
    font-size: 12px;
    color: #BE3841;
  }

  .win-main .sign {
    padding: 0 10px;
    color: #EF4F4F;
    font-weight: bold;
  }

  .win-main .mint-field {
    font-size: 14px;
    height: 50px;
  }

  .win-main .mint-field .mint-cell-title {
    width: 114px;
    text-align: right;
  }

  .win-main .mint-cell-value .mint-field-clear {
    display: none !important;
  }

  .win-main .mint-field-other {
    width: 140px;
    text-align: left;
  }

  .win-main .mint-cell-title span {
    font-size: 14px;
  }

  .win-main .mint-field-other {
    font-size: 14px;
  }

  .win-main .mint-field-other span {
    font-size: 12px;
    color: #BE3841;
    padding: 0 5px;
  }

  .win-main .mint-cell-value input {
    text-align: right;
    padding: 0 5px;
    border-bottom: 1px #e6e5e5 solid;
  }

  .win-main .img-wechat {
    padding: 15px 0px;
  }

  .win-main .img-wechat img {
    width: 100%;
    max-width: 600px;
  }
</style>
