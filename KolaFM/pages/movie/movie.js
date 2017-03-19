// pages/movie/movie.js
var util = require("../../utils/util.js");
var app = getApp();

Page({
  data: {
    in_theaters: {},
    coming_soon: {},
    top250: {}
  },
  onLoad: function (options) {
    var publicUrl = app.globalData.doubanBase;
    var in_theatersUrl = publicUrl + "/v2/movie/in_theaters" + "?start=0&count=3";
    var coming_soonUrl = publicUrl + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = publicUrl + "/v2/movie/top250" + "?start=0&count=3";
    this.getMovieListData(in_theatersUrl, "in_theaters");
    this.getMovieListData(coming_soonUrl, "coming_soon");
    this.getMovieListData(top250Url, "top250");
  },
  getMovieListData: function (url, category) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "application/xml"
      }, // 设置请求的 header
      success: function (res) {

        that.callback(res.data, category);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  callback: function (res, category) {
    //数据的提取
    var movies = [];

    for (var idx in res.subjects) {
      var subject = res.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }

      //处理数据源
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }

    //分类放入
    var readyData = {};
    var categorytitles = {
      "in_theaters": "正在热映",
      "coming_soon": "即将上映",
      "top250": "豆瓣电影Top250"
    }
    var categorytitle = categorytitles[category];
    readyData[category] = {
      movies: movies,
      categorytitle: categorytitle
    };

    this.setData(readyData);
  },

  onMovieDetailTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?movieid=' + movieId
    })
  }

})