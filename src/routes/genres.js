const express = require("express");
const genresRouter = express.Router();
const Genre = require("../models/genre");

genresRouter.get("/", async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

genresRouter.post("/", async (req, res) => {
  try {
    const genre = await Genre.create(req.body);
    res.status(201).json(genre);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

genresRouter.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }
    res.json(genre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

genresRouter.put("/:id", async (req, res) => {
  try {
    let genre = await Genre.findByPk(req.params.id);
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }
    genre = await genre.update(req.body);
    res.json(genre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

genresRouter.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }
    await genre.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = genresRouter;
