const express = require("express");
const router = express.Router();

const fighters = require("../data/fighters");
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "fighters/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ fighters, links });
  })
  .post((req, res, next) => {
    if (req.body.name && req.body.age) {
      if (fighters.find((u) => u.name == req.body.name)) {
        next(error(409, "Name Already Taken"));
      }

      const fighter = {
        id: fighters[fighters.length - 1].id + 1,
        name: req.body.name,
        age: req.body.age,
      };

      fighters.push(fighter);
      res.json(fighter[fighter.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const fighter = fighters.find((u) => u.id == req.params.id);

    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];

    if (fighter) res.json({ fighter, links });
    else next();
  })
  .patch((req, res, next) => {
    const fighter = fighters.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          users[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (fighter) res.json(fighter);
    else next();
  })
  .delete((req, res, next) => {
    const fighter = fighters.find((u, i) => {
      if (u.id == req.params.id) {
        fighters.splice(i, 1);
        return true;
      }
    });

    if (fighter) res.json(fighter);
    else next();
  });

module.exports = router;
