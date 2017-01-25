let SVGStorageObject = require('./SVGStorageObject');

/**
 * Returns a html/svg string representation of the given storage object.
 * @author Spedwards
 */
class SVGStorage extends SVGStorageObject {

	/**
	 * @author Spedwards
	 * @param {StructureStorage} storage - StructureStorage object or ID string corrosponding to a StructureStorage object.
	 */
	constructor(storage) {
		super(storage, STRUCTURE_STORAGE);
		this.string = this.toString();
	}
	
	/**
	 * @author Helam
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const STORAGE = this.object;
			const CAPACITY = STORAGE.storeCapacity;
			const ENERGY = STORAGE.store[RESOURCE_ENERGY];
			const POWER = STORAGE.store[RESOURCE_POWER] || 0;
			const OTHER = _.sum(STORAGE.store) - ENERGY - POWER;
			
			const HEIGHT = 28;
			const START_Y = 18;
			
			const ENERGY_HEIGHT = HEIGHT * (ENERGY / CAPACITY);
			const OTHER_HEIGHT = HEIGHT * (OTHER / CAPACITY) + ENERGY_HEIGHT;
			const POWER_HEIGHT = HEIGHT * (POWER / CAPACITY) + OTHER_HEIGHT;
			
			const POWER_Y = START_Y + (HEIGHT - POWER_HEIGHT);
			const MINERAL_Y = START_Y + (HEIGHT - OTHER_HEIGHT);
			const ENERGY_Y = START_Y + (HEIGHT - ENERGY_HEIGHT);
			
			return `<svg width="50" height="60">` +
					`<path style="stroke-width: 1;stroke:#90BA94" d='M16 48 C18 52 38 52 40 48 C42 46 42 18 40 16 C38 12 18 12 16 16 C14 18 14 46 16 48' />` +
					`<path style="fill:#555555" d='M18 46 L38 46 L38 18 L18 18' />` +
					`<!-- power -->` +
					`<rect x="18" y="${POWER_Y}" width="20" height="${POWER_HEIGHT}" style="fill:#F1243A" />` +
					`<!-- minerals -->` +
					`<rect x="18" y="${MINERAL_Y}" width="20" height="${OTHER_HEIGHT}" style="fill:#FFFFFF" />` +
					`<!-- energy -->` +
					`<rect x="18" y="${ENERGY_Y}" width="20" height="${ENERGY_HEIGHT}" style="fill:#FEE476" />` +
					`</svg>`;
		}
		return this.string;
	}

}

module.exports = SVGStorage;
