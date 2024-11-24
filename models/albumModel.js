class albumModel {
	constructor(data) {
		this._id = data._id;
		this.title = data.title;
        this.img_url = data.img_url;
		this.artistId = data.artistId;
		this.releaseDate = data.releaseDate;
		this.tracks = data.tracks;
	}
}

export default albumModel;
