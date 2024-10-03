const router = require("express").Router();
const grimoireController = require("../controller/grimoire-controller");
const middlewareAuthorization = require("../middleware/auth-middleware");


/* GET */
router.get(
  "/id/:grimoireId",
  [middlewareAuthorization(["ADMIN", "USER"])],
  grimoireController.getGrimoireById
);

router.get(
  "",
  [middlewareAuthorization(["ADMIN", "USER"])],
  grimoireController.listGrimoireByUserId
);

router.get(
  "/name/:name",
  [middlewareAuthorization(["ADMIN", "USER"])],
  grimoireController.listGrimoireByNameAndUserId
);

/* POST */
router.post(
  "/create",
  [
    middlewareAuthorization(["ADMIN", "USER"]),
    grimoireController.validateCreation()
  ],
  grimoireController.createGrimoire
);

/* PUT */
router.put(
  "/update/id/:grimoireId",
  [
    middlewareAuthorization(["ADMIN", "USER"]),
    grimoireController.validateUpdate()
  ],
  grimoireController.updateGrimoire
);

/* DELETE */
router.delete(
  "/delete/id/:grimoireId",
  [middlewareAuthorization(["ADMIN", "USER"])],
  grimoireController.deleteGrimoire
);

module.exports = router;