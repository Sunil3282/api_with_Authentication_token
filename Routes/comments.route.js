const express = require('express');
const commentController = require('../controllers/comments.controller')

const router = express.Router();

router.post("/",commentController.save)

module.exports = router;