let SVG = require('./SVG');

/**
 * Returns a html/svg string representation of the given controller object.
 * @author Spedwards
 */
class SVGController extends SVG {
	
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
}

StructureController.prototype.display = function(size = 60) {
	console.log(this.getSVG(size));
};

module.exports = SVGController;
