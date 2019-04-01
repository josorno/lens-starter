var LensNodes = require("lens/article/nodes");
var ListView = LensNodes["list"].View;
var List = LensNodes["list"].Model;

var CustomListView = function(node, viewFactory) {
	ListView.call(this, node, viewFactory);
};

CustomListView.Prototype = function() {
	// Sobreescribiendo la funcionalidad del método render

	this.render = function() {

    // The next code is for take only the real direct childs of a list
    var i = 0;
    var children = this.node.getNodes();
    var real_items = []
    for(i; i < children.length; i++) {
      var child = this.node.document.get(children[i]);
      if(child.type == "paragraph"){
        real_items.push(child);
      } else if(child.type == "list") {
        real_items.push(child);
        i += child.items.length;
      }
    }

    this.el.innerHTML = "";

    var ltype = (this.node.ordered) ? "OL" : "UL";
    this.content = document.createElement(ltype);
    this.content.classList.add("content");

    i = 0;

    // dispose existing children views if called multiple times
    for (i; i < this.childrenViews.length; i++) {
      this.childrenViews[i].dispose();
    }

    // create children views
    //var children = this.node.getNodes();
    for (i = 0; i < real_items.length; i++) {
      //var child = this.node.document.get(children[i]);
      var child = real_items[i];
      var childView = this.viewFactory.createView(child);

      var listEl;
      if (child instanceof List) {
        listEl = childView.render().el;
      } else {
        listEl = document.createElement("LI");
        listEl.appendChild(childView.render().el);
      }
      this.content.appendChild(listEl);
      this.childrenViews.push(childView);
    }

    this.el.appendChild(this.content);
    return this;
	}; // Aquí termina la definición del método render de CustomListView
}; // Aquí termina la definición del prototipo para CustomListView 

CustomListView.Prototype.prototype = ListView.prototype;
CustomListView.prototype = new CustomListView.Prototype();
CustomListView.prototype.constructor = CustomListView;

module.exports = CustomListView;