const _collection = require("lodash/collection");

module.exports = {
	getChildren (sections, section, recursive) {
		let children = _collection.filter(sections, ['parent_section.id', section.id]);
		// If recursive and children were found, get grand-children
		if (recursive && children.length > 0) {
			let that = this;
			_collection.forEach(children, function(child) {
				child.children = that.getChildren(sections, child, true);
			});
		}
		// Return data
		return children;
	},
};