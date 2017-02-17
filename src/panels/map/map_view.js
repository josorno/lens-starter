var PanelView = require('lens/reader').PanelView;

var MapView = function(panelCtrl, config) {
  PanelView.call(this, panelCtrl, config);

  this.$el.addClass('map-panel');

  // Hide toggle on contruction, it will be displayed once data has arrived
  this.hideToggle();
};

MapView.Prototype = function() {

  this.render = function() {

    var self = this;
    this.el.innerHTML = '';

    var href = this.controller.getMapVisualizerReference();

    if(href != ""){
      this.showToggle();
      var $map_div = $('<div class="contenedor"></div>');
      $map_div.append($('<iframe class="claseIframe" src=" '+ href +'">'));

      this.$el.append($map_div);  
    }
    return this;
  };

  /*this.renderAltmetrics = function(altmetrics) {
    // Finally data is available so we tell the panel to show up as a tab
    this.showToggle();

    var $altmetrics = $('<div class="altmetrics"></div>');
    $altmetrics.append($('<div class="label">Altmetric.com Score</div>'));
    $altmetrics.append($('<div class="value"></div>').text(altmetrics.score));
    $altmetrics.append($('<div class="label">Cited on Twitter</div>'));
    $altmetrics.append($('<div class="value"></div>').text(altmetrics.cited_by_tweeters_count));
    $altmetrics.append($('<div class="label">Readers on Mendeley</div>'));
    $altmetrics.append($('<div class="value"></div>').text(altmetrics.readers.mendeley));
    $altmetrics.append($('<div class="copyright">Data provided by <a href="http://altmetric.com">altmetrics.com</div>'));

    this.$el.append($altmetrics);
  };*/
};

MapView.Prototype.prototype = PanelView.prototype;
MapView.prototype = new MapView.Prototype();
MapView.prototype.constructor = MapView;

module.exports = MapView;