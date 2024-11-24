import trackModel from '../../models/trackModel.js';

const trackMockData = [
    new trackModel({
        _id: "ObjectId('5f50c31f1c9d440000a1b2d9')",
        title: "Sicko Mode",
        img_url: "https://picsum.photos/200/200?random=1",
        duration: 312,
        artistId: ["ObjectId('5f50c31f1c9d440000a1b2c3')"],
        albumId: "ObjectId('5f50c31f1c9d440000a1b2d8')"
    }),
    new trackModel({
        _id: "ObjectId('5f50c31f1c9d440000a1b2da')",
        title: "Stargazing",
        img_url: "https://picsum.photos/200/200?random=2",
        duration: 270,
        artistId: ["ObjectId('5f50c31f1c9d440000a1b2c3')"],
        albumId: "ObjectId('5f50c31f1c9d440000a1b2d8')"
    }),
    new trackModel({
        _id: "ObjectId('5f50c31f1c9d440000a1b2dc')",
        title: "God's Plan",
        img_url: "https://picsum.photos/200/200?random=3",
        duration: 199,
        artistId: ["ObjectId('5f50c31f1c9d440000a1b2c8')"],
        albumId: "ObjectId('5f50c31f1c9d440000a1b2db')"
    }),
    new trackModel({
        _id: "ObjectId('5f50c31f1c9d440000a1b2dd')",
        title: "In My Feelings",
        img_url: "https://picsum.photos/200/200?random=4",
        duration: 217,
        artistId: ["ObjectId('5f50c31f1c9d440000a1b2c8')"],
        albumId: "ObjectId('5f50c31f1c9d440000a1b2db')"
    }),
    new trackModel({
        _id: "ObjectId('5f50c31f1c9d440000a1b2de')",
        title: "Stronger",
        img_url: "https://picsum.photos/200/200?random=5",
        duration: 311,
        artistId: ["ObjectId('5f50c31f1c9d440000a1b2ce')"],
        albumId: "ObjectId('5f50c31f1c9d440000a1b2d1')"
    }),
    new trackModel({
        _id: "ObjectId('5f50c31f1c9d440000a1b2df')",
        title: "Heartless",
        img_url: "https://picsum.photos/200/200?random=6",
        duration: 230,
        artistId: ["ObjectId('5f50c31f1c9d440000a1b2ce')"],
        albumId: "ObjectId('5f50c31f1c9d440000a1b2d2')"
    })
];

export default trackMockData;