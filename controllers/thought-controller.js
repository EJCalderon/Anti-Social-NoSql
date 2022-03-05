const { Thoughts, Users } = require('../models/thought');

const thoughtController = {
    getAllThought(req, res) {
        Thoughts.find({})
        .populare({ path: 'recreations', select: '-__v'})
        .select('-__v')
        .then(abThoughtData => res.json(abThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    getThoughtsbyId({ params}, res) {
        Thoughts.findOne({ _id: params.id})
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: none});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    createThought({ body}, res) {
        Thoughts.create(body) 
        .then(dbThoughtData => {
            Users.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            )
            .then(dbUserData => {
                if(!dbUserData) {
            res.status(404).json({ message: 'none' });
            return;
        }
            res.json(dbUserData);
        })
            .catch(err => res.json(err));
        })
        .catch(err => res.status(400).json(err));
    },

    updateThought({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'None' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteThought({ params }, res) {
        Thoughts.findOneAndDelete({_id: params.thoughtid }, { $pull: {reactionId: {reactionId: params.reactionId}}}, {new: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'none'});
                return;
            }
            res.json(dbThoughtData);
        })
            .catch(err => res.json(err));
    }
};
module.exports = thoughtController;
    