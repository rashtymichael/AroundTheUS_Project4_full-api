const cardsRouter = require('express').Router();
const Card = require('../models/cardsModel');
const { findData } = require('../helpers');
const {
  createNewCard, deleteCardById, likeCard, disLikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', findData(Card));
cardsRouter.post('/cards', createNewCard);
cardsRouter.delete('/cards/:id', deleteCardById);
cardsRouter.put('/cards/:cardId/likes', likeCard);
cardsRouter.delete('/cards/:cardId/likes', disLikeCard);

module.exports = cardsRouter;
