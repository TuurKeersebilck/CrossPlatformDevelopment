import artistModel from "../../models/artistModel";

const artistMockup = [
	new artistModel({
		_id: "ObjectId('5f50c31f1c9d440000a1b2c3')",
		name: "Travis Scott",
		bio: "This is the bio of Travis Scott.",
		img_url: require("../../assets/artistsImages/TravisScott.jpg"), 
		singles: [
			"ObjectId('5f50c31f1c9d440000a1b2c6')",
			"ObjectId('5f50c31f1c9d440000a1b2c7')",
		],
		albums: [
			"ObjectId('5f50c31f1c9d440000a1b2c4')",
			"ObjectId('5f50c31f1c9d440000a1b2c5')",
		],
	}),
	new artistModel({
		_id: "ObjectId('5f50c31f1c9d440000a1b2c8')",
		name: "Drake",
		bio: "This is the bio of Drake.",
		img_url: require("../../assets/artistsImages/Drake.jpg"),
		singles: [
			"ObjectId('5f50c31f1c9d440000a1b2cb')",
			"ObjectId('5f50c31f1c9d440000a1b2cc')",
		],
		albums: [
			"ObjectId('5f50c31f1c9d440000a1b2c9')",
			"ObjectId('5f50c31f1c9d440000a1b2ca')",
		],
	}),
	new artistModel({
		_id: "ObjectId('5f50c31f1c9d440000a1b2ce')",
		name: "Kanye West",
		bio: "This is the bio of Kanye West.",
		img_url: require("../../assets/artistsImages/KanyeWest.jpg"), 
		singles: [
			"ObjectId('5f50c31f1c9d440000a1b2cf')",
			"ObjectId('5f50c31f1c9d440000a1b2d0')",
		],
		albums: [
			"ObjectId('5f50c31f1c9d440000a1b2d1')",
			"ObjectId('5f50c31f1c9d440000a1b2d2')",
		],
	}),
];

export default artistMockup;
