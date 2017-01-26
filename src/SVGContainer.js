let SVGStorageObject = require('./SVGStorageObject');

/**
 * Returns a html/svg string representation of the given container object.
 * @author Spedwards
 */
class SVGContainer extends SVGStorageObject {
	
	/**
	 * @author Spedwards
	 * @param {StructureContainer | string} container - StructureContainer object or ID string corrosponding to a StructureContainer object.
	 */
	constructor(container) {
		super(container, STRUCTURE_CONTAINER);
		this.string = this.toString();
	}
	
	/**
	 * @author Spedwards
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = 35;
			
			const CONTAINER = this.object;
			const CAPACITY = CONTAINER.storeCapacity;
			const ENERGY = CONTAINER.store[RESOURCE_ENERGY];
			const POWER = CONTAINER.store[RESOURCE_POWER] || 0;
			const OTHER = _.sum(CONTAINER.store) - ENERGY - POWER;
			
			const HEIGHT = 50;
			const START_Y = 25;
			
			const ENERGY_HEIGHT = ENERGY * HEIGHT / CAPACITY;
			const OTHER_HEIGHT = OTHER * HEIGHT / CAPACITY + ENERGY_HEIGHT;
			const POWER_HEIGHT = POWER * HEIGHT / CAPACITY + OTHER_HEIGHT;
			
			const ENERGY_Y = Math.abs(START_Y - (HEIGHT - ENERGY_HEIGHT));
			const OTHER_Y = START_Y - OTHER_HEIGHT;
			const POWER_Y = START_Y - POWER_HEIGHT;
			
			return `<svg height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 100 100">` +
					`<g transform="translate(50,50)" opacity="1">` +
					`<rect fill="#555555" height="60" stroke-width="10" stroke="#181818" width="50" x="-25" y="-30" />` +
					`<!-- power -->` +
					`<rect fill="#F1243A" height="${POWER_HEIGHT}" y="${POWER_Y}" width="40" x="-20" />` +
					`<!-- minerals -->` +
					`<rect fill="#FFFFFF" height="${OTHER_HEIGHT}" y="${OTHER_Y}" width="40" x="-20" />` +
					`<!-- energy -->` +
					`<rect fill="#FEE476" height="${ENERGY_HEIGHT}" y="${ENERGY_Y}" width="40" x="-20" />` +
					`</g></svg>`;
		}
		return this.string;
	}
	
}

module.exports = SVGContainer;
