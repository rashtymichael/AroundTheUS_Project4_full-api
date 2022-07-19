const Card = require('../models/cardsModel');
const { errorsMessages } = require('../constants/errors');
const InvalidDataError = require('../errors/InvalidDataError');
const UnAuthorizedError = require('../errors/UnAuthorizedError');
const { checkCardErrors } = require('../helpers/errors');

module.exports.createNewCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => { res.json(card); })
    .catch((err) => {
      let error;

      if (err.name === 'ValidationError') {
        error = new InvalidDataError(errorsMessages.isInvalidDataError);
      }

      next(error || err);
    });
};

module.exports.deleteCardById = (req, res, next) => {
  const cardId = req.params.id;

  Card.findById(cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new UnAuthorizedError(errorsMessages.isAuthorizationError);
      }

      return Card.findByIdAndDelete(cardId);
    })
    .then((card) => { res.json(card); })
    .catch((err) => {
      const error = checkCardErrors(err);

      next(error || err);
    });
};

module.exports.likeCard = (req, res, next) => {
  const cardId = req.params.id;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((updatedCardLikes) => { res.json(updatedCardLikes); })
    .catch((err) => {
      const error = checkCardErrors(err);

      next(error || err);
    });
};

module.exports.disLikeCard = (req, res, next) => {
  const cardId = req.params.id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((updatedCardLikes) => { res.json(updatedCardLikes); })
    .catch((err) => {
      const error = checkCardErrors(err);

      next(error || err);
    });
};
