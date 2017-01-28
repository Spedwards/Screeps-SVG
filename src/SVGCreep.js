let SVG = require('./SVG');

/**
 * Returns a html/svg string representation of the given creep object.
 * @author Helam
 * @author Spedwards
 */
class SVGCreep extends SVG {

	/**
	 * @author Spedwards
	 * @param {Creep | string} creep - Creep object, Name string, or ID string corrosponding to Creep object.
	 * @param {Number} [size = 50] - SVG size.
	 */
	constructor(creep, size = 50) {
		super();
		let object = this.validateConstructor(creep, SVG.CREEP);
		if (object === false) throw new Error('Not a Creep object!');

		this.creep = object;
		this.size = typeof size === 'number' ? size : 50;
		this.string = this.toString();
	}

	/**
	 * @author Helam
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = this.size;
			
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
				const angleInRadians = (angleInDegrees - 90) * Math.PI / 180;

				return {
					x: centerX + (radius * Math.cos(angleInRadians)),
					y: centerY + (radius * Math.sin(angleInRadians)),
				};
			}

			function describeArc(x, y, radius, startAngle, endAngle) {
				const start = polarToCartesian(x, y, radius, endAngle);
				const end = polarToCartesian(x, y, radius, startAngle);

				const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

				return [
					'M', start.x, start.y,
					'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
				].join(' ');
			}

			function partsArc(partType, partCount, prevPartCount) {
				if (partType === CARRY) {
					return ``;
				}

				const centerAngle = partType === MOVE ? 180 : 0;

				const arcLength = ((prevPartCount + partCount) / 50) * 360;
				const startAngle = centerAngle - arcLength / 2;
				const endAngle = centerAngle + arcLength / 2;
				return `<path d="${describeArc(CENTER_X, CENTER_Y, RADIUS, startAngle, endAngle)}" fill="none" stroke="${PART_COLOURS[partType]}" stroke-width="${BORDER_WIDTH}" />`;
			}

			const parts = _.map(creep.body, b => b.type).filter(type => type !== CARRY);
			const partCounts = _.countBy(parts);

			let outStr = `<svg width="${SVG_SIZE}" height="${SVG_SIZE}" viewBox="0 0 48 48">`;

			const TOUGH_OPACITY = (partCounts[TOUGH] || 0) / 50;
			outStr += `<circle cx="${CENTER_X}" cy="${CENTER_Y}" r="${RADIUS + TOUGH_EXTRA_RADIUS}" fill="${PART_COLOURS[TOUGH]}" fill-opacity="${TOUGH_OPACITY}" />` +
					`<circle cx="${CENTER_X}" cy="${CENTER_Y}" r="${RADIUS}" fill="${INTERNAL_COLOUR}" stroke="${BORDER_COLOUR}" stroke-width="${BORDER_WIDTH}" />`;

			const arcs = [];

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

			const keys = Object.keys(partCounts).sort((a, b) => partCounts[b] - partCounts[a] || PRIO[b] - PRIO[a]);
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

module.exports = SVGCreep;
