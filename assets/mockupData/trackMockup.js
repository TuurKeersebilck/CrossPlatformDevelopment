import trackModel from '../../models/trackModel.js';

const trackMockData = [
    new trackModel({
        _id: "ObjectId('5f50c31f1c9d440000a1b2d9')",
        title: "Sicko Mode",
        img_url: require("../../assets/trackImages/SickoMode.jpg"),
        duration: "5:12", 
        artistId: ["ObjectId('5f50c31f1c9d440000a1b2c3')"],
        albumId: "ObjectId('5f50c31f1c9d440000a1b2d8')"
    }),
    new trackModel({
        _id: "ObjectId('5f50c31f1c9d440000a1b2da')",
        title: "Stargazing",
        img_url: require("../../assets/trackImages/Stargazing.jpg"),
        duration: "4:30", 
        artistId: ["ObjectId('5f50c31f1c9d440000a1b2c3')"],
        albumId: "ObjectId('5f50c31f1c9d440000a1b2d8')"
    }),
    new trackModel({
        _id: "ObjectId('5f50c31f1c9d440000a1b2dc')",
        title: "God's Plan",
        img_url: require("../../assets/trackImages/GodsPlan.jpg"),
        duration: "3:19", 
        artistId: ["ObjectId('5f50c31f1c9d440000a1b2c8')"],
        albumId: "ObjectId('5f50c31f1c9d440000a1b2db')"
    }),
    new trackModel({
        _id: "ObjectId('5f50c31f1c9d440000a1b2dd')",
        title: "In My Feelings",
        img_url: require("../../assets/trackImages/InMyFeelings.jpg"),
        duration: "3:37", 
        artistId: ["ObjectId('5f50c31f1c9d440000a1b2c8')"],
        albumId: "ObjectId('5f50c31f1c9d440000a1b2db')"
    }),
    new trackModel({
        _id: "ObjectId('5f50c31f1c9d440000a1b2de')",
        title: "Stronger",
        img_url: require("../../assets/trackImages/Stronger.jpg"),
        duration: "5:11", 
        artistId: ["ObjectId('5f50c31f1c9d440000a1b2ce')"],
        albumId: "ObjectId('5f50c31f1c9d440000a1b2d1')"
    }),
    new trackModel({
        _id: "ObjectId('5f50c31f1c9d440000a1b2df')",
        title: "Heartless",
        img_url: require("../../assets/trackImages/Heartless.jpg"),
        duration: "3:50", 
        artistId: ["ObjectId('5f50c31f1c9d440000a1b2ce')"],
        albumId: "ObjectId('5f50c31f1c9d440000a1b2d2')"
    })
];

export default trackMockData;