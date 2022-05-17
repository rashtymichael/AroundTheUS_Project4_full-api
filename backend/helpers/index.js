function findData(model) {
  return (req, res, next) => {
    model.find({})
      .then((data) => { res.json(data); })
      .catch(next);
  };
}

function validateLink(val) {
  return /^http(s)?:\/{2}(w{3}\.)?[^.]\S+(\.\w)((\/)?[\S]*)*$/.test(val);
}

module.exports = {
  validateLink,
  findData,
};
