<template>
  <div class="gorup-input">
    <div class="gorup">
      <span class="in-title">{{title}}</span>
      <div class="input">
        <input type="tel"
               v-on:blur="onblur" v-model="currentValue"
               onfocus="this.value=this.value.replace(/,/gi,'')"
               onkeydown="return (8==event.keyCode)||(/[\d.]/.test(String.fromCharCode(event.keyCode)));"/>
      </div>
      <p class="in-label">{{label}}
        <span class="in-order">{{order}}</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GorupInput",
    props: [
      'title',
      'value',
      'label',
      'order',
      'value'
    ],
    data: function () {
      return {
        currentValue: this.value
      }
    },
    watch: {
      value(val) {
        this.currentValue = val;
      },
      currentValue(val) {
        this.$emit('input', val.replace(/,/gi, ''));
      }
    },
    methods: {
      onblur: function (e) {
        // console.log(e);
        var val = e.target.value.toString();
        var length = val.length;
        for (var i = 1; i < length / 3; i++) {
          var temp = val.slice(0, -4 * i + 1);    //从后往前数，来获取前面的字符串
          val = val.replace(temp, temp + ',');    //给前面的字符串后面加一个逗号
        }
        e.target.value = val;
      }
    }
  }
</script>

<style scoped>
  .gorup-input {
    width: auto;
    padding-left: 10px;
  }

  .gorup-input .gorup {
    border-bottom: 1px #efefef solid;
    width: 100%;
    padding: 14px 0;
    font-size: 14px;
    display: table;
  }

  .gorup-input .gorup .input {
    border-bottom: 1px #efefef solid;
    padding: 0 0.5rem;
    display: table-cell;
  }

  .gorup-input .gorup input {
    outline: none;
    text-align: right;
    font-size: 16px;
    width: 100%;
    border: 0;
  }

  .gorup-input .gorup .in-label {
    width: 135px;
    display: table-cell;
    text-align: left;
  }

  .gorup-input .gorup .in-order {
    font-size: 12px;
    color: #D14A27;
  }

  .gorup-input .gorup .in-title {
    width: 120px;
    display: table-cell;
    text-align: right;
  }


</style>
