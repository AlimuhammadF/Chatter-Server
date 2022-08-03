const express = require("express");
const router = express.Router();

// create account api
router.post("/", (req, res) => {
	res.send("create account");
});

// export
module.exports = router;
