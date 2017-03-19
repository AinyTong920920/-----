var musicData=require('../data/music-data.js');
Page({
  data:{},
  // 跳转详情页面
  goMusicDetail:function(event){
    var musicId = event.currentTarget.dataset.musicid;
    wx.navigateTo({
      url: 'music-detail/music-detail?musicid='+musicId
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     this.setData({
      newsData:musicData.newsData
    })
  }

})