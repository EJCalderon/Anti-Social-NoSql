const router = require('express').Router();
const{
    getAllThought,
    getThoughtsById,
    addThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thought-controller');

router
.route('/')
.get(getAllThought)
.post(addThought);

router
.route('/:id')
.get(getThoughtsById)
.put(updateThought)
.delete(deleteThought)

module.exports = router 