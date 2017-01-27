let SVG = require('./SVG');
let SVGMineral = require('./SVGMineral');

/**
 * Returns a html/svg string representation of the given extractor object.
 * @author Spedwards
 */
class SVGExtractor extends SVG {
	
	/**
	 * @author Spedwards
	 * @param {StructureExtractor | string} extractor - StructureExtractor object or ID string corrosponding to a StructureExtractor object.
	 * @param {Mineral | string} [mineral] - Mineral object, mineral type, or ID string corrosponding to a Mineral object. Optional, will display none if undefined.
	 * @param {Number} [size = 50] - SVG size.
	 */
	constructor(extractor, mineral, size = 50) {
		super();
		let object = this.validateConstructor(extractor, STRUCTURE_EXTRACTOR);
		if (object === false) throw new Error('Not an Extractor object!');
		
		this.extractor = object;
		if (mineral) {
			this.mineral = new SVGMineral(mineral);
		}
		this.size = typeof size === 'number' ? size : 50;
		this.string = this.toString();
	}
	
	/**
	 * @author Spedwards
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = this.size;
			
			const COLOUR = this.player === this.extractor.owner.username ? `#8FBB93` : `#ED5557`;
			
			let outStr = `<svg height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 200 200">` +
					`<g transform="translate(100,100)">`;
			
			if (this.mineral) {
				outStr += this.mineral.string;
			}
			
			outStr += `<path d="M 80 0 A 80 80 0 0 1 40 69.28 M  -40 69.28 A 80 80 0 0 1 -80 0 M -40 -69.28 A 80 80 0 0 1 40 -69.28" fill-opacity="0" stroke="${COLOUR}" stroke-width="20">` +
					`<animateTransform attributeName="transform" attributeType="XML" dur="4s" from="0 0 0" to="360 0 0" repeatCount="indefinite" type="rotate" calcMode="linear" />` +
					`</path></g></svg>`;
			
			return outStr;
		}
		return this.string;
	}
	
}

StructureExtractor.prototype.display = function(size = 50) {
	let [mineral] = this.room.find(FIND_MINERALS);
	console.log(new SVGExtractor(this, mineral, size));
};

module.exports = SVGExtractor;
