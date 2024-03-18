const express = require("express");
const directorsRouter = express.Router();
const Director = require("../models/director");

directorsRouter.get("/", async (req, res) => {
  try {
    const directors = await Director.findAll();
    res.json(directors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

directorsRouter.post("/", async (req, res) => {
  try {
    const director = await Director.create(req.body);
    res.status(201).json(director);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

directorsRouter.get("/:id", async (req, res) => {
  try {
    const director = await Director.findByPk(req.params.id);
    if (!director) {
      return res.status(404).json({ error: "Director not found" });
    }
    res.json(director);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

directorsRouter.put("/:id", async (req, res) => {
  try {
    let director = await Director.findByPk(req.params.id);
    if (!director) {
      return res.status(404).json({ error: "Director not found" });
    }
    director = await director.update(req.body);
    res.json(director);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

directorsRouter.delete("/:id", async (req, res) => {
  try {
    const director = await Director.findByPk(req.params.id);
    if (!director) {
      return res.status(404).json({ error: "Director not found" });
    }
    await director.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = directorsRouter;
