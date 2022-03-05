const router = require('express').Router();
const{
    getAllThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thought-controller');

router
.route('/')
.get(getAllThought)
.post(createThought);

router
.route('/:id')
.put(updateThought)
.delete(deleteThought);

module.exports = router 