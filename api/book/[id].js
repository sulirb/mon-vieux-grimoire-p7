exports.GET = (req, res) => {
  const id = req.params.id;
  res.json(`On est sur le livre numéro ${id}`);
};
