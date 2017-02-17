"use strict";

var LensConverter = require('lens/converter');

var LensArticle = require("lens/article");
var CustomNodeTypes = require("./nodes");

var TerraDigitalisConverter = function(options) {
	LensConverter.call(this, options);
};

TerraDigitalisConverter.Prototype = function() {
 	this.test = function(xmlDoc){
 		var publisherName = xmlDoc.querySelector("publisher-name").textContent;
 		var value = publisherName === "Terra Digitalis";
 		if(value){
 			console.log("TerraDigitalisConverter: ", publisherName);
 		}
 		return value;
 	};

 	this.enhanceCover = function(state, node, element){
 		var category, dispChannel; 		

 		try {
 			dispChannel = element.querySelector("subj-group[subj-group-type=display-channel] subject").textContent;
      		category = element.querySelector("subj-group[subj-group-type=heading] subject").textContent;
    	} catch(err) {
    		dispChannel = null;
      		category = null;
    	}

    	node.breadcrumbs = [
    		{name: "Terra Digitalis", url: "http://localhost/ojs3/index.php/terradigitalis/index", image: "http://132.248.14.88/images_articles/tierraDigitalD7_logo.png"},
 			{name: dispChannel, url: "http://localhost/ojs3/index.php/terradigitalis/index"}   		
    	];

    	if(category)
    		node.breadcrumbs.push({name: category, url: "http://localhost/ojs3/index.php/terradigitalis/index"});

 	};
 	 /*This function extract the supplementary data from xml file
 	  and add it to the publication_info node.*/
 	this.enhancePublicationInfo = function(state){
 		//console.log("state: ", state);
 		var article = state.xmlDoc.querySelector("article");
 		var publicationInfo = state.doc.get('publication_info');
 		//console.log("article: ", article);

 		// Extract supplementary data 
 		/*
 		<supplementary-material id="map-data">
			<object-id pub-id-type="doi">10.7554/eLife.21900.021</object-id>
				<label>Mapa Interactivo</label>
				<caption>
					<title>La regionalización</title>
					<p>
						<bold>DOI:</bold>
						<ext-link ext-link-type="doi" xlink:href="10.7554/eLife.21900.021">http://dx.doi.org/10.7554/eLife.21900.021</ext-link>
					</p>
				</caption>
			<media mime-subtype="php" mimetype="application" xlink:href="http://132.248.14.208/html/visualizador_mapas/terra_digitalis/regionalizacion-michoacan.php"/>
		</supplementary-material>
		*/
		//var mapURI = article.querySelector("sec[sec-type=supplementary-material]");
		var mapURI = article.querySelector("supplementary-material[id=map]");
		var supplements = [];
		if(mapURI){
			//console.log("this is xlink:href of supplementary-material with id map: ", mapURI.getAttribute("xlink:href"));
			supplements.push({
				name: "mapa",
				url: mapURI.getAttribute("xlink:href"),
				type: "mapa"
			});	
		}
		publicationInfo.mySupplements = supplements;
 	};

};

TerraDigitalisConverter.Prototype.prototype = LensConverter.prototype;
TerraDigitalisConverter.prototype = new TerraDigitalisConverter.Prototype();
TerraDigitalisConverter.prototype.constructor = TerraDigitalisConverter;

module.exports = TerraDigitalisConverter;