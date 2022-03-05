const router = require('express').Router();

const {
    getAllUsers,
    createUsers,
    updateUsers,
    deleteUsers,
    deleteFriend
} = require('../../controllers/user-controllers');

router
.route('/')
.get(getAllUsers)
.post(createUsers);

router
.route('/:id')
.put(updateUsers)
.delete(deleteUsers);

router
.route('/:id/friends/:friendId')
.delete(deleteFriend);

module.exports = router;