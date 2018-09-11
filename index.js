const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${3000}.`);
});

const genres = [
  {
    id: 1,
    name: 'Comedy'
  },
  {
    id: 2,
    name: 'Drama'
  },
  {
    id: 3,
    name: 'Action'
  }
];

function validateGenre(genre) {
  return Joi.validate(genre, {
    name: Joi.string()
      .min(3)
      .required()
  });
}

function findGenre(id) {
  id = ~~id;
  return new Promise((resolve, reject) => {
    genres.forEach((g, i) => {
      if (g.id === id) resolve({ genre: g, index: i });
    });
    reject(`Genre with id ${id} does not exist`);
  });
}

app.get('/api/genres', (req, res) => {
  res.status(200).send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  findGenre(req.params.id)
    .then(({ genre }) => {
      res.status(200).send(genre);
    })
    .catch(e => {
      res.status(404).send(e);
    });
});

app.put('/api/genres/:id', (req, res) => {
  validateGenre(req.body)
    .then(({ name: update }) => {
      findGenre(req.params.id)
        .then(({ genre }) => {
          genre.name = update;
          res.status(200).send(genre);
        })
        .catch(e => {
          res.status(404).send(e);
        });
    })
    .catch(e => {
      res.status(400).send(e.details[0].message);
    });
});

app.post('/api/genres', (req, res) => {
  validateGenre(req.body)
    .then(g => {
      const genre = {
        id: genres.length + 1,
        name: g.name
      };
      genres.push(genre);
      res.status(200).send(genre);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.delete('/api/genres/:id', (req, res) => {
  findGenre(req.params.id)
    .then(({ index }) => {
      const genre = genres.splice(index, 1);
      res.status(200).send(genre);
    })
    .catch(e => {
      res.status(404).send(e);
    });
});
