const express = require('express');
const validation = require('../middlewares/validation');
const router = express.Router();

const User = require('../models/User');

// BUSCAR TODOS os usuários
router.get('/', (req, res, next) => {
  const queries = {
    findUser: User.findAll()
  }

  Promise
    .all([queries.findUser])
    .then(response => {
      if (response[0]) {
        res.statusCode = 200
        res.json({
          response: 'sucesso',
          body: response[0]
        })
      } else {
        res.statusCode = 404
        res.json({
          response: 'não encontrado',
        })
      }
    })
    .catch(err => {
      res.statusCode = 500
      res.json({
        response: 'erro no banco de dados',
        erro: err
      })
    })
})

// BUSCA um usuário
router.get('/:id', validation, (req, res, next) => {

  const id = req.params.id
  const queries = {
    findUser: User.findOne({
      where: id
    }),
    updateLogin: User.update({
      date_login: Date.now()
    }, {
      where: id
    })
  }

  Promise
    .all([queries.findUser, queries.updateLogin])
    .then(response => {
      if (response[0]) {
        res.statusCode = 200
        res.json({
          response: 'sucesso',
          body: response[0]
        });
      } else {
        res.statusCode = 404
        res.json({
          response: 'não encontrado',
        })
      }
    })
    .catch(err => {
      res.statusCode = 500
      res.json({
        response: 'erro no banco de dados',
        erro: err
      })
    })
});

// CRIA um novo usuário
// TODO
// Middleware validation
router.post('/:id', validation, (req, res, next) => {

  const user = req.body;

  // TODO
  // refatorar
  User.create(user)
    .then(() => {
      res.statusCode = 201
      res.json({
        response: 'cadastrado'
      })
    })
    .catch(err => {
      res.statusCode = 500
      res.json({
        response: 'erro no banco de dados',
        erro: err
      })
    })
});

// ATUALIZA um usuário
// TODO
// Midleware validation
router.put('/:id', validation, (req, res, next) => {

  const id = req.params.id
  const user = req.body;

  User.update(user, {
    where: id
  })
    .then((data) => {
      res.statusCode = 200
      res.json({
        response: data > 0 ? 'atualizado' : 'usuário não existe'
      })
    })
    .catch(err => {
      res.statusCode = 500
      res.json({
        response: 'erro no banco de dados',
        erro: err
      })
    })
});

// DELETA um usuário
router.delete('/:id', validation, (req, res, next) => {

  const id = req.params.id

  User.destroy({
    where: id
  })
    .then((data) => {
      res.statusCode = 200
      res.json({
        response: data > 0 ? 'deletado' : 'usuário não existe'
      })
    })
    .catch(err => {
      res.statusCode = 500
      res.json({
        response: 'erro no banco de dados',
        erro: err
      })
    })
});

module.exports = router;
