const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const Genre = require('./genre');
const Actor = require('./actor');
const Director = require('./director');

const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  synopsis: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  releaseYear: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Movie.belongsToMany(Genre, { through: 'MovieGenre' });
Movie.belongsToMany(Actor, { through: 'MovieActor' });
Movie.belongsToMany(Director, { through: 'MovieDirector' });

Genre.belongsToMany(Movie, { through: 'MovieGenre' });
Actor.belongsToMany(Movie, { through: 'MovieActor' });
Director.belongsToMany(Movie, { through: 'MovieDirector' });

module.exports = Movie;
