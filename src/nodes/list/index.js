"use strict";

var LensNodes = require("lens/article/nodes");
var ListModel = LensNodes["list"].Model;

module.exports = {
  Model: ListModel,
  View: require('./list_view')
};