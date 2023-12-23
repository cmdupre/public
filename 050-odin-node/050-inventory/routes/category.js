const express = require("express");
const router = express.Router();

const category_controller = require('../controllers/categoryController');

// GET catalog home page.
router.get("/", category_controller.index);

router.get('/:id', category_controller.detail);

module.exports = router;