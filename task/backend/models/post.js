const moongoose = require('mongoose');

const postSchema = moongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    creator: { type: moongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = moongoose.model('Post', postSchema);