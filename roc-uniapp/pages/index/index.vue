<template>
  <view class="index-container">
    <roc-navbar title="首页"></roc-navbar>
    <view class="roc-box">
      <view class="roc-cont">
        <view>图表示例</view>
        <qiun-data-charts type="area" :opts="opts" :chartData="chartData" />
      </view>
    </view>
  </view>
</template>

<script>
import { tokenKey } from '@/common/config.js'

export default {
  data() {
    return {
      chartData: {},
      // 您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: [
          '#1890FF',
          '#91CB74',
          '#FAC858',
          '#EE6666',
          '#73C0DE',
          '#3CA272',
          '#FC8452',
          '#9A60B4',
          '#ea7ccc',
        ],
        padding: [15, 0, 0, 0],
        legend: {},
        xAxis: {
          disableGrid: true,
        },
        yAxis: {
          gridType: 'dash',
          dashLength: 2,
        },
        extra: {
          area: {
            type: 'curve',
            opacity: 0.2,
            addLine: true,
            width: 2,
            gradient: true,
          },
        },
      },
    }
  },
  onLoad() {
    this.getServerData()
  },
  onShow() {
    if (!this.$u.getStorage(tokenKey)) this.$u.route('/pages/login/login')
    // 工具集
    // console.log(this.$u)
  },
  methods: {
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          categories: ['2016', '2017', '2018', '2019', '2020', '2021'],
          series: [
            {
              name: '成交量A',
              data: [35, 8, 25, 37, 4, 20],
            },
            {
              name: '成交量B',
              data: [70, 40, 65, 100, 44, 68],
            },
            {
              name: '成交量C',
              data: [100, 80, 95, 150, 112, 132],
            },
          ],
        }
        this.chartData = JSON.parse(JSON.stringify(res))
      }, 500)
    },
  },
}
</script>

<style lang="scss" scoped>
page {
  .index-container {
    .roc-box {
      padding: 36rpx 24rpx;
      .roc-cont {
        padding: 20rpx;
        border-radius: 16rpx;
        background-color: #fff;
        /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
        .charts-box {
          width: 100%;
          height: 300px;
        }
      }
    }
  }
}
</style>
