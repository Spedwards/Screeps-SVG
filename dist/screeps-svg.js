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
	 * @returns {string}
	 */
	static get MINERAL() {
		return 'mineral';
	}
	
	/**
	 * Gets player name
	 * @returns {string}
	 */
	get player() {
		return _(Game.rooms).filter(r => r.controller.my).min(r => r.controller.level).controller.owner.username;
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
		} else if (expectedType === SVG$1.MINERAL) {
			let mineral = object;
			if (typeof object === 'string') {
				mineral = this.id(object);
			}
			
			if (mineral instanceof Mineral) {
				return mineral.mineralType;
			}
			
			if (_.includes(['H', 'O', 'U', 'L', 'K', 'Z', 'X'], object)) {
				return object;
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
class SVGResource$1 extends SVG$2 {
	
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
					[RESOURCE_HYDROGEN]: {back: `#4D4D4D`, front: `#CCCCCC`},
					[RESOURCE_OXYGEN]: {back: `#4D4D4D`, front: `#CCCCCC`},
					[RESOURCE_UTRIUM]: {back: `#1B617F`, front: `#88D6F7`},
					[RESOURCE_LEMERGIUM]: {back: `#3F6147`, front: `#89F4A5`},
					[RESOURCE_KEANIUM]: {back: `#331A80`, front: `#9370FF`},
					[RESOURCE_ZYNTHIUM]: {back: `#594D33`, front: `#F2D28B`},
					[RESOURCE_CATALYST]: {back: `#4F2626`, front: `#FF7A7A`},
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
						throw new Error(`Invalid resource type ${this.resourceType} in SVGResource!`);
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

Resource.prototype.getSVG = function() {
	return new SVGResource$1(this.resourceType, this.amount);
};

Resource.prototype.display = function() {
	console.log(this.getSVG());
};

var SVGResource_1 = SVGResource$1;

let SVG = SVG_1;
let SVGResource = SVGResource_1;

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
				outStr += (new SVGResource(type, this.object.store[type])).toString();
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

StructureContainer.prototype.getSVG = function(size = 40) {
	return new SVGContainer(this, size);
};

StructureContainer.prototype.display = function(size = 40) {
	console.log(this.getSVG(size));
};

var SVGContainer_1 = SVGContainer;

let SVG$3 = SVG_1;

/**
 * Returns a html/svg string representation of the given controller object.
 * @author Spedwards
 */
class SVGController extends SVG$3 {
	
	/**
	 * @author Spedwards
	 * @param {StructureController | string} controller - StructureController object or ID string corrosponding to a StructureController object.
	 * @param {Number} [size = 60] - SVG size.
	 */
	constructor(controller, size = 60) {
		super();
		let object = this.validateConstructor(controller, STRUCTURE_CONTROLLER);
		if (object === false) throw new Error('Not a Controller object!');
		
		this.controller = object;
		this.size = typeof size === 'number' ? size : 60;
		this.string = this.toString();
	}
	
	/**
	 * @author Spedwards
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = this.size;
			
			const START_X = 80 * Math.cos(Math.PI / 8);
			const START_Y = 80 * Math.sin(Math.PI / 8);
			
			const DEST_A_X = 80 * Math.cos(Math.PI / 8 + Math.PI / 4);
			const DEST_A_Y = 80 * Math.sin(Math.PI / 8 + Math.PI / 4);
			
			const DEST_B_X = 80 * Math.cos(Math.PI / 8 + 2 * Math.PI / 4);
			const DEST_B_Y = 80 * Math.sin(Math.PI / 8 + 2 * Math.PI / 4);
			
			const DEST_C_X = 80 * Math.cos(Math.PI / 8 + 3 * Math.PI / 4);
			const DEST_C_Y = 80 * Math.sin(Math.PI / 8 + 3 * Math.PI / 4);
			
			const DEST_D_X = 80 * Math.cos(Math.PI / 8 + 4 * Math.PI / 4);
			const DEST_D_Y = 80 * Math.sin(Math.PI / 8 + 4 * Math.PI / 4);
			
			const DEST_E_X = 80 * Math.cos(Math.PI / 8 + 5 * Math.PI / 4);
			const DEST_E_Y = 80 * Math.sin(Math.PI / 8 + 5 * Math.PI / 4);
			
			const DEST_F_X = 80 * Math.cos(Math.PI / 8 + 6 * Math.PI / 4);
			const DEST_F_Y = 80 * Math.sin(Math.PI / 8 + 6 * Math.PI / 4);
			
			const DEST_G_X = 80 * Math.cos(Math.PI / 8 + 7 * Math.PI / 4);
			const DEST_G_Y = 80 * Math.sin(Math.PI / 8 + 7 * Math.PI / 4);
			
			const DEST = [DEST_A_X, DEST_A_Y,
				DEST_B_X, DEST_B_Y,
				DEST_C_X, DEST_C_Y,
				DEST_D_X, DEST_D_Y,
				DEST_E_X, DEST_E_Y,
				DEST_F_X, DEST_F_Y,
				DEST_G_X, DEST_G_Y].join(' ');
			
			let outStr = `<svg height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 300 300">` +
					`<g transform="translate(150,150)">` +
					`<g>` +
					`<path fill="#FFFFFF" fill-opacity="0.1" transform="scale(1.2 1.2)" d="M ${START_X} ${START_Y} L ${DEST} Z" />`;
			
			if (this.controller.reservation && this.player === this.controller.reservation.username) {
				outStr += `<ellipse cx="0" cy="0" fill="#33FF33" opacity="0" rx="110" ry="110">` +
					`<animate attributeName="opacity" attributeType="XML" dur="2s" repeatCount="indefinite" values="0.05;0.2;0.05" calcMode="linear" />` +
					`</ellipse>`;
			}
			
			if (this.controller.upgradeBlocked ||
				this.controller.reservation && !(this.player === this.controller.reservation.username)) {
				outStr += `<ellipse cx="0" cy="0" fill="#FF3333" opacity="0" rx="110" ry="110">` +
						`<animate attributeName="opacity" attributeType="XML" dur="2s" repeatCount="indefinite" values="0.05;0.2;0.05" calcMode="linear" />` +
						`</ellipse>`;
			}
			
			if (this.controller.safeMode) {
				outStr += `<ellipse cx="0" cy="0" fill="#FFD180" opacity="0" rx="110" ry="110">` +
						`<animate attributeName="opacity" attributeType="XML" dur="2s" repeatCount="indefinite" values="0.05;0.2;0.05" calcMode="linear" />` +
						`</ellipse>`;
			}
			outStr += `<path fill="#0A0A0A" d="M ${START_X} ${START_Y} L ${DEST} Z" />`;
			
			if (this.controller.level) {
				outStr += `<path fill="#CCCCCC" paint-order="fill" stroke-width="6" stroke="#0A0A0A" d="${this.getLevelsPath()}" />`;
			}
			
			// Temp Fill - Until Badges
			// Replace this line with badges
			outStr += `<ellipse cx="0" cy="0" fill="#222222" rx="37" ry="37" />`;
		
			outStr += `<ellipse cx="0" cy="0" fill="transparent" rx="40" ry="40" stroke-width="10" stroke="#080808"></ellipse>`;
			
			if (this.controller.level > 0 && this.controller.progress > 0) {
				const LARGE_ARC_FLAG = this.controller.progress < this.controller.progressTotal / 2 ? 0 : 1;
				const END_X = 19 * Math.cos(-Math.PI * 2 * (this.controller.progressTotal - this.controller.progress) / this.controller.progressTotal);
				const END_Y = 19 * Math.sin(-Math.PI * 2 * (this.controller.progressTotal - this.controller.progress) / this.controller.progressTotal);
				
				const DOWNGRADE_TICKS = CONTROLLER_DOWNGRADE[this.controller.level];
				const DOWNGRADE_OPACITY = (DOWNGRADE_TICKS - this.controller.ticksToDowngrade) / DOWNGRADE_TICKS;
				
				outStr += `<path fill="transparent" stroke-opacity="0.4" stroke-width="38" stroke="#FFFFFF" transform="rotate(-90)" d="M 19 0 A 19 19 0 ${LARGE_ARC_FLAG} 1 ${END_X} ${END_Y}" />` +
						`<g opacity="${DOWNGRADE_OPACITY}">` +
						`<path class="anim-downgrade" fill="#FF3333" d="M ${START_X} ${START_Y} L ${DEST} Z">` +
						`<animate attributeName="opacity" attributeType="XML" repeatCount="indefinite" values="0;0.9;0.6;0.3;0" dur="2s" calcMode="linear" />` +
						`</path>` +
						`</g>`;
			}
			
			outStr += `</g></g></svg>`;
			
			return outStr;
		}
		return this.string;
	}
	
	/**
	 * Returns the path for the controller level.
	 * @author Spedwards
	 * @returns {string}
	 */
	getLevelsPath() {
		const initial = 'M 0 0 L -28.70125742738173 -69.2909649383465';
		const segments = [
			'L 28.701257427381737 -69.2909649383465 Z',
			'M 0 0 L 28.701257427381737 -69.2909649383465 L 69.2909649383465 -28.701257427381734 Z',
			'M 0 0 L 69.2909649383465 -28.701257427381734 L 69.2909649383465 28.701257427381734 Z',
			'M 0 0 L 69.2909649383465 28.701257427381734 L 28.701257427381737 69.2909649383465 Z',
			'M 0 0 L 28.701257427381737 69.2909649383465 L -28.70125742738173 69.2909649383465 Z',
			'M 0 0 L -28.70125742738173 69.2909649383465 L -69.2909649383465 28.70125742738174 Z',
			'M 0 0 L -69.2909649383465 28.70125742738174 L -69.29096493834652 -28.701257427381726 Z',
			'M 0 0 L -69.29096493834652 -28.701257427381726 L -28.701257427381776 -69.29096493834649 Z'
		];
		let path = initial + '\n';
		for (let i = 0; i < this.controller.level; i++) {
			path += segments[i] + '\n';
		}
		return path;
	}
	
}

StructureController.prototype.getSVG = function(size = 60) {
	return new SVGController(this, size);
};

StructureController.prototype.display = function(size = 60) {
	console.log(this.getSVG(size));
};

var SVGController_1 = SVGController;

let SVG$4 = SVG_1;

/**
 * Returns a html/svg string representation of the given creep object.
 * @author Helam
 * @author Spedwards
 */
class SVGCreep extends SVG$4 {

	/**
	 * @author Spedwards
	 * @param {Creep | string} creep - Creep object, Name string, or ID string corrosponding to Creep object.
	 */
	constructor(creep) {
		super();
		let object = this.validateConstructor(creep, SVG$4.CREEP);
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

Creep.prototype.getSVG = function() {
	return new SVGCreep(this);
};

Creep.prototype.display = function() {
	console.log(this.getSVG());
};

var SVGCreep_1 = SVGCreep;

let SVG$5 = SVG_1;

/**
 * Returns a html/svg string representation of the given extension object.
 * @author Spedwards
 */
class SVGExtension extends SVG$5 {
	
	/**
	 * @author Spedwards
	 * @param {StructureExtension | string} extension - StructureExtension object or ID string corrosponding to a StructureExtension object.
	 * @param {Number} [size = 50] - SVG size.
	 */
	constructor(extension, size = 50) {
		super();
		let object = this.validateConstructor(extension, STRUCTURE_EXTENSION);
		if (object === false) throw new Error('Not an Extension object!');
		
		this.extension = object;
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
			
			const BORDER_COLOUR = this.player === this.extension.owner.username ? `#8FBB93` : `#ED5557`;
			
			let outStr = `<svg height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 100 100">` +
					`<g transform="translate(50,50)">` +
					`<g>` +
					`<ellipse rx="${this.getSize()}" ry="${this.getSize()}" cx="0" cy="0" fill="#181818" stroke="${BORDER_COLOUR}" stroke-width="5" />`;
			
			if (this.extension.energy > 0) {
				const ENERGY_RADIUS = 0.7 * this.getSize() * Math.min(this.extension.energy / this.extension.energyCapacity, 1);
				outStr += `<ellipse cx="0" cy="0" fill="#FFE56D" rx="${ENERGY_RADIUS}" ry="${ENERGY_RADIUS}" />`;
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

StructureExtension.prototype.getSVG = function(size = 50) {
	return new SVGExtension(this, size);
};

StructureExtension.prototype.display = function(size = 50) {
	console.log(this.getSVG(size));
};

var SVGExtension_1 = SVGExtension;

let SVG$7 = SVG_1;

/**
 * Returns a html/svg string representation of the given mineral object.
 * @author Spedwards
 */
class SVGMineral$1 extends SVG$7 {
	
	/**
	 * @author Spedwards
	 * @param {Mineral | string} mineral - Mineral object, mineral type, or ID string corrosponding to a Mineral object.
	 * @param {Number} [size = 50] - SVG size.
	 */
	constructor(mineral, size = 50) {
		super();
		let object = this.validateConstructor(mineral, SVG$7.MINERAL);
		if (object === false) throw new Error('Not a Mineral object!');
		
		this.mineralType = object;
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
			
			const COLOURS = this.getColours();
			
			return `<svg height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 150 150">` +
					`<g transform="translate(75,75)">` +
					`<ellipse rx="60" ry="60" cx="0" cy="0" fill="${COLOURS.background}" stroke="${COLOURS.foreground}" stroke-width="10" />` +
					`<text font-size="82" font-weight="bold" text-anchor="middle" style="font-family: Roboto, serif" x="0" y="28" fill="${COLOURS.foreground}">${this.mineralType}</text>` +
					`</g></svg>`;
		}
		return this.string;
	}
	
	/**
	 * Get mineral colours.
	 * @returns {Object}
	 */
	getColours() {
		switch(this.mineralType) {
			case RESOURCE_CATALYST:
				return {
					foreground: '#FF7A7A',
					background: '#4F2626',
				};
			case RESOURCE_KEANIUM:
				return {
					foreground: '#9370FF',
					background: '#331A80',
				};
			case RESOURCE_LEMERGIUM:
				return {
					foreground: '#89F4A5',
					background: '#3F6147',
				};
			case RESOURCE_UTRIUM:
				return {
					foreground: '#88D6F7',
					background: '#1B617F',
				};
			case RESOURCE_ZYNTHIUM:
				return {
					foreground: '#F2D28B',
					background: '#594D33',
				};
			default:
				return {
					foreground: '#CCCCCC',
					background: '#4D4D4D',
				};
		}
	}

}

Mineral.prototype.getSVG = function(size = 50) {
	return new SVGMineral$1(this, size);
};

Mineral.prototype.display = function(size = 50) {
	console.log(this.getSVG(size));
};

var SVGMineral_1 = SVGMineral$1;

let SVG$6 = SVG_1;
let SVGMineral = SVGMineral_1;

/**
 * Returns a html/svg string representation of the given extractor object.
 * @author Spedwards
 */
class SVGExtractor extends SVG$6 {
	
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

StructureExtractor.prototype.getSVG = function(size = 50) {
	let [mineral] = this.room.find(FIND_MINERALS);
	return new SVGExtractor(this, mineral, size);
};
	
StructureExtractor.prototype.display = function(size = 50) {
	console.log(this.getSVG(size));
};

var SVGExtractor_1 = SVGExtractor;

let SVG$8 = SVG_1;

/**
 * Returns a html/svg string representation of a keeper lair.
 */
class SVGKeeperLair extends SVG$8 {
	
	/**
	 * @author Spedwards
	 * @param {Number} [size = 50] - SVG size.
	 */
	constructor(size = 50) {
		super();
		
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
			
			return `<svg height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 80 80">` +
					`<g transform="translate(40,40)">` +
					`<g>` +
					`<ellipse rx="40" ry="40" cx="0" cy="0" fill="#000000" />` +
					`<ellipse rx="33" ry="33" cx="0" cy="0" fill="#780207">` +
					`<animateTransform attributeName="transform" attributeType="XML" dur="2s" repeatCount="indefinite" type="scale" values="0 0;1 1;1 1" calcMode="linear" />` +
					`<animate attributeName="fill" dur="2s" repeatCount="indefinite" values="#780207; #000000" />` +
					`</ellipse>` +
					`<ellipse rx="33" ry="33" cx="0" cy="0" fill="#000000">` +
					`<animateTransform attributeName="transform" attributeType="XML" dur="2s" repeatCount="indefinite" type="scale" values="0 0;0.3 0.3;1 1" calcMode="linear" />` +
					`</ellipse>` +
					`</g></g></svg>`;
		}
		return this.string;
	}
	
}

var SVGKeeperLair_1 = SVGKeeperLair;

let SVG$9 = SVG_1;

/**
 * Returns a html/svg string representation of the given lab object.
 * @author Enrico
 * @author Spedwards
 */
class SVGLab extends SVG$9 {

	/**
	 * @author Spedwards
	 * @param {StructureLab | string} lab - StructureLab object or ID string corrosponding to StructureLab object.
	 * @param {Boolean} [coloured = true] - Colour the mineral in lab.
	 * @param {Number} [size = 50] - SVG size.
	 */
	constructor(lab, coloured = true, size = 50) {
		super();
		let object = this.validateConstructor(lab, STRUCTURE_LAB);
		if (object === false) throw new Error('Not a Lab object!');

		this.lab = object;
		this.coloured = typeof coloured === 'boolean' ? coloured : true;
		this.size = typeof size === 'number' ? size : 50;
		this.string = this.toString();
	}

	/**
	 * @author Enrico
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = this.size;
			
			const BORDER_COLOUR = this.player === this.lab.owner.username ? `#8FBB93` : `#ED5557`;

			let outStr = `<svg viewBox="0 0 120 120" height="${SVG_SIZE}" width="${SVG_SIZE}">` +
				`<g transform="translate(60,55)">` +
				`<path d="M 50 40 A 60 60 0 1 0 -50 40 V 63 H 50 Z" fill="#181818" stroke="${BORDER_COLOUR}" stroke-width="5"/>` +
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

StructureLab.prototype.getSVG = function(size = 50) {
	return new SVGLab(this, true, size);
};

StructureLab.prototype.display = function(size = 50) {
	console.log(this.getSVG(size));
};

var SVGLab_1 = SVGLab;

let SVG$10 = SVG_1;

/**
 * Returns a html/svg string representation of the given link object.
 * @author Spedwards
 */
class SVGLink extends SVG$10 {

	/**
	 * @author Spedwards
	 * @param {StructureLink | string} link - StructureLink object or ID string corrosponding to a StructureLink object.
	 * @param {Number} [size = 50] - SVG size.
	 */
	constructor(link, size = 50) {
		super();
		let object = this.validateConstructor(link, STRUCTURE_LINK);
		if (object === false) throw new Error('Not a Link object!');

		this.link = object;
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

			const ENERGY_SCALE = 0.6 * this.link.energy / this.link.energyCapacity;
			
			const BORDER_COLOUR = this.player === this.link.owner.username ? `#8FBB93` : `#ED5557`;

			let outStr = `<svg class="link owner" height="${SVG_SIZE}" width="${SVG_SIZE * 0.8}" viewBox="0 0 50 100">` +
				`<g opacity="1" transform="translate(25,50)"><g>` +
				`<path d="M 0 -50 L 40 0 L 0 50 L -40 0 Z" fill="#181818" stroke="${BORDER_COLOUR}" stroke-width="5" />` +
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

StructureLink.prototype.getSVG = function(size = 50) {
	return new SVGLink(this, size);
};

StructureLink.prototype.display = function(size = 50) {
	console.log(this.getSVG(size));
};

var SVGLink_1 = SVGLink;

let SVG$11 = SVG_1;

/**
 * Returns a html/svg string representation of the given nuker object.
 * @author Enrico
 * @author Spedwards
 */
class SVGNuker extends SVG$11 {

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

StructureNuker.prototype.getSVG = function(size = 60) {
	return new SVGNuker(this, size);
};

StructureNuker.prototype.display = function(size = 60) {
	console.log(this.getSVG(size));
};

var SVGNuker_1 = SVGNuker;

let SVG$12 = SVG_1;

/**
 * Returns a html/svg string representation of the given observer object.
 * @author Spedwards
 */
class SVGObserver extends SVG$12 {
	
	/**
	 * @author Spedwards
	 * @param {StructureObserver | string} observer - StructureObserver object or ID string corrosponding to a StructureObserver object.
	 * @param {Number} [size = 50] - SVG size.
	 */
	constructor(observer, size = 50) {
		super();
		let object = this.validateConstructor(observer, STRUCTURE_OBSERVER);
		if (object === false) throw new Error('Not an Observer object!');
		
		this.observer = object;
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
			
			const COLOUR = this.player === this.observer.owner.username ? `#8FBB93` : `#ED5557`;
			
			return `<svg height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 100 100">` +
					`<g transform="translate(50,50)">` +
					`<ellipse rx="45" ry="40" fill="#111111" stroke="${COLOUR}" stroke-width="5" cx="0" cy="0" />` +
					`<ellipse rx="20" ry="20" fill="${COLOUR}" cx="0" cy="-15">` +
					`<animate attributeName="cx" attributeType="XML" dur="2s" repeatCount="indefinite" values="20;20;0;0;-20;-20;0;0;20" calcMode="linear" />` +
					`<animate attributeName="cy" attributeType="XML" dur="2s" repeatCount="indefinite" values="0;0;15;15;0;0;-15;-15;0" calcMode="linear" />` +
					`</ellipse>` +
					`</g>` +
					`</svg>`;
		}
		return this.string;
	}
	
}

StructureObserver.prototype.getSVG = function(size = 50) {
	return new SVGObserver(this, size);
};

StructureObserver.prototype.display = function(size = 50) {
	console.log(this.getSVG(size));
};

var SVGObserver_1 = SVGObserver;

let SVG$13 = SVG_1;

/**
 * Returns a html/svg string representation of the given power bank object.
 * @author Spedwards
 */
class SVGPowerBank extends SVG$13 {
	
	/**
	 * @author Spedwards
	 * @param {StructurePowerBank | string} powerBank - StructurePowerBank object or ID string corrosponding to a StructurePowerBank object.
	 * @param {Number} [size = 50] - SVG size.
	 */
	constructor(powerBank, size = 50) {
		super();
		let object = this.validateConstructor(powerBank, STRUCTURE_POWER_BANK);
		if (object === false) throw new Error('Not a PowerBank object!');
		
		this.powerBank = object;
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
			
			const RADIUS = 1.013e-10*Math.pow(this.powerBank.power, 3) - 1.336e-6*Math.pow(this.powerBank.power, 2) + 9.197e-3*this.powerBank.power + 5.695;
			
			return `<svg height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 150 150">` +
					`<g transform="translate(75,75), scale(1.5 1.5)">` +
					`<path d="M0 -50 H30 L50 -30 V30 L30 50 H-30 L-50 30 V-30 L-30 -50 Z" fill="#311" stroke-width="10" stroke="#666" />` +
					`<ellipse rx="${RADIUS}" ry="${RADIUS}" cx="0" cy="0" fill="#F41F33" stroke="#8D000D" stroke-width="10">` +
					`<animateTransform attributeName="transform" attributeType="XML" dur="2s" keyTimes="0;0.66;1" repeatCount="indefinite" type="scale" values="1 1;0.6 0.6; 1 1" />` +
					`<animate attributeName="fill" dur="2s" repeatCount="indefinite" values="#F41F33; #D31022; #8D000D; #F41F33" calcMode="linear" />` +
					`</ellipse></g></svg>`;
		}
		return this.string;
	}
	
}

StructurePowerBank.prototype.getSVG = function(size = 50) {
	return new SVGPowerBank(this, size);
};

StructurePowerBank.prototype.display = function(size = 50) {
	console.log(this.getSVG(size));
};

var SVGPowerBank_1 = SVGPowerBank;

let SVG$14 = SVG_1;

/**
 * Returns a html/svg string representation of the given spawn object.
 * @author Spedwards
 */
class SVGPowerSpawn extends SVG$14 {
	
	/**
	 * @author Spedwards
	 * @param {StructurePowerSpawn | string} powerSpawn - StructurePowerSpawn object or ID string corrosponding to a StructurePowerSpawn object.
	 * @param {Number} [size = 50] - SVG size.
	 */
	constructor(powerSpawn, size = 50) {
		super();
		let object = this.validateConstructor(powerSpawn, STRUCTURE_POWER_SPAWN);
		if (object === false) throw new Error('Not a Power Spawn object!');
		
		this.powerSpawn = object;
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
			
			let outStr = `<svg height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 160 160">` +
					`<g transform="translate(80,80)">` +
					`<ellipse rx="75" ry="75" cx="0" cy="0" fill="#222222" stroke="#CCCCCC" stroke-width="7" />` +
					`<ellipse rx="68" ry="68" cx="0" cy="0" fill="#222222" stroke="#F41F33" stroke-width="10" />` +
					`<ellipse rx="59" ry="59" cx="0" cy="0" fill="#181818" />` +
					`<ellipse rx="37" ry="37" cx="0" cy="0" fill="#555555" />`;
			
			if (this.powerSpawn.power) {
				const LARGE_ARC_FLAG = (this.powerSpawn.power < this.powerSpawn.powerCapacity / 2) ? 0 : 1;
				const END_X = 50 * Math.cos(Math.PI * 2 * (this.powerSpawn.power / this.powerSpawn.powerCapacity));
				const END_Y = 50 * Math.sin(Math.PI * 2 * (this.powerSpawn.power / this.powerSpawn.powerCapacity));
				
				outStr += `<path fill="transparent" d="M 50 0 A 50 50 0 ${LARGE_ARC_FLAG} 1 ${END_X} ${END_Y}" stroke-width="15" stroke="#F41F33" transform="rotate(-90)" />`;
			}
			
			if (this.powerSpawn.energy > 0) {
				const RADIUS = 38 * Math.min(this.powerSpawn.energy / this.powerSpawn.energyCapacity, 1);
				
				outStr += `<ellipse rx="${RADIUS}" ry="${RADIUS}" cx="0" cy="0" fill="#FFE56D" />`;
			}
			
			outStr += `</g></svg>`;
			
			return outStr;
		}
		return this.string;
	}
	
}

StructurePowerSpawn.prototype.getSVG = function(size = 50) {
	return new SVGPowerSpawn(this, size);
};

StructurePowerSpawn.prototype.display = function(size = 50) {
	console.log(this.getSVG(size));
};

var SVGPowerSpawn_1 = SVGPowerSpawn;

let SVGStorageObject$2 = SVGStorageObject_1;

/**
 * Returns a html/svg string representation of the given storage object.
 * @author Spedwards
 */
class SVGStorage$1 extends SVGStorageObject$2 {

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

StructureStorage.prototype.getSVG = function(size = 50) {
	return new SVGStorage$1(this, size);
};

StructureStorage.prototype.display = function(size = 50) {
	console.log(this.getSVG(size));
};

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
	 * @param {Number} [size = 60] - SVG size.
	 */
	constructor(terminal, size = 60) {
		super(terminal, STRUCTURE_TERMINAL);
		this.size = typeof size === 'number' ? size : 60;
		this.string = this.toString();
	}
	
	/**
	 * @author Spedwards
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = this.size;
			
			const COLOUR = this.player === this.object.owner.username ? `#8FBB93` : `#ED5557`;
			
			const TERMINAL = this.object;
			const CAPACITY = TERMINAL.storeCapacity;
			const ENERGY = TERMINAL.store[RESOURCE_ENERGY];
			const POWER = TERMINAL.store[RESOURCE_POWER] || 0;
			const TOTAL = _.sum(TERMINAL.store);
			
			const OTHER_SCALE = Math.min(1, TOTAL / CAPACITY);
			const POWER_SCALE = Math.min(1, (POWER + ENERGY) / CAPACITY);
			const ENERGY_SCALE = Math.min(1, ENERGY / CAPACITY);
			
			return `<svg height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 175 175">` +
					`<g transform="translate(87.5,87.5)">` +
					`<path d="M 85 0 L 55 -55 L 0 -85 L -55 -55 L -85 0 L -55 55 L 0 85 L 55 55 Z" fill="#181818" stroke="${COLOUR}" stroke-width="5" />` +
					`<path d="M 67 0 L 48 -35 V 35 L 67 0 Z M 0 -67 L -35 -48 H 35 Z M -67 0 L -48 -35 V 35 Z M 0 67 L -35 48 H 35 Z" fill="#AAA" />` +
					`<rect fill="#181818" height="90" width="90" x="-45" y="-45" />` +
					`<rect fill="#555555" height="76" width="76" x="-38" y="-38" />` +
					`<!-- minerals -->` +
					`<rect fill="#FFF" height="76" width="76" x="-38" y="-38" transform="scale(${OTHER_SCALE} ${OTHER_SCALE})" />` +
					`<!-- power -->` +
					`<rect fill="#F41F33" height="76" width="76" x="-38" y="-38" transform="scale(${POWER_SCALE} ${POWER_SCALE})" />` +
					`<!-- energy -->` +
					`<rect fill="#FFE56D" height="76" width="76" x="-38" y="-38" transform="scale(${ENERGY_SCALE} ${ENERGY_SCALE})" />` +
					`</g></svg>`;
		}
		return this.string;
	}

}

StructureTerminal.prototype.getSVG = function(size = 50) {
	return new SVGTerminal$1(this, size);
};

StructureTerminal.prototype.display = function(size = 50) {
	console.log(this.getSVG(size));
};

var SVGTerminal_1 = SVGTerminal$1;

let SVG$15 = SVG_1;
let SVGStorage = SVGStorage_1;
let SVGTerminal = SVGTerminal_1;

/**
 * Takes a room and outputs the html/svg string for the storage and terminal of that room.
 * @author Helam
 * @author Dragnar
 * @author Spedwards
 */
class SVGRoom extends SVG$15 {

	/**
	 * @author Spedwards
	 * @param {Room | string} roomArg - Room object or valid room name.
	 * @param {Number} [size = 60] - SVG size.
	 */
	constructor(roomArg, size = 60) {
		super();
		let object = this.validateConstructor(roomArg, SVG$15.ROOM);
		if (object === false) throw new Error('Not a Room object!');

		this.room = object;
		this.size = typeof size === 'number' ? size : 60;
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
				storageSVG = new SVGStorage(storage, this.size);
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
				terminalSVG = new SVGTerminal(terminal, this.size);
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

Room.prototype.getSVG = function(size = 60) {
	return new SVGRoom(this, size);
};

Room.prototype.display = function(size = 60) {
	console.log(this.getSVG(size));
};

var SVGRoom_1 = SVGRoom;

let SVG$16 = SVG_1;

/**
 * Returns a html/svg string representation of the given source object.
 * @author Spedwards
 */
class SVGSource extends SVG$16 {

	/**
	 * @author Spedwards
	 * @param {Source | string} source - Source object or ID string corrosponding to a Source object.
	 * @param {Number} [size = 40] - SVG size.
	 */
	constructor(source, size = 40) {
		super();
		let object = this.validateConstructor(source, SVG$16.SOURCE);
		if (object === false) throw new Error('Not a Source object!');

		this.source = object;
		this.size = typeof size === 'number' ? size : 40;
		this.string = this.toString();
	}

	/**
	 * @author Spedwards
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = this.size;

			const SOURCE_HEIGHT = this.source.energy / this.source.energyCapacity * 60;
			const SOURCE_POS = 20 - (SOURCE_HEIGHT / 2);

			return `<svg class="source" height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 65 65">` +
				`<g transform="translate(12,12)">` +
				`<rect fill="#111111" height="40" rx="15" ry="15" stroke-width="15" stroke="#595026" width="40">` +
				`<animate attributeName="stroke" dur="4s" repeatCount="indefinite" values="#595026; #0e0c04; #595026" calcMode="linear" />` +
				`</rect>` +
				`<rect fill="#FFE56D" height="${SOURCE_HEIGHT}" width="${SOURCE_HEIGHT}" rx="15" ry="15" x="${SOURCE_POS}" y="${SOURCE_POS}">` +
				`<animate attributeName="fill" dur="2s" repeatCount="indefinite" values="#ffe56d; #fff; #ffcd6d; #ffde84; #ffe56d" calcMode="linear" />` +
				`</rect>` +
				`</g>` +
				`</svg>`;
		}
		return this.string;
	}

}

Source.prototype.getSVG = function(size = 40) {
	return new SVGSource(this, size);
};

Source.prototype.display = function(size = 40) {
	console.log(this.getSVG(size));
};

var SVGSource_1 = SVGSource;

let SVG$17 = SVG_1;

/**
 * Returns a html/svg string representation of the given spawn object.
 * @author Spedwards
 */
class SVGSpawn extends SVG$17 {
	
	/**
	 * @author Spedwards
	 * @param {StructureSpawn | string} spawn - StructureSpawn object or ID string corrosponding to a StructureSpawn object.
	 * @param {Number} [size = 50] - SVG size.
	 */
	constructor(spawn, size = 50) {
		super();
		let object = this.validateConstructor(spawn, STRUCTURE_SPAWN);
		if (object === false) throw new Error('Not a Spawn object!');
		
		this.spawn = object;
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
			
			let outStr = `<svg height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 180 180">` +
					`<g transform="translate(90,90)">` +
					`<g>` +
					`<ellipse rx="70" ry="70" cx="0" cy="0" fill="#CCCCCC" />` +
					`<ellipse rx="59" ry="59" cx="0" cy="0" fill="#181818" />` +
					// Temp Fill - Until Badges
					// Replace this line with badges
					`<ellipse rx="37" ry="37" cx="0" cy="0" fill="#555555" />`;
			
			if (this.spawn.spawning) {
				const LARGE_ARC_FLAG = this.spawn.spawning.remainingTime + 0.01 > this.spawn.spawning.needTime / 2 ? 0 : 1;
				const END_X = 50 * Math.cos(-Math.PI * 2 * (this.spawn.spawning.remainingTime + 0.01) / this.spawn.spawning.needTime);
				const END_Y = 50 * Math.sin(-Math.PI * 2 * (this.spawn.spawning.remainingTime + 0.01) / this.spawn.spawning.needTime);
				
				outStr += `<path fill="transparent" d="M 50 0 A 50 50 0 ${LARGE_ARC_FLAG} 1 ${END_X} ${END_Y}" stroke-width="15" stroke="#AAAAAA" transform="rotate(-90)" />`;
			}
			
			if (this.spawn.energy > 0) {
				const RADIUS = 38 * Math.min(this.spawn.energy / this.spawn.energyCapacity);
				
				outStr += `<ellipse rx="${RADIUS}" ry="${RADIUS}" cx="0" cy="0" fill="#FFE56D" />`;
			}
			
			if (this.spawn.spawning) {
				outStr += `<animateTransform attributeName="transform" attributeType="XML" dur="2s" keyTimes="0;0.25;1" repeatCount="indefinite" type="scale" values="1 1;1.24 1.24;1 1" calcMode="linear" />`;
			}
			
			outStr += `</g></g></svg>`;
			
			return outStr;
		}
		return this.string;
	}
	
}

StructureSpawn.prototype.getSVG = function(size = 50) {
	return new SVGSpawn(this, size);
};

StructureSpawn.prototype.display = function(size = 50) {
	console.log(this.getSVG(size));
};

var SVGSpawn_1 = SVGSpawn;

let SVG$18 = SVG_1;

/**
 * Returns a html/svg string representation of the given tower object.
 * @author Spedwards
 */
class SVGTower extends SVG$18 {

	/**
	 * @author Spedwards
	 * @param {StructureTower | string} tower - StructureTower object or ID string corrosponding to a StructureTower object.
	 * @param {Number} [angle = 315] - The angle at which the tower will point.
	 * @param {Boolean} [animated = false] - Whether or not you want the tower to be animated.
	 * @param {Number} [size = 60] - SVG size.
	 */
	constructor(tower, angle = 315, animated = false, size = 60) {
		super();
		let object = this.validateConstructor(tower, STRUCTURE_TOWER);
		if (object === false) throw new Error('Not a Tower object!');

		this.tower = object;
		this.radians = angle * (Math.PI / 180);
		this.animated = typeof animated === 'boolean' ? animated : false;
		this.size = typeof size === 'number' ? size : 60;
		this.string = this.toString();
	}

	/**
	 * @author Spedwards
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = this.size;

			const RADIANS = this.radians;

			const BARREL_X = -20;
			const BARREL_Y = -80;

			const TANK_X = -39;
			const TANK_Y = -25;

			const ENERGY_HEIGHT = 58 * this.tower.energy / this.tower.energyCapacity;
			
			const BORDER_COLOUR = this.player === this.tower.owner.username ? `#8FBB93` : `#ED5557`;

			let outStr = `<svg class="tower owner" height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 200 200">` +
				`<g transform="translate(100,100)" opacity="1">` +
				`<ellipse cx="0" cy="0" fill="#222" rx="65" ry="65" stroke="${BORDER_COLOUR}" stroke-width="5" />` +
				`<g class="rotatable" transform="rotate(${RADIANS}rad)" style="transition: transform 2s;">` +
				`<rect fill="#aaa" height="50" stroke-width="7" stroke="#181818" width="40" x="${BARREL_X}" y="${BARREL_Y}" />` +
				`<rect fill="#555" height="58" rx="12" ry="10" width="78" x="${TANK_X}" y="${TANK_Y}" />`;
			
			if (this.animated) {
				outStr += `<animateTransform attributeName="transform" attributeType="XML" dur="5s" keyTimes="0;0.4;0.75;1" repeatCount="indefinite" type="rotate" values="315;90;200;315" calcMode="linear" />`;
			}

			if (this.tower.energy > 0) {
				// ENERGY
				outStr += `<rect fill="#ffe56d" height="${ENERGY_HEIGHT}" y="${33 - ENERGY_HEIGHT}" rx="12" ry="12" width="78" x="${TANK_X}" />`;
			}

			outStr += `</g></g></svg>`;

			return outStr;
		}
		return this.string;
	}

}

StructureTower.prototype.getSVG = function(angle = 315, animated = false, size = 50) {
	return new SVGTower(this, angle, animated, size);
};

StructureTower.prototype.display = function(angle = 315, animated = false, size = 50) {
	console.log(this.getSVG(angle, animated, size));
};

var SVGTower_1 = SVGTower;

var index = {
	Container: SVGContainer_1,
	Controller: SVGController_1,
	Creep: SVGCreep_1,
	Extension: SVGExtension_1,
	Extractor: SVGExtractor_1,
	KeeperLair: SVGKeeperLair_1,
	Lab: SVGLab_1,
	Link: SVGLink_1,
	Mineral: SVGMineral_1,
	Nuker: SVGNuker_1,
	Observer: SVGObserver_1,
	PowerBank: SVGPowerBank_1,
	PowerSpawn: SVGPowerSpawn_1,
	Resource: SVGResource_1,
	Room: SVGRoom_1,
	Source: SVGSource_1,
	Spawn: SVGSpawn_1,
	Storage: SVGStorage_1,
	Terminal: SVGTerminal_1,
	Tower: SVGTower_1,
};

module.exports = index;
