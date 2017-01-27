let SVGStorageObject = require('./SVGStorageObject');

/**
 * Returns a html/svg string representation of the given storage object.
 * @author Spedwards
 */
class SVGStorage extends SVGStorageObject {

	/**
	 * @author Spedwards
	 * @param {StructureStorage} storage - StructureStorage object or ID string corrosponding to a StructureStorage object.
	 * @param {Number} [size = 60] - SVG size.
	 */
	constructor(storage, size = 60) {
		super(storage, STRUCTURE_STORAGE);
		this.size = typeof size === 'number' ? size : 60;
		this.string = this.toString();
	}
	
	/**
	 * @author Helam
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = this.size;
			
			const COLOUR = this.player === this.object.owner.username ? `#8FBB93` : `#ED5557`;
			
			const STORAGE = this.object;
			const CAPACITY = STORAGE.storeCapacity;
			const ENERGY = STORAGE.store[RESOURCE_ENERGY];
			const POWER = STORAGE.store[RESOURCE_POWER] || 0;
			const TOTAL = _.sum(STORAGE.store);
			
			const HEIGHT = 120;
			const START_Y = 60;
			
			const ENERGY_HEIGHT = ENERGY * HEIGHT / CAPACITY;
			const POWER_HEIGHT = (POWER + ENERGY) * HEIGHT / CAPACITY;
			const OTHER_HEIGHT = TOTAL * HEIGHT / CAPACITY;
			
			const POWER_Y = START_Y - POWER_HEIGHT;
			const ENERGY_Y = START_Y - ENERGY_HEIGHT;
			const MINERAL_Y = START_Y - OTHER_HEIGHT;
			
			return `<svg height="${SVG_SIZE}" width="${SVG_SIZE * (5/6)}" viewBox="0 0 40 180">` +
				`<g transform="translate(20,90)">` +
				`<path d="M -60 -70 A 120 120 0 0 1 60 -70 A 300 300 0 0 1 60 70 A 120 120 0 0 1 -60 70 A 300 300 0 0 1 -60 -70 Z" fill="#181818" stroke="${COLOUR}" stroke-width="5" />` +
				`<rect fill="#555" height="120" width="100" x="-50" y="-60" />` +
				`<!-- minerals -->` +
				`<rect x="-50" y="${MINERAL_Y}" width="100" height="${OTHER_HEIGHT}" fill="#FFFFFF" />` +
				`<!-- power -->` +
				`<rect x="-50" y="${POWER_Y}" width="100" height="${POWER_HEIGHT}" fill="#F41F33" />` +
				`<!-- energy -->` +
				`<rect x="-50" y="${ENERGY_Y}" width="100" height="${ENERGY_HEIGHT}" fill="#FFE56D" />` +
				`</g>` +
				`</svg>`;
		}
		return this.string;
	}

}

StructureStorage.prototype.display = function(size = 50) {
	console.log(new SVGStorage(this, size));
};

module.exports = SVGStorage;
