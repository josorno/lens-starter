var PanelController = require("lens/reader").PanelController;
var MapView = require("./map_view");

var MapController = function(document, config) {
  PanelController.call(this, document, config);
};

MapController.Prototype = function() {
  this.createView = function() {
    return new MapView(this, this.config);
  };


  this.getMapVisualizerReference = function(){
      var my_supplements = this.document.get("publication_info").mySupplements;
      if(my_supplements != undefined && my_supplements[0]){
        return my_supplements[0].url;
      }
      return "";
  };

};

MapController.Prototype.prototype = PanelController.prototype;
MapController.prototype = new MapController.Prototype();

module.exports = MapController;