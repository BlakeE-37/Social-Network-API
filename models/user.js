const { Schema, model } = require('mongoose');

// create the user chema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trimmed: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    });

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema)

module.exports = User