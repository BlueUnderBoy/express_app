const express = require("express");
const router = express.Router();

const wins = require("../data/wins");
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "wins/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ wins, links });
  })
  .post((req, res, next) => {
    if (req.body.fighterId && req.body.winner) {
      const win = {
        id: wins[wins.length - 1].id + 1,
        fighterId: req.body.fighterId,
        winner: req.body.winner
      };

      wins.push(win);
      res.json(wins[wins.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const win = wins.find((p) => p.id == req.params.id);

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

    if (win) res.json({ win, links });
    else next();
  })
  .patch((req, res, next) => {
    const win = wins.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
            wins[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (win) res.json(win);
    else next();
  })
  .delete((req, res, next) => {
    const win = wins.find((p, i) => {
      if (p.id == req.params.id) {
        wins.splice(i, 1);
        return true;
      }
    });

    if (win) res.json(win);
    else next();
  });

module.exports = router;
