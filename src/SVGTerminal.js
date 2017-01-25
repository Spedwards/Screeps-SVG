let SVGStorageObject = require('./SVGStorageObject');

/**
 * Returns a html/svg string representation of the given terminal object.
 * @author Spedwards
 */
class SVGTerminal extends SVGStorageObject {

	/**
	 * @author Spedwards
	 * @param {StructureTerminal} terminal - StructureTerminal object or ID string corrosponding to a StructureTerminal object.
	 */
	constructor(terminal) {
		super(terminal, STRUCTURE_TERMINAL);
	}

}

module.exports = SVGTerminal;
