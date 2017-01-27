let SVGStorageObject = require('./SVGStorageObject');

/**
 * Returns a html/svg string representation of the given container object.
 * @author Spedwards
 */
class SVGContainer extends SVGStorageObject {
	
	/**
	 * @author Spedwards
	 * @param {StructureContainer | string} container - StructureContainer object or ID string corrosponding to a StructureContainer object.
	 * @param {Number} [size = 35] - SVG size.
	 */
	constructor(container, size = 35) {
		super(container, STRUCTURE_CONTAINER);
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
			
			const CONTAINER = this.object;
			const CAPACITY = CONTAINER.storeCapacity;
			const ENERGY = CONTAINER.store[RESOURCE_ENERGY];
			const POWER = CONTAINER.store[RESOURCE_POWER] || 0;
			const TOTAL = _.sum(CONTAINER.store);
			
			const HEIGHT = 50;
			const START_Y = 25;
			
			const ENERGY_HEIGHT = ENERGY * HEIGHT / CAPACITY;
			const OTHER_HEIGHT = TOTAL * HEIGHT / CAPACITY;
			const POWER_HEIGHT = (POWER + ENERGY) * HEIGHT / CAPACITY;
			
			const ENERGY_Y = START_Y - ENERGY_HEIGHT;
			const OTHER_Y = START_Y - OTHER_HEIGHT;
			const POWER_Y = START_Y - POWER_HEIGHT;
			
			return `<svg height="${SVG_SIZE}" width="${SVG_SIZE * (5/6)}" viewBox="0 0 50 80">` +
					`<g transform="translate(25,40)" opacity="1">` +
					`<rect fill="#555555" height="60" stroke-width="10" stroke="#181818" width="50" x="-25" y="-30" />` +
					`<!-- minerals -->` +
					`<rect fill="#FFFFFF" height="${OTHER_HEIGHT}" y="${OTHER_Y}" width="40" x="-20" />` +
					`<!-- power -->` +
					`<rect fill="#F41F33" height="${POWER_HEIGHT}" y="${POWER_Y}" width="40" x="-20" />` +
					`<!-- energy -->` +
					`<rect fill="#FFE56D" height="${ENERGY_HEIGHT}" y="${ENERGY_Y}" width="40" x="-20" />` +
					`</g></svg>`;
		}
		return this.string;
	}
	
}

module.exports = SVGContainer;
