const sharp = require("sharp");
const fs = require("fs");
const { HttpError } = require("./error");

const optimizeImage = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new HttpError("Aucun fichier image téléchargé");
    }

    const tempFilePath = `images/${req.file.filename}_temp`; // Chemin de fichier temporaire pour l'image optimisée
    const maxImageWidth = 800;
    const maxImageHeight = 600;

    await sharp(req.file.path)
      .resize(maxImageWidth, maxImageHeight, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFile(tempFilePath);

    fs.unlinkSync(req.file.path);
    fs.renameSync(tempFilePath, `images/${req.file.filename}`);

    next();
  } catch (error) {
    throw new HttpError(400, {
      message: "Une erreur s'est produite lors de l'optimisation de l'image",
    });
  }
};

module.exports = optimizeImage;
