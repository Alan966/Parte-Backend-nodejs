const express = require("express")
const router = express.Router() 

const { list, read, create, remove, ImageHomeById, photo } = require("../controllers/Home_Controllers");

router.get("/all", list)
router.post("/create", create)
router.get("/photo/:ImageHomeById", photo)
router.get("/:ImageHomeById", ImageHomeById)
router.delete("/:ImageHomeById", remove)
router.param("ImageHomeById", read)

module.exports = router;