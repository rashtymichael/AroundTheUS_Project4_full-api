const Card = require('../models/cardsModel');
const { errorsMessages, errorsStatus } = require('../constants/errors');

module.exports.createNewCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => { res.json({ data: card }); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(errorsStatus.invalidDataError)
          .send({ message: errorsMessages.isInvalidData });
      }

      return res
        .status(errorsStatus.defaultError)
        .send({ message: errorsMessages.isServerError });
    });
};

module.exports.deleteCardById = (req, res) => {
  const cardCreatorId = req.params.id;

  Card.findByIdAndDelete(cardCreatorId)
    .orFail()
    .then((card) => { res.json(card); })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(errorsStatus.notFoundError)
          .send({ message: errorsMessages.isCardIdError });
      } if (err.name === 'CastError') {
        return res
          .status(errorsStatus.invalidDataError)
          .send({ message: errorsMessages.isInvalidDataError });
      }

      return res
        .status(errorsStatus.defaultError)
        .send({ message: errorsMessages.isServerError });
    });
};

module.exports.likeCard = (req, res) => {
  const cardId = req.params.cardId;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((updatedCardLikes) => { res.json(updatedCardLikes); })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(errorsStatus.notFoundError)
          .send({ message: errorsMessages.isCardIdError });
      } if (err.name === 'CastError') {
        return res
          .status(errorsStatus.invalidDataError)
          .send({ message: errorsMessages.isInvalidDataError });
      }

      return res
        .status(errorsStatus.defaultError)
        .send({ message: errorsMessages.isServerError });
    });
};

module.exports.disLikeCard = (req, res) => {
  const cardId = req.params.cardId;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((updatedCardLikes) => { res.json(updatedCardLikes); })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(errorsStatus.notFoundError)
          .send({ message: errorsMessages.isCardIdError });
      } if (err.name === 'CastError') {
        return res
          .status(errorsStatus.invalidDataError)
          .send({ message: errorsMessages.isInvalidDataError });
      }

      return res
        .status(errorsStatus.defaultError)
        .send({ message: errorsMessages.isServerError });
    });
};
