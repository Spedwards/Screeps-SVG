let SVG = require('SVG');

/**
 * Returns a html/svg string representation of the given link object.
 * @author Spedwards
 */
class SVGLink extends SVG {
	
	/**
	 * @author Spedwards
	 * @param {StructureLink | string} link - StructureLink object or ID string corrosponding to a StructureLink object.
	 */
	constructor(link) {
		super();
		let object = this.validateConstructor(link, STRUCTURE_LINK);
		if (object === false) throw new Error('Not a Link object!');
		
		this.link = object;
	}
	
	/**
	 * @author Spedwards
	 * @returns {string}
	 */
	toString() {
		const SVG_HEIGHT = 60;
		const SVG_WIDTH = 60;

		const ENERGY_SCALE = 0.6 * this.link.energy / this.link.energyCapacity;

		let outStr = `<svg height="${SVG_HEIGHT}" width="${SVG_WIDTH}" viewBox="0 0 150 150">` +
			`<g opacity="1" transform="translate(50,50)"><g>` +
			`<path d="M 0 -50 L 40 0 L 0 50 L -40 0 Z" fill="#181818" stroke-width="5" />` +
			`<path d="M 0 -50 L 40 0 L 0 50 L -40 0 Z" fill="#555" transform="scale(0.6 0.6)" />`;

		if (this.link.energy > 0) {
			outStr += `<path d="M 0 -50 L 40 0 L 0 50 L -40 0 Z" fill="#ffe56d" transform="scale(${ENERGY_SCALE} ${ENERGY_SCALE})"></path>`
		}

		outStr += `</g></g></svg>`;

		return outStr;
	}
	
}

module.exports = SVGLink;