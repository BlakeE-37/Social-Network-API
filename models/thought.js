const { Schema, model } = require('mongoose')
const reactionSchema = require('./reaction')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]

},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    });

// getter method to format 'createdAt' date 
thoughtSchema.virtual('formatTime').get(function () {
    const date = new Date(this.createdAt);
    return date.toLocaleDateString();
});

// getter method that returns the length of the reactions array
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


const Thought = model('thought', thoughtSchema);

module.exports = Thought;