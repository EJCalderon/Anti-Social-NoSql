const router = require('express').Router();

const {
    getAllUsers,
    getUsedById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controllers');

router
.route('/')
.get(getAllUsers)
.post(createUsers)

router
.route('/')
.get(getUserById)
.put(updateUsers)
.delete(deleteUsers)

router
.route('/:id/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;