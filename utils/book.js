function bookObjectById(req) {
  return req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
}

function bookObjectPost(req) {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  return bookObject;
}

module.exports = { bookObjectById, bookObjectPost };
