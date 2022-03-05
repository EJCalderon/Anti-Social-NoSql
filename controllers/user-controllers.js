const res = require('express/lib/response');
const { Users } = require('../models');

const userControllers = {

    createUsers({body}, res) {
        Users.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }, getAllUsers(req, res) {
        Users.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    getUsersById({params}, res) {
        Users.findOne({_id: params.id })
        .populate({path: 'thought', select:'-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'None'});
                return;
            }
            res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
        },
        updateUsers({params, body}, res) {
            Users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
            .then(dbThoughtsData => {
                if(!dbThoughtsData) {
                res.status(404).json({message: 'None'});
            return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.json(err))
    },
    deleteUsers({params}, res) {
        Users.findOneAndDelete({_id: params.id})
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: 'None'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    addriend({params}, res) {
        Users.findOneAndDelete({_id: params.id}, {$push: {friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'none'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));  
    },



    deleteFriend({params}, res) {
        Users.findOneAndDelete({_id: params.id}, {$push: {friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: '404'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));   
    }

};

module.exports = userControllers;