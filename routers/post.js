const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");
const multer = require("multer");

// index
router.get('/', postsController.index);
//create
router.get('/create', postsController.create);
//download 
router.get('/:slug/download', postsController.downloadImage);
//store con multer 
router.post('/', multer().none(), postsController.store);
// rotta per destroy
router.post('/:slug/destroy', postsController.destroy);



module.exports = router;