'use strict';

/**
 * Parent to all SVG classes.
 * Contains methods available to all SVG classes.
 * @author Spedwards
 */
class SVG$1 {
	
	/**
	 * @return {string}
	 */
	static get CREEP() {
		return 'creep';
	}
	
	/**
	 * @return {string}
	 */
	static get ROOM() {
		return 'room';
	}
	
	/**
	 * @return {string}
	 */
	static get SOURCE() {
		return 'source';
	}
	
	/**
	 * Validate the parameter type is correct.
	 * @param {*} object - The object to check against.
	 * @param {string} expectedType - SVG.CREEP, SVG.ROOM, SVG.SOURCE, or on of the STRUCTURE_* constants.
	 * @returns {Boolean | Room | RoomObject} False if not expected type, else the RoomObject or Room.
	 */
	validateConstructor(object, expectedType) {
		if (expectedType === SVG$1.ROOM) {
			let room = object;
			if (typeof object === 'string') {
				room = Game.rooms[object];
			}
			
			if (room instanceof Room) {
				return room;
			}
			return false;
		} else if (expectedType === SVG$1.CREEP) {
			let creep = object;
			if (typeof object === 'string') {
				creep = Game.creeps[object];
			}
			
			if (!(creep instanceof Creep)) {
				creep = this.id(object);
			}
			
			if (creep instanceof Creep) {
				return creep;
			}
			return false;
		} else if (expectedType === SVG$1.SOURCE) {
			let source = object;
			if (typeof object === 'string') {
				source = this.id(object);
			}
			
			if (source instanceof Source) {
				return source;
			}
			return false;
		} else {
			let structure = object;
			if (typeof object === 'string') {
				structure = this.id(object);
			}
			
			if (!(structure instanceof Structure)) return false;
			
			if (structure.structureType === expectedType) {
				return structure;
			}
			return false;
		}
	}
	
	id(string) {
		return Game.getObjectById(string);
	}
	
}

var SVG_1 = SVG$1;

let SVG$2 = SVG_1;

/**
 * Takes a resource type constant as input and
 * returns the html/svg string for the icon of
 * that resource upon calling `.toString()`
 * @author Helam
 * @author Spedwards
 */
class SVGMineral$1 extends SVG$2 {

	/**
	 * @author Spedwards
	 * @param {string} resourceType
	 * @param {Number | Boolean} [amount = 0] - 0 by default, pass false to hide it
	 */
	constructor(resourceType, amount = 0) {
		super();
		if (typeof resourceType !== 'string') throw new Error('Resource is not a String!');
		if (!Number.isInteger(amount)) throw new Error('Amount is not an Integer!');

		this.resourceType = resourceType;
		this.amount = amount;
		this.string = this.toString();
	}

	/**
	 * @author Helam
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			let length = Math.max(1, Math.ceil(Math.log10(this.amount + 1)));
			let amountWidth = length * 10 + 5;

			if (this.amount === false) {
				amountWidth = 0;
			}

			let textDisplacement = 14;
			let finalWidth = 14 + amountWidth;

			let outStr = `<svg width="!!" height="14">`;

			if (this.resourceType === RESOURCE_ENERGY) {
				outStr += `<circle cx="7" cy="7" r="5" style="fill:#FEE476"/>`;
			} else if (this.resourceType === RESOURCE_POWER) {
				outStr += `<circle cx="7" cy="7" r="5" style="fill:#F1243A"/>`;
			} else {
				const BASE_MINERALS = {
					[undefined]: {back: `#fff`, front: `#000`},
					[RESOURCE_HYDROGEN]: {back: `#4B4B4B`, front: `#989898`},
					[RESOURCE_OXYGEN]: {back: `#4B4B4B`, front: `#989898`},
					[RESOURCE_UTRIUM]: {back: `#0A5D7C`, front: `#48C5E5`},
					[RESOURCE_LEMERGIUM]: {back: `#265C42`, front: `#24D490`},
					[RESOURCE_KEANIUM]: {back: `#371A80`, front: `#9269EC`},
					[RESOURCE_ZYNTHIUM]: {back: `#58482D`, front: `#D9B478`},
					[RESOURCE_CATALYST]: {back: `#572122`, front: `#F26D6F`},
				};

				const COMPOUNDS = {
					U: {back: `#58D7F7`, front: `#157694`},
					L: {back: `#29F4A5`, front: `#22815A`},
					K: {back: `#9F76FC`, front: `#482794`},
					Z: {back: `#FCD28D`, front: `#7F6944`},
					G: {back: `#FFFFFF`, front: `#767676`},
					O: {back: `#99ccff`, front: `#000066`},
					H: {back: `#99ccff`, front: `#000066`},
				};

				let colours = BASE_MINERALS[this.resourceType];

				if (colours) {
					outStr += `<circle cx="7" cy="7" r="5" style="stroke-width:1;stroke:${colours.front};fill:${colours.back}"/>` +
						`<text x="7" y="8" font-family="Verdana" font-size="8" alignment-baseline="middle" text-anchor="middle" style="fill:${colours.front};font-weight:bold;">${this.resourceType === undefined ? '?' : this.resourceType}</text>`;
				} else {
					let compoundType = ['U', 'L', 'K', 'Z', 'G', 'H', 'O'].find(type => resourceType.indexOf(type) !== -1);
					colours = COMPOUNDS[compoundType];
					if (colours) {
						let width = this.resourceType.length * 9;
						finalWidth += width;
						textDisplacement += width;
						outStr += `<rect x="0" y="0" width="${width}" height="14" style="fill:${colours.back}"/>` +
							`<text x="${width / 2.0}" y="8" font-family="Verdana" font-size="8" alignment-baseline="middle" text-anchor="middle" style="fill:${colours.front};font-weight:bold;">${this.resourceType}</text>`;
					} else {
						throw new Error(`Invalid resource type ${this.resourceType} in SVGMineral!`);
					}
				}
			}

			if (this.amount !== false) {
				outStr += `<text font-family="Verdana" font-size="10" x="${textDisplacement + amountWidth/2}" y="8" alignment-baseline="middle" text-anchor="middle" style="fill:white"> x ${this.amount.toLocaleString()}</text>`;
			}
			outStr += `</svg>`;

			outStr = outStr.split('!!').join(finalWidth);

			return outStr;
		}
		return this.string;
	}

}

var SVGMineral_1 = SVGMineral$1;

let SVG = SVG_1;
let SVGMineral = SVGMineral_1;

/**
 * Acts as the parent to SVGStorage and SVGTerminal.
 * @author Helam
 * @author Enrico
 * @author Spedwards
 */
class SVGStorageObject$1 extends SVG {

	/**
	 * @author Spedwards
	 * @param {StructureStorage | StructureContainer | StructureTerminal} object - Either a StructureStorage, StructureContainer or StructureTerminal object, or an ID string corrosponding to one.
	 */
	constructor(object, expectedType) {
		super();
		let structure = this.validateConstructor(object, expectedType);
		if (structure === false) throw new Error('Not a Structure object!');

		this.object = structure;
		this.contents = this.getContents();
	}
	
	/**
	 * Outputs the contents of any StructureStorage, StructureContainer or StructureTerminal
	 * object as a html/svg string.
	 * @author Helam
	 * @author Enrico
	 * @returns {string}
	 */
	getContents() {
		if (!this.contents) {
			let outStr = '';
			
			Object.keys(this.object.store).forEach(type => {
				outStr += (new SVGMineral(type, this.object.store[type])).toString();
				outStr += '\n';
			});
			return outStr;
		}
		return this.contents;
	}

}

var SVGStorageObject_1 = SVGStorageObject$1;

let SVGStorageObject = SVGStorageObject_1;

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
			const POWER_HEIGHT = POWER * HEIGHT / CAPACITY;
			const OTHER_HEIGHT = OTHER * HEIGHT / CAPACITY;
			
			const ENERGY_Y = START_Y - ENERGY_HEIGHT;
			const OTHER_Y = START_Y - OTHER_HEIGHT;
			const POWER_Y = START_Y - POWER_HEIGHT;
			
			return `<svg height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 100 100">` +
					`<g transform="translate(50,50)" opacity="1">` +
					`<rect fill="#555555" height="60" stroke-width="10" stroke="#181818" width="50" x="-25" y="-30" />` +
					`<!-- minerals -->` +
					`<rect fill="#FFFFFF" height="${OTHER_HEIGHT}" y="${OTHER_Y}" width="40" x="-20" />` +
					`<!-- power -->` +
					`<rect fill="#F1243A" height="${POWER_HEIGHT}" y="${POWER_Y}" width="40" x="-20" />` +
					`<!-- energy -->` +
					`<rect fill="#FEE476" height="${ENERGY_HEIGHT}" y="${ENERGY_Y}" width="40" x="-20" />` +
					`</g></svg>`;
		}
		return this.string;
	}
	
}

var SVGContainer_1 = SVGContainer;

let SVG$3 = SVG_1;

/**
 * Returns a html/svg string representation of the given creep object.
 * @author Helam
 * @author Spedwards
 */
class SVGCreep extends SVG$3 {

	/**
	 * @author Spedwards
	 * @param {Creep | string} creep - Creep object, Name string, or ID string corrosponding to Creep object.
	 */
	constructor(creep) {
		super();
		let object = this.validateConstructor(creep, SVG$3.CREEP);
		if (object === false) throw new Error('Not a Creep object!');

		this.creep = object;
		this.string = this.toString();
	}

	/**
	 * @author Helam
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const creep = this.creep;

			const PART_COLOURS = {
				[CARRY]: undefined,
				[MOVE]: "#A9B7C6",
				[WORK]: "#FFE56D",
				[CLAIM]: "#B99CFB",
				[ATTACK]: "#F93842",
				[RANGED_ATTACK]: "#5D80B2",
				[HEAL]: "#65FD62",
				[TOUGH]: "#858585",
			};

			const BORDER_COLOUR = "#202020";
			const INTERNAL_COLOUR = "#555555";

			const BORDER_WIDTH = 8;
			const CENTER_X = 25;
			const CENTER_Y = 25;
			const RADIUS = 15;

			const TOUGH_EXTRA_RADIUS = 8;

			function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
				let angleInRadians = (angleInDegrees - 90) * Math.PI / 180;

				return {
					x: centerX + (radius * Math.cos(angleInRadians)),
					y: centerY + (radius * Math.sin(angleInRadians)),
				};
			}

			function describeArc(x, y, radius, startAngle, endAngle) {
				let start = polarToCartesian(x, y, radius, endAngle);
				let end = polarToCartesian(x, y, radius, startAngle);

				let largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

				return [
					'M', start.x, start.y,
					'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
				].join(' ');
			}

			function partsArc(partType, partCount, prevPartCount) {
				if (partType === CARRY) {
					return ``;
				}

				let centerAngle = partType === MOVE ? 180 : 0;

				let arcLength = ((prevPartCount + partCount) / 50) * 360;
				let startAngle = centerAngle - arcLength / 2;
				let endAngle = centerAngle + arcLength / 2;
				return `<path d="${describeArc(CENTER_X, CENTER_Y, RADIUS, startAngle, endAngle)}" fill="none" stroke="${PART_COLOURS[partType]}" stroke-width="${BORDER_WIDTH}" />`;
			}

			let parts = _.map(creep.body, b => b.type);
			let partCounts = _.countBy(parts);

			let outStr = `<svg width="50" height="50">`;

			const TOUGH_OPACITY = (partCounts[TOUGH] || 0) / 50;
			outStr += `<circle cx="${CENTER_X}" cy="${CENTER_Y}" r="${RADIUS + TOUGH_EXTRA_RADIUS}" fill="${INTERNAL_COLOUR}" fill-opacity="${TOUGH_OPACITY}" stroke="${BORDER_COLOUR}" stroke-width="${BORDER_WIDTH}" />`;

			let arcs = [];

			const PRIO = {
				[CARRY]: 0,
				[MOVE]: 0,
				[WORK]: 1,
				[CLAIM]: 5,
				[ATTACK]: 2,
				[RANGED_ATTACK]: 3,
				[HEAL]: 4,
				[TOUGH]: 0,
			};

			let keys = Object.keys(partCounts).sort((a, b) => partCounts[b] - partCounts[a] || PRIO[b] - PRIO[a]);
			keys.reverse().reduce((partsTotal, type) => {
				if (type !== TOUGH) {
					if (type === MOVE) {
						arcs.push(partsArc(type, partCounts[type], 0));
						return partsTotal;
					} else {
						arcs.push(partsArc(type, partCounts[type], partsTotal));
						partsTotal += partCounts[type];
					}
				}
				return partsTotal;
			}, 0);

			arcs.reverse().forEach(arc => outStr += arc);

			outStr += `</svg>`;
			return outStr;
		}
		return this.string;
	}

}

var SVGCreep_1 = SVGCreep;

let SVG$4 = SVG_1;

/**
 * Returns a html/svg string representation of the given lab object.
 * @author Enrico
 * @author Spedwards
 */
class SVGLab extends SVG$4 {

	/**
	 * @author Spedwards
	 * @param {StructureLab | string} lab - StructureLab object or ID string corrosponding to StructureLab object.
	 * @param {Boolean} coloured
	 */
	constructor(lab, coloured = true) {
		super();
		let object = this.validateConstructor(lab, STRUCTURE_LAB);
		if (object === false) throw new Error('Not a Lab object!');

		this.lab = object;
		this.coloured = coloured;
		this.string = this.toString();
	}

	/**
	 * @author Enrico
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = 50;

			let outStr = `<svg viewBox="0 0 120 120" height="${SVG_SIZE}" width="${SVG_SIZE}">` +
				`<g transform="translate(60,55)">` +
				`<path class="border" d="M 50 40 A 60 60 0 1 0 -50 40 V 63 H 50 Z" fill="#181818" stroke-width="5"/>` +
				`<path d="M 36 33 A 46 43 0 1 0 -36 33 Z" fill="#555"/>`;

			if (this.lab.mineralType) {
				let MINERAL_COLOUR = '#FFFFFF';

				if (this.coloured && this.lab.mineralType.indexOf('G') === -1) {
					if (['H', 'O'].includes(this.lab.mineralType)) {
						MINERAL_COLOUR = '#989898';
					} else if (['UL', 'ZK', 'OH'].includes(this.lab.mineralType)) {
						MINERAL_COLOUR = '#B4B4B4';
					} else {
						const BASE_COLOURS = {
							[RESOURCE_UTRIUM]: '#48C5E5',
							[RESOURCE_LEMERGIUM]: '#24D490',
							[RESOURCE_KEANIUM]: '#9269EC',
							[RESOURCE_ZYNTHIUM]: '#D9B478',
						};
						let containedMineral = _(Object.keys(BASE_COLOURS)).find(c => this.lab.mineralType.indexOf(c) !== -1);
						if (containedMineral) {
							MINERAL_COLOUR = BASE_COLOURS[containedMineral];
						}
					}
				}

				const MINERAL_TRANSFORM = this.lab.mineralAmount / this.lab.mineralCapacity;
				outStr += `<path d="M 36 33 A 46 43 0 1 0 -36 33 Z" fill="${MINERAL_COLOUR}" transform="matrix(${MINERAL_TRANSFORM},0,0,${MINERAL_TRANSFORM},0,${33*(1-MINERAL_TRANSFORM)})"/>`;
			}

			if (this.lab.energy) {
				const ENERGY_WIDTH = 72 * (this.lab.energy / this.lab.energyCapacity);
				const ENERGY_X = -36 * (this.lab.energy / this.lab.energyCapacity);
				outStr += `<rect fill="#ffe56d" height="10" y="43" width="${ENERGY_WIDTH}" x="${ENERGY_X}"/>`;
			}

			outStr += `</g></svg>`;
			return outStr;
		}
		return this.string;
	}

}

var SVGLab_1 = SVGLab;

let SVG$5 = SVG_1;

/**
 * Returns a html/svg string representation of the given link object.
 * @author Spedwards
 */
class SVGLink extends SVG$5 {

	/**
	 * @author Spedwards
	 * @param {StructureLink | string} link - StructureLink object or ID string corrosponding to a StructureLink object.
	 */
	constructor(link) {
		super();
		let object = this.validateConstructor(link, STRUCTURE_LINK);
		if (object === false) throw new Error('Not a Link object!');

		this.link = object;
		this.string = this.toString();
	}

	/**
	 * @author Spedwards
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = 50;

			const ENERGY_SCALE = 0.6 * this.link.energy / this.link.energyCapacity;

			let outStr = `<svg class="link owner" height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 150 150">` +
				`<g opacity="1" transform="translate(50,50)"><g>` +
				`<path class="border" d="M 0 -50 L 40 0 L 0 50 L -40 0 Z" fill="#181818" stroke-width="5" />` +
				`<path d="M 0 -50 L 40 0 L 0 50 L -40 0 Z" fill="#555" transform="scale(0.6 0.6)" />`;

			if (this.link.energy > 0) {
				outStr += `<path d="M 0 -50 L 40 0 L 0 50 L -40 0 Z" fill="#ffe56d" transform="scale(${ENERGY_SCALE} ${ENERGY_SCALE})"></path>`;
			}

			outStr += `</g></g></svg>`;

			return outStr;
		}
		return this.string;
	}

}

var SVGLink_1 = SVGLink;

let SVG$6 = SVG_1;

/**
 * Returns a html/svg string representation of the given nuker object.
 * @author Enrico
 * @author Spedwards
 */
class SVGNuker extends SVG$6 {

	/**
	 * @author Spedwards
	 * @param {StructureNuker | string} nuker - StructureNuker object or ID string corrosponding to a StructureNuker object.
	 */
	constructor(nuker) {
		super();
		let object = this.validateConstructor(nuker, STRUCTURE_NUKER);
		if (object === false) throw new Error('Not a Nuker object!');

		this.nuker = object;
		this.string = this.toString();
	}

	/**
	 * @author Enrico
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_HEIGHT = 60;
			const SVG_WIDTH = 40;

			let outStr = `<svg viewBox="0 0 120 180" height="${SVG_HEIGHT}" width="${SVG_WIDTH}">` +
				`<g transform="translate(60,130)">` +
				`<path d="M -60 50 L -53 0 L 0 -130 L 53 0 L 60 50 Z" fill="#181818" stroke-width="5"/>` +
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

var SVGNuker_1 = SVGNuker;

let SVGStorageObject$2 = SVGStorageObject_1;

/**
 * Returns a html/svg string representation of the given storage object.
 * @author Spedwards
 */
class SVGStorage$1 extends SVGStorageObject$2 {

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

var SVGStorage_1 = SVGStorage$1;

let SVGStorageObject$3 = SVGStorageObject_1;

/**
 * Returns a html/svg string representation of the given terminal object.
 * @author Spedwards
 */
class SVGTerminal$1 extends SVGStorageObject$3 {

	/**
	 * @author Spedwards
	 * @param {StructureTerminal} terminal - StructureTerminal object or ID string corrosponding to a StructureTerminal object.
	 */
	constructor(terminal) {
		super(terminal, STRUCTURE_TERMINAL);
		this.string = this.toString();
	}
	
	/**
	 * @author Helam
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const TERMINAL = this.object;
			const CAPACITY = TERMINAL.storeCapacity;
			const ENERGY = TERMINAL.store[RESOURCE_ENERGY];
			const POWER = TERMINAL.store[RESOURCE_POWER] || 0;
			const OTHER = _.sum(TERMINAL.store) - ENERGY - POWER;
			
			const RADIUS = 6;
			
			const START_X = 22;
			const START_Y = 26;
			
			const ENERGY_RADIUS = RADIUS * (ENERGY / CAPACITY);
			const OTHER_RADIUS = RADIUS * (OTHER / CAPACITY) + ENERGY_RADIUS;
			const POWER_RADIUS = RADIUS * (POWER / CAPACITY) + OTHER_RADIUS;
			
			const POWER_X = START_X + (RADIUS - POWER_RADIUS);
			const OTHER_X = START_X + (RADIUS - OTHER_RADIUS);
			const ENERGY_X = START_X + (RADIUS - ENERGY_RADIUS);
			
			const POWER_Y = START_Y + (RADIUS - POWER_RADIUS);
			const OTHER_Y = START_Y + (RADIUS - OTHER_RADIUS);
			const ENERGY_Y = START_Y + (RADIUS - ENERGY_RADIUS);
			
			return `<svg width="50" height="60" style="transform:scale(1.2,1.2)">` +
					`<path vector-effect="non-scaling-stroke" style="stroke:#90BA94" d='M36 40 L42 32 L36 24 L28 18 L20 24 L14 32 L20 40 L28 46 Z' />` +
					`<path vector-effect="non-scaling-stroke" style="fill:#AAAAAA" d='M34 38 L38 32 L34 26 L28 22 L22 26 L18 32 L22 38 L28 42 Z' />` +
					`<path vector-effect="non-scaling-stroke" style="stroke-width:2;stroke:black;fill:#555555" d='M34 38 L34 32 L34 26 L28 26 L22 26 L22 32 L22 38 L28 38 Z' />` +
					`<!-- power -->` +
					`<rect x="${POWER_X}" y="${POWER_Y}" width="${POWER_RADIUS * 2}" height="${POWER_RADIUS * 2}" style="fill:#F1243A" />` +
					`<!-- mineral -->` +
					`<rect x="${OTHER_X}" y="${OTHER_Y}" width="${OTHER_RADIUS * 2}" height="${OTHER_RADIUS * 2}" style="fill:#FFFFFF" />` +
					`<!-- energy -->` +
					`<rect x="${ENERGY_X}" y="${ENERGY_Y}" width="${ENERGY_RADIUS * 2}" height="${ENERGY_RADIUS * 2}" style="fill:#FEE476" />` +
					`</svg>`;
		}
		return this.string;
	}

}

var SVGTerminal_1 = SVGTerminal$1;

let SVG$7 = SVG_1;
let SVGStorage = SVGStorage_1;
let SVGTerminal = SVGTerminal_1;

/**
 * Takes a room and outputs the html/svg string for the storage and terminal of that room.
 * @author Helam
 * @author Dragnar
 * @author Spedwards
 */
class SVGRoom extends SVG$7 {

	/**
	 * @author Spedwards
	 * @param {Room | string} roomArg - Room object or valid room name.
	 */
	constructor(roomArg) {
		super();
		let object = this.validateConstructor(roomArg, SVG$7.ROOM);
		if (object === false) throw new Error('Not a Room object!');

		this.room = object;
		this.string = this.toString();
	}

	/**
	 * @author Helam
	 * @author Dragnar
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			let storage = this.room.storage;
			let storageSVG;
			let terminal = this.room.terminal;
			let terminalSVG;

			let outStr = ``;

			outStr += `<style id="dropdownStyle">` +
				`.dropbtn {` +
				`background-color: #4CAF50;` +
				`color: white;` +
				`padding: 16px;` +
				`font-size: 16px;` +
				`border: none;` +
				`cursor: pointer;` +
				`}` +

				`.dropdown {` +
				`position: relative;` +
				`display: inline-block;` +
				`}` +

				`.dropdown-content {` +
				`display: none;` +
				`z-index: 1;` +
				`padding: 5px;` +
				`border-radius: 6px;` +
				`text-align: center;` +
				`position: absolute;` +
				`background-color: #f9f9f9;` +
				`min-width: 200px;` +
				`box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);` +
				`}` +

				`.dropdown-content a {` +
				`color: black;` +
				//`padding: 12px 16px;` +
				`text-decoration: none;` +
				`display: block;` +
				`}` +

				`.dropdown-content a:hover {background-color: #f1f1f1}` +

				`.dropdown:hover .dropdown-content {` +
				`display: block;` +
				`}` +

				`.dropdown:hover .dropbtn {` +
				`background-color: #3e8e41;` +
				`}` +
				`</style>` +


				`<style id="tooltipStyle">` +
				`.tool {` +
				`position: relative;` +
				`display: inline-block;` +
				`}` +
				`.tool .tip {` +
				`visibility: hidden;` +
				`width: 300px;` +
				`background-color: #111111` +//2c2c2c;`;
				`color: #000;` + //fff`;
				`text-align: center;` +
				`border-radius: 6px;` +
				`padding: 5px 0;` +
				`position: absolute;` +
				`z-index: 1;` +
				`opacity: 0;` +
				`transition: opacity 1s;` +
				`}` +
				`.tool .tipRight {` +
				`top: -5px;` +
				`left: 101%;` +
				`}` +
				`.tool:hover .tip {` +
				`visibility: visible;` +
				`opacity: 0.9;` +
				`}` +
				`.tool table {` +
				`text-align: left;` +
				`margin-left: 5px;` +
				`}` +
				`</style>` +

				`<span class="tool">` +
				`<span style="background-color:#000" class="tip">`;

			if (storage) {
				storageSVG = new SVGStorage(storage);
				outStr += storageSVG.getContents();
			} else {
				outStr += `No Storage Built`;
			}
			outStr += `</span>`;
			if (storage) {
				outStr += storageSVG.toString();
			} else {
				outStr += `<svg width="50" height="60">` +
						`<path style="stroke-width: 1;stroke:#90BA94" d='M16 48 C18 52 38 52 40 48 C42 46 42 18 40 16 C38 12 18 12 16 16 C14 18 14 46 16 48' />` +
						`<path style="fill:#555555" d='M18 46 L38 46 L38 18 L18 18' />` +
						`<path style="fill:red" d='M44 18 L42 16 L28 30 L14 16 L12 18 L26 32 L12 46 L14 48 L28 34 L42 48 L44 46 L30 32 Z' />` +
						`</svg>`;
			}
			outStr += `</span>` +

				`<span class="tool">` +
				`<span style="background-color:#000" class="tip">`;

			if (terminal) {
				terminalSVG = new SVGTerminal(terminal);
				outStr += terminalSVG.getContents();
			} else {
				outStr += `No Terminal Built`;
			}
			outStr += `</span>`;

			if (terminal) {
				outStr += terminalSVG.toString();
			} else {
				outStr += `<svg width="50" height="60" style="transform:scale(1.2,1.2)">` +
						`<path vector-effect="non-scaling-stroke" style="stroke:#90BA94" d='M36 40 L42 32 L36 24 L28 18 L20 24 L14 32 L20 40 L28 46 Z' />` +
						`<path vector-effect="non-scaling-stroke" style="fill:#AAAAAA" d='M34 38 L38 32 L34 26 L28 22 L22 26 L18 32 L22 38 L28 42 Z' />` +
						`<path vector-effect="non-scaling-stroke" style="stroke-width:2;stroke:black;fill:#555555" d='M34 38 L34 32 L34 26 L28 26 L22 26 L22 32 L22 38 L28 38 Z' />` +
						`<path style="fill:red" d='M44 18 L42 16 L28 30 L14 16 L12 18 L26 32 L12 46 L14 48 L28 34 L42 48 L44 46 L30 32 Z' />` +
						`</svg>`;
			}
			
			outStr += `</span>`;

			return outStr;
		}
		return this.string;
	}

}

var SVGRoom_1 = SVGRoom;

let SVG$8 = SVG_1;

/**
 * Returns a html/svg string representation of the given source object.
 * @author Spedwards
 */
class SVGSource extends SVG$8 {

	/**
	 * @author Spedwards
	 * @param {Source | string} source - Source object or ID string corrosponding to a Source object.
	 */
	constructor(source) {
		super();
		let object = this.validateConstructor(source, SVG$8.SOURCE);
		if (object === false) throw new Error('Not a Source object!');

		this.source = object;
		this.string = this.toString();
	}

	/**
	 * @author Spedwards
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = 40;

			const SOURCE_HEIGHT = this.source.energy / this.source.energyCapacity * 60;
			const SOURCE_POS = (SVG_SIZE / 2) - (SOURCE_HEIGHT / 2);

			return `<svg  class="source" height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 100 100">` +
				`<g transform="translate(25, 25)">` +
				`<rect fill="#111111" height="40" rx="15" ry="15" stroke-width="15" stroke="#595026" width="40">` +
				`<animate app-attr="calcMode#Source.displayOptions.animations ? 'linear' : 'discrete'" attributeName="stroke" dur="4s" repeatCount="indefinite" values="#595026; #0e0c04; #595026" calcMode="linear"></animate>` +
				`</rect>` +
				`<rect fill="#FFE56D" height="${SOURCE_HEIGHT}" width="${SOURCE_HEIGHT}" rx="15" ry="15" x="${SOURCE_POS}" y="${SOURCE_POS}">` +
				`<animate app-attr="calcMode#Source.displayOptions.animations ? 'linear' : 'discrete'" attributeName="fill" dur="2s" repeatCount="indefinite" values="#ffe56d; #fff; #ffcd6d; #ffde84; #ffe56d" calcMode="linear"></animate>` +
				`</rect>` +
				`</g>` +
				`</svg>`;
		}
		return this.string;
	}

}

var SVGSource_1 = SVGSource;

var SVGSpawn_1 = {

};

let SVG$10 = SVG_1;

/**
 * Returns a html/svg string representation of the given tower object.
 * @author Spedwards
 */
class SVGTower extends SVG$10 {

	/**
	 * @author Spedwards
	 * @param {StructureTower | string} tower - StructureTower object or ID string corrosponding to a StructureTower object.
	 * @param {Number} [angle = 315] - The angle at which the tower will point.
	 */
	constructor(tower, angle = 315) {
		super();
		let object = this.validateConstructor(tower, STRUCTURE_TOWER);
		if (object === false) throw new Error('Not a Tower object!');

		this.tower = object;
		this.radians = angle * (Math.PI / 180);
		this.string = this.toString();
	}

	/**
	 * @author Spedwards
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = 60;

			const RADIANS = this.radians;

			const BARREL_X = -20;
			const BARREL_Y = -80;

			const TANK_X = -39;
			const TANK_Y = -25;

			const ENERGY_HEIGHT = 58 * this.tower.energy / this.tower.energyCapacity;

			let outStr = `<svg class="tower owner" height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 300 300">` +
				`<g transform="translate(75,75)" opacity="1">` +
				`<ellipse class="border" cx="0" cy="0" fill="#222" rx="65" ry="65" stroke-width="5"></ellipse>` +
				`<g class="rotatable" style="transform: rotate(${RADIANS}rad); transition: transform 2s;">` +
				`<rect fill="#aaa" height="50" stroke-width="7" stroke="#181818" width="40" x="${BARREL_X}" y="${BARREL_Y}"></rect>` +
				`<rect fill="#555" height="58" rx="12" ry="10" width="78" x="${TANK_X}" y="${TANK_Y}"></rect>`;

			if (this.tower.energy > 0) {
				// ENERGY
				outStr += `<rect fill="#ffe56d" height="${ENERGY_HEIGHT}" y="${33 - ENERGY_HEIGHT}" rx="12" ry="12" width="78" x="${TANK_X}"></rect>`;
			}

			outStr += `</g></g></svg>`;

			return outStr;
		}
		return this.string;
	}

}

var SVGTower_1 = SVGTower;

var index = {
	Container: SVGContainer_1,
	Creep: SVGCreep_1,
	Lab: SVGLab_1,
	Link: SVGLink_1,
	Mineral: SVGMineral_1,
	Nuker: SVGNuker_1,
	Room: SVGRoom_1,
	Source: SVGSource_1,
	Spawn: SVGSpawn_1,
	Storage: SVGStorage_1,
	Terminal: SVGTerminal_1,
	Tower: SVGTower_1,
};

module.exports = index;
