class userModel {
	constructor(data) {
		this._id = data._id;
		this.email = data.email;
		this.artistFavorites = data.artistFavorites;
		this.songFavorites = data.songFavorites;
	}
}

export default userModel;
