const express = require("express");
const actorsRouter = express.Router();
const Actor = require("../models/actor");

actorsRouter.get("/", async (req, res) => {
  try {
    const actors = await Actor.findAll();
    res.json(actors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

actorsRouter.post("/", async (req, res) => {
  try {
    const actor = await Actor.create(req.body);
    res.status(201).json(actor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

actorsRouter.get("/:id", async (req, res) => {
  try {
    const actor = await Actor.findByPk(req.params.id);
    if (!actor) {
      return res.status(404).json({ error: "Actor not found" });
    }
    res.json(actor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

actorsRouter.put("/:id", async (req, res) => {
  try {
    let actor = await Actor.findByPk(req.params.id);
    if (!actor) {
      return res.status(404).json({ error: "Actor not found" });
    }
    actor = await actor.update(req.body);
    res.json(actor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

actorsRouter.delete("/:id", async (req, res) => {
  try {
    const actor = await Actor.findByPk(req.params.id);
    if (!actor) {
      return res.status(404).json({ error: "Actor not found" });
    }
    await actor.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = actorsRouter;
