const express = require("express");
const router = express.Router();

// create chat api
router.post("/", (req, res) => {
	res.send("Create Chat");
});

// export
module.exports = router;
