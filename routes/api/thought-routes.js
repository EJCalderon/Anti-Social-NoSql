const router = require('express').Router();
const{
    getAllThoughts,
    getThoughtsById,
    addThoughts,
    updateThought,
    addReaction,
    deleteThought,
    deleteReaction
} = require('../../controllers/thought-controller');

router
.route('/')
.get(getAllThoughts)
.post(addThoughts);

router
.route('/:id')
.get(getThoughtsById)
.put(updateThought)
.delete(deleteThought)

module.exports = router 