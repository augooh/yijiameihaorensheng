<template>
  <div class="life-chart">
    <canvas id="life-chart" :height="height"></canvas>
  </div>
</template>

<script>
  /* eslint-disable */
  /*import name from '@/components/name'*/
  CanvasRenderingContext2D.prototype.drawSector = function (x, y, radius, sDeg, eDeg, stroke, lineWidth, fill) {
    this.save();
    this.translate(x, y);
    this.rotate(-90 * Math.PI / 180);

    this.beginPath();
    this.arc(0, 0, radius, sDeg, eDeg);
    this.save();

    this.rotate(eDeg);
    this.moveTo(radius, 0);
    this.lineTo(0, 0);
    this.restore();

    this.rotate(sDeg);
    this.lineTo(radius, 0);
    this.closePath();

    this.restore();
    if (null != stroke) {
      this.strokeStyle = stroke;
      this.lineWidth = (null == lineWidth ? 1 : lineWidth);
      this.stroke();
    }

    if (null != fill) {
      this.fillStyle = fill;
      this.fill();
    }

    this.restore();
    return this;
  }

  CanvasRenderingContext2D.prototype.drawText = function (x, y, radius, sDeg, text, color) {
    this.save();
    this.translate(x, y);
    this.rotate(sDeg);
    this.textAlign = "center";
    if (null != color) {
      this.fillStyle = color;
    }
    this.fillText(text, 0, -radius + 10);
    this.restore();
  }

  CanvasRenderingContext2D.prototype.drawScale = function (x, y, radius, sDeg, count, lineWidth, color) {
    this.save();
    this.translate(x, y);
    this.rotate(sDeg);

    if (null != color) {
      this.strokeStyle = color;
      this.fillStyle = color;
    }
    this.lineWidth = (null == lineWidth ? 1 : lineWidth);

    radius -= 8;
    var temp = radius / count;
    this.beginPath();
    this.moveTo(0, 0);

    this.lineTo(0, -radius);


    for (var i = 0; i < count; i++) {
      this.moveTo((i % 5 == 0) ? -5 : -3, -radius + temp * i);
      this.lineTo((i % 5 == 0) ? 5 : 3, -radius + temp * i);
    }
    this.closePath();
    this.stroke();

    this.textAlign = "right";
    for (var i = 0; i < count; i++) {
      if (i % 5 == 0) {
        this.fillText("" + (count - i), -8, -radius + temp * i + 4);
      }
    }

    this.restore();
  }

  CanvasRenderingContext2D.prototype.drawPortion = function (x, y, radius, sDeg, angle, count, item) {
    var deg = Math.PI / 180;

    this.save();

    this.drawSector(x, y, radius + 20, (-(angle - 15) / 2 + sDeg) * deg, ((angle - 15) / 2 + sDeg) * deg, item.stroke, item.lineWidth, item.outer.background);

    this.drawText(x, y, radius + 16, sDeg * deg, item.outer.text, item.outer.color);

    this.drawSector(x, y, radius, (-angle / 2 + sDeg) * deg, (angle / 2 + sDeg) * deg, item.stroke, item.lineWidth, item.fill);

    this.drawSector(x, y, (radius - 8) / count * item.data.val, (-angle / 2 + sDeg) * deg, (angle / 2 + sDeg) * deg, null, 0, item.data.color);

    this.drawScale(x, y, radius, sDeg * deg, count, 0.5, 'rgba(0,0,0,1)')

    this.restore();
    return this;
  }

  export default {
    name: "LifeChart",
    components: {},
    props: [
      'height'
    ],
    data: function () {
      var ret = {}
      return ret;
    },
    methods: {
      draw: function (obj) {
        if (null == obj) {
          return
        }

        var can = document.getElementById('life-chart');
        var ctx = can.getContext('2d');

        var x = can.width / 2.0;
        var y = can.height / 2.0;
        var r = -30 + (x < y ? x : y);
        var angle = 360 / obj.length;

        ctx.clearRect(0, 0, can.width, can.height);
        console.log("sdf")

        for (var i in obj) {
          ctx.drawPortion(x, y, r, angle * i + 180, angle, 10, obj[i]);
        }
      }
    }
  }
</script>

<style>

</style>
