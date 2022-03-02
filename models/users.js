const { Schema, model } = require('mongoose');

const UsersSchema = new Schema (

    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/]
        },

        thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thoughts'}],
        friends: [{ type: Schema.Types.ObjectId, ref: 'User'}]
    },
    {
        tpJson: {
            virtuals: true
        },
        id: false
    });
    UsersSchema.vurtual('frindCount').get(function(){
        return this.friends.length;
    });
    const Users = model('User', userSchema);

    module.exports = Users;