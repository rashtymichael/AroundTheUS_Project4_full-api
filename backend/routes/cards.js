const cardsRouter = require('express').Router();
const Card = require('../models/cardsModel');
const { findData } = require('../helpers');
const {
  createNewCard, deleteCardById, likeCard, disLikeCard,
} = require('../controllers/cards');
const { validateCardData, validateIdParam } = require('../middleware/celebrateValidation');

cardsRouter.get('/cards', findData(Card));
cardsRouter.post('/cards', validateCardData, createNewCard);
cardsRouter.delete('/cards/:id', validateIdParam, deleteCardById);
cardsRouter.put('/cards/:id/likes', validateIdParam, likeCard);
cardsRouter.delete('/cards/:id/likes', validateIdParam, disLikeCard);

module.exports = cardsRouter;
