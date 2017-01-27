let SVG = require('./SVG');

/**
 * Returns a html/svg string representation of the given nuker object.
 * @author Enrico
 * @author Spedwards
 */
class SVGNuker extends SVG {

	/**
	 * @author Spedwards
	 * @param {StructureNuker | string} nuker - StructureNuker object or ID string corrosponding to a StructureNuker object.
	 * @param {Number} [size = 60] - SVG size.
	 */
	constructor(nuker, size = 60) {
		super();
		let object = this.validateConstructor(nuker, STRUCTURE_NUKER);
		if (object === false) throw new Error('Not a Nuker object!');

		this.nuker = object;
		this.size = typeof size === 'number' ? size : 60;
		this.string = this.toString();
	}

	/**
	 * @author Enrico
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = this.size;
			
			const BORDER_COLOUR = this.player === this.nuker.owner.username ? `#8FBB93` : `#ED5557`;

			let outStr = `<svg viewBox="0 0 120 180" height="${SVG_SIZE}" width="${SVG_SIZE * (2/3)}">` +
				`<g transform="translate(60,130)">` +
				`<path d="M -60 50 L -53 0 L 0 -130 L 53 0 L 60 50 Z" fill="#181818" stroke="${BORDER_COLOUR}" stroke-width="5"/>` +
				`<path d="M -40 0 L 0 -100 L 40 0 Z" fill="#555"/>` +
				`<rect fill="#555" height="15" width="80" x="-40" y="18"/>`;

			if (this.nuker.ghodium) {
				const GHODIUM_X = -40 * (this.nuker.ghodium / this.nuker.ghodiumCapacity);
				const GHODIUM_WIDTH = 80 * (this.nuker.ghodium / this.nuker.ghodiumCapacity);
				outStr += `<rect fill="#FFFFFF" height="15" y="18" width="${GHODIUM_WIDTH}" x="${GHODIUM_X}"/>`;
			}

			if (this.nuker.energy) {
				const ENERGY_SCALE = this.nuker.energy / this.nuker.energyCapacity;
				outStr += `<path d="M -40 0 L 0 -100 L 40 0 Z" fill="#FFE56D" transform="scale(${ENERGY_SCALE} ${ENERGY_SCALE})"/>`;
			}

			outStr += `</g></svg>`;
			return outStr;
		}
		return this.string;
	}

}

StructureNuker.prototype.display = function(size = 60) {
	console.log(new SVGNuker(this, size));
};

module.exports = SVGNuker;
