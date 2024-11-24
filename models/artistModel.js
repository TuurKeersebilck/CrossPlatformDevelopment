class artistModel {
	constructor(data) {
		this._id = data._id;
		this.name = data.name;
		this.bio = data.bio;
		this.img_url = data.img_url;
		this.singles = data.singles;
		this.albums = data.albums;
	}
}

export default artistModel;
