const { Schema, model } = require('mongoose');
const moment = require('moment');

const thoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    writtenBy: {
        type: String,
        require: true,
        trim: true
    },
    reactions: [ReactionSchema]
},
{
    toJson: {
        virtuals: true,
        getters: true
    }
}
);

const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts

