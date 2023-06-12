exports.GET = (req, res) => {
  const id = req.params.id;
  res.json(`La note du livre numéro ${id} est de 7/10`);
};
