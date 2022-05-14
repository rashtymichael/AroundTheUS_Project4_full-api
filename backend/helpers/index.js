const { errorsStatus, errorsMessages } = require('../constants/errors');

function findData(model) {
  return (req, res) => {
    model.find({})
      .then((data) => { res.json(data); })
      .catch(() => {
        res.status(errorsStatus.defaultError).send({ message: errorsMessages.isServerError });
      });
  };
}

function validateLink(val) {
  return /^http(s)?:\/{2}(w{3}\.)?[^.]\S+(\.\w)((\/)?[\S]*)*$/.test(val);
}

module.exports = {
  validateLink,
  findData,
};
