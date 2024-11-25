import albumModel from "../../models/albumModel";

const albumMockData = [
	new albumModel({
		_id: "ObjectId('5f50c31f1c9d440000a1b2d8')",
		title: "Astroworld",
		img_url: require("../../assets/trackImages/Stargazing.jpg"),
		artistId: "ObjectId('5f50c31f1c9d440000a1b2c3')",
		releaseDate: new Date("2018-08-03"),
		tracks: [
			"ObjectId('5f50c31f1c9d440000a1b2d9')",
			"ObjectId('5f50c31f1c9d440000a1b2da')",
		],
	}),
	new albumModel({
		_id: "ObjectId('5f50c31f1c9d440000a1b2db')",
		title: "Scorpion",
		img_url: require("../../assets/trackImages/GodsPlan.jpg"),
		artistId: "ObjectId('5f50c31f1c9d440000a1b2c8')",
		releaseDate: new Date("2018-06-29"),
		tracks: [
			"ObjectId('5f50c31f1c9d440000a1b2dc')",
			"ObjectId('5f50c31f1c9d440000a1b2dd')",
		],
	}),
	new albumModel({
		_id: "ObjectId('5f50c31f1c9d440000a1b2d1')",
		title: "Graduation",
		img_url: require("../../assets/trackImages/Stronger.jpg"),
		artistId: "ObjectId('5f50c31f1c9d440000a1b2ce')",
		releaseDate: new Date("2007-09-11"),
		tracks: ["ObjectId('5f50c31f1c9d440000a1b2de')"],
	}),
	new albumModel({
		_id: "ObjectId('5f50c31f1c9d440000a1b2d2')",
		title: "808s & Heartbreak",
		img_url: require("../../assets/trackImages/Heartless.jpg"),
		artistId: "ObjectId('5f50c31f1c9d440000a1b2ce')",
		releaseDate: new Date("2008-11-24"),
		tracks: ["ObjectId('5f50c31f1c9d440000a1b2df')"],
	}),
];

export default albumMockData;
