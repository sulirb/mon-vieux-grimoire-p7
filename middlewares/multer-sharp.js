const sharp = require("sharp");
const fs = require("fs");
const { HttpError } = require("./error");

const optimizeImage = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new HttpError("Aucun fichier image téléchargé");
    }

    const tempFilePath = `images/${req.file.filename}_temp`; // Chemin de fichier temporaire pour l'image optimisée

    // Utiliser Sharp pour optimiser l'image
    await sharp(req.file.path)
      .resize(800, 600) // Redimensionner l'image à une largeur de 800 pixels et une hauteur de 600 pixels
      .jpeg({ quality: 80 }) // Réduire la qualité de l'image à 80%
      .toFile(tempFilePath); // Sauvegarder l'image optimisée dans un fichier temporaire

    // Supprimer le fichier d'origine
    fs.unlinkSync(req.file.path);

    // Renommer le fichier temporaire avec le nom final
    fs.renameSync(tempFilePath, `images/${req.file.filename}`);

    // Passer à l'étape suivante du middleware
    next();
  } catch (error) {
    // Gérer les erreurs
    console.error(error);
    res.status(400).json({
      message: "Une erreur s'est produite lors de l'optimisation de l'image",
    });
  }
};

module.exports = optimizeImage;
