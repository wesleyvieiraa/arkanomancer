const router = require("express").Router();
const grimoireSpellController = require("../controller/grimoire-spell-controller");
const middlewareAuthorization = require("../middleware/auth-middleware");


/* GET */
router.get(
  "/list",
  [middlewareAuthorization(["ADMIN", "USER"])],
  grimoireSpellController.listAssociationsByUserId
);

/* POST */
router.post(
  "/associate",
  [
    middlewareAuthorization(["ADMIN", "USER"]),
    grimoireSpellController.validate()
  ],
  grimoireSpellController.associate
);

router.post(
  "/associate-multiple",
  [
    middlewareAuthorization(["ADMIN", "USER"]),
  ],
  grimoireSpellController.associateMultiple
);

/* PUT */
router.put(
  "/update",
  [
    middlewareAuthorization(["ADMIN", "USER"]),
    grimoireSpellController.validate()
  ],
  grimoireSpellController.update
);

/* DELETE */
router.delete(
  "/disassociate",
  [
    middlewareAuthorization(["ADMIN", "USER"]),
    grimoireSpellController.validate()
  ],
  grimoireSpellController.disassociate
);

module.exports = router;