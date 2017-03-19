// pages/music/music-detail/music-detail.js
var musicData = require("../../data/music-data.js");
Page({
  data: {
    musicflag: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.data.currentMusicId = options.musicid;
    var musicDataItem = musicData.newsData[options.musicid];
    this.setData(musicDataItem);

    //第一次进入判断是否收藏
    var musicsCollected = wx.getStorageSync('music_Collected');
    if (musicsCollected) {
      var collected = musicsCollected[options.musicid];
      this.setData({
        collected: collected
      });
    } else {
      var musicsCollected = {};
      musicsCollected[options.musicid] = false;
      wx.setStorageSync('music_Collected', musicsCollected);
    }
  },
  onCollected: function (event) {
    var musicsCollected = wx.getStorageSync('music_Collected');
    var musicCollected = musicsCollected[this.data.currentMusicId];
    musicCollected = !musicCollected;

    // 更新存储
    musicsCollected[this.data.currentMusicId] = musicCollected;
    wx.setStorageSync('music_Collected', musicsCollected);

    //更新当前页面
    this.setData({
      collected: musicCollected
    })
    wx.showToast({
      title: musicCollected ? "取消收藏" : "收藏成功",
      duration: 1000
    })
  },
  playermusic: function () {
    var currentMusicId = this.data.currentMusicId;
    var music = musicData.newsData[currentMusicId].music;
    var musicflag = this.data.musicflag;

    if (musicflag) {
      wx.pauseBackgroundAudio();
      this.setData({
        musicflag: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: music.url,
        title: music.title,
        coverImgUrl: music.coverImg
      })

      this.setData({
        musicflag: true
      })
    }




  }
})