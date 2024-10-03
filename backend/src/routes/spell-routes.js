const router = require("express").Router();
const spellController = require("../controller/spell-controller");
const middlewareAuthorization = require("../middleware/auth-middleware");


/* GET */
router.get(
  "/id/:spellId",
  [middlewareAuthorization(["ADMIN", "USER"])],
  spellController.getSpellById
);

router.get(
  "/list-all",
  [middlewareAuthorization(["ADMIN", "USER"])],
  spellController.listAll
);

router.get(
  "/list/grimoire/id/:grimoireId",
  [middlewareAuthorization(["ADMIN", "USER"])],
  spellController.listSpellByGrimoireIdAndUserId
);

router.get(
  "/list",
  [middlewareAuthorization(["ADMIN", "USER"])],
  spellController.list
);

module.exports = router;