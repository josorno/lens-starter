var PanelController = require("lens/reader").PanelController;
var MapView = require("./map_view");

var MapController = function(document, config) {
  PanelController.call(this, document, config);
};

MapController.Prototype = function() {
  this.createView = function() {
    return new MapView(this, this.config);
  };

  /*this.getAltmetrics = function(cb) {
    var doi = this.document.get('publication_info').doi;

		$.ajax({
		  url: "http://api.altmetric.com/v1/doi/"+doi,
		  dataType: "json",
		}).done(function(res) {
			cb(null, res);
		});
  };*/

  this.getMapVisualizerReference = function(){
      var my_supplements = this.document.get("publication_info").mySupplements;
      if(my_supplements[0]){
        return my_supplements[0].url;
      }
      return "";
  };

};

MapController.Prototype.prototype = PanelController.prototype;
MapController.prototype = new MapController.Prototype();

module.exports = MapController;