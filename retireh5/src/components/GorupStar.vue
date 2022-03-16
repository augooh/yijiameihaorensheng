<template>

  <div class="gorup-star">
    <div class="gorup">
      <span class="g-title">{{title}}</span>

      <span v-for="item in gorups()" :class="['star',{activ:(value >= item.value)}]"
            v-on:click="onClick(item.value)"></span>

      <span class="g-value">{{value}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GorupStar",
    props: [
      'title',
      'count'
    ],
    data: function () {
      return {
        value: 0
      }
    },
    methods: {
      gorups: function () {
        var ret = [];
        for (var i = 0; i < this.count; i++) {
          ret.push({
            value: i + 1
          });
        }
        return ret;
      },
      onClick: function (id) {
        if (this.value == id) {
          id = 0;
        }
        this.value = id;
        this.$emit("onClick", id);
      }
    }
  }
</script>

<style scoped>
  .gorup-star {
    width: auto;
    padding-left: 10px;
  }

  .gorup-star .gorup {
    border-bottom: 1px #efefef solid;
    width: 100%;
    padding: 8px 0;
  }

  .gorup-star .gorup .g-title {
    display: inline-block;
    vertical-align: super;
    width: 50px;
  }

  .gorup-star .gorup .g-value {
    display: inline-block;
    vertical-align: super;
    width: 16px;
    font-size: 14px;
    color: #D14A27;
  }

  .gorup-star .gorup .right {
    display: table-cell;
    text-align: left;
  }

  .gorup-star .gorup .star {
    width: 20px;
    height: 20px;
    background: url("/static/star.png") no-repeat;
    background-size: contain;
    display: inline-block;
    margin: 2px;
  }

  .gorup-star .gorup .star.activ {
    background: url("/static/star_red.png") no-repeat;
    background-size: contain;
  }
</style>
