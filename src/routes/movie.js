const express = require("express");
const moviesRouter = express.Router();
const Movie= require("../models/movie");
const Genre = require("../models/genre");
const Actor = require("../models/actor");
const Director = require("../models/director");

// Obtener todas las películas
moviesRouter.get("/", async (req, res) => {
  try {
    const movies = await Movie.findAll({
      include: [
        { model: Genre, attributes: ["name"], through: { attributes: [] } },
        { model: Actor, attributes: ["firstName", "lastName"], through: { attributes: [] } },
        { model: Director, attributes: ["firstName", "lastName"], through: { attributes: [] } }
      ]
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear una película
moviesRouter.post("/", async (req, res) => {
  const { name, image, synopsis, releaseYear, genreIds, actorIds, directorIds } = req.body;

  try {
    // 1. Crear la película con los datos básicos
    const movie = await Movie.create({ name, image, synopsis, releaseYear });

    // 2. Asociar la película con los géneros, actores y directores
    if (genreIds && genreIds.length > 0) {
      await movie.addGenres(genreIds);
    }
    if (actorIds && actorIds.length > 0) {
      await movie.addActors(actorIds);
    }
    if (directorIds && directorIds.length > 0) {
      await movie.addDirectors(directorIds);
    }

    // 3. Devolver la película creada
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Obtener una película por su ID
moviesRouter.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id, {
      include: [
        { model: Genre, attributes: ["name"], through: { attributes: [] } },
        { model: Actor, attributes: ["firstName", "lastName"], through: { attributes: [] } },
        { model: Director, attributes: ["firstName", "lastName"], through: { attributes: [] } }
      ]
    });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una película por su ID
moviesRouter.put("/:id", async (req, res) => {
  try {
    let movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    movie = await movie.update(req.body);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar una película por su ID
moviesRouter.delete("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    await movie.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Modificar los géneros de una película por su ID
moviesRouter.post("/:id/genres", async (req, res) => {
  const { id } = req.params;
  const { genreIds } = req.body;
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    await movie.setGenres(genreIds);
    const updatedGenres = await movie.getGenres();
    res.json(updatedGenres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Modificar los actores de una película por su ID
moviesRouter.post("/:id/actors", async (req, res) => {
  // Implementación similar a /:id/genres
});

// Modificar los directores de una película por su ID
moviesRouter.post("/:id/directors", async (req, res) => {
  // Implementación similar a /:id/genres
});

module.exports = moviesRouter;
