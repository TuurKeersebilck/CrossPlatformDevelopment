import userModel from "../../models/userModel";

const userMockData = [
	new userModel({
		_id: "ObjectId('5f50c31f1c9d440000a1b2de')",
		email: "user1@example.com",
		artistFavorites: [
			"ObjectId('5f50c31f1c9d440000a1b2c3')",
			"ObjectId('5f50c31f1c9d440000a1b2c8')",
		],
		songFavorites: [
			"ObjectId('5f50c31f1c9d440000a1b2d9')",
			"ObjectId('5f50c31f1c9d440000a1b2dc')",
		],
	}),
	new userModel({
		_id: "ObjectId('5f50c31f1c9d440000a1b2df')",
		email: "user2@example.com",
		artistFavorites: ["ObjectId('5f50c31f1c9d440000a1b2c8')"],
		songFavorites: ["ObjectId('5f50c31f1c9d440000a1b2dd')"],
	}),
];

export default userMockData;
