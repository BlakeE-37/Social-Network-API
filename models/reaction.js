const { Schema, Types } = require('mongoose')

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        defualt: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        max: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

reactionSchema.virtual('formatTime').get(function () {
    const date = new Date(this.createdAt);
    return date.toLocaleDateString();
});

module.exports = reactionSchema;