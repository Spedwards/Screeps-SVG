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
	}
	
}