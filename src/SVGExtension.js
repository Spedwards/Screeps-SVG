let SVG = require('./SVG');

/**
 * Returns a html/svg string representation of the given extension object.
 * @author Spedwards
 */
class SVGExtension extends SVG {
	
	/**
	 * @author Spedwards
	 * @param {StructureExtension | string} extension - StructureExtension object or ID string corrosponding to a StructureExtension object.
	 */
	constructor(extension) {
		super();
		let object = this.validateConstructor(extension, STRUCTURE_EXTENSION);
		if (object === false) throw new Error('Not an Extension object!');
		
		this.extension = object;
		this.string = this.toString();
	}
	
	/**
	 * @author Spedwards
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = 50;
			
			const BORDER_COLOUR = this.player === this.extension.owner.username ? `#8FBB93` : `#ED5557`;
			
			let outStr = `<svg height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 100 100">` +
					`<g transform="translate(50,50)">` +
					`<g>` +
					`<ellipse rx="${this.getSize()}" ry="${this.getSize()}" cx="0" cy="0" fill="#181818" stroke="${BORDER_COLOUR}" stroke-width="5" />`;
			
			if (this.extension.energy > 0) {
				const ENERGY_RADIUS = 0.7 * this.getSize() * Math.min(this.extension.energy / this.extension.energyCapacity, 1);
				outStr += `<ellipse cx="0" cy="0" fill="#FFE56D" rx="${ENERGY_RADIUS}" ry="${ENERGY_RADIUS}" />`
			}
			
			outStr += `</g></g></svg>`;
			
			return outStr;
		}
		return this.string;
	}
	
	/**
	 * @author Spedwards
	 * @returns {Number}
	 */
	getSize() {
		switch(this.extension.room.controller.level) {
			case 8:
				return 50;
			case 7:
				return 40;
			default:
				return 34;
		}
	}
	
}

module.exports = SVGExtension;
