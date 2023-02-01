const { open, writeFile, appendFile } = require("fs/promises");
const path = require("path");
const APIError = require("./APIError");

const errorHandler = {
  /**
   * Méthode de gestion des erreurs
   * @param {*} err - erreur survenue
   * @param {*} req - requête du client
   * @param {*} res - réponse du serveur
   * @param {*} _ - paramètre inutile (next)
   */
  manage(err, req, res, _) {
    // expess détecte 4 paramètres et va donc entrer dans cettes méthodes quand il y a une exception de levée

    // 1. j'écris les logs pour moi/équipe pour pouvoir débugguer
    errorHandler.logError(err, req.url);

    // 2. j'informe l'utilisateur
    res.status(err.code).json(err.message);
  },
  _404() {
    // 1. Je loggue l'erreur pour moi même afin d'investiguer
    //errorHandler.logError("404 - " + req.url);
    // 2. J'informe l'utilisateur qu'il y a une erreur
    //res.status(404).json("Page non trouvée");

    throw new APIError("Page non trouvée", 404);
  },
  _500(_, __, next) {
    //res.status(500).json("Erreur");

    //throw new APIError("Une erreur est survenue",500);

    // plutôt que de faire un "throw" on peut dans Express passer l'erreur en paramètre au next
    const error = new APIError("Une erreur est survenue", 500);
    next(error);
  },
  /**
   * Méthode pour écrire les fichiers de logs
   * @param {Error} err - erreur survenue
   * @param {string} url - url qui a conduit à l'erreur
   */
  async logError(err, url) {
    const separator = ";";
    // 1. Je vérifie si le fichier n'existe pas
    // on essaie d'ouvrir le fichier, s'il n'existe pas, on va avoir une erreur et donc on le crèe
    const filePath = getFilePath();
    let file;
    try {
      file = await open(filePath);
    } catch (errorOpen) {
      const columnsString =
        "Date" +
        separator +
        "Url" +
        separator +
        "Message" +
        separator +
        "Stacktrace\n";
      // je crèe mon fichier
      await writeFile(filePath, columnsString);
    }

    // 2. j'écris dans mon fichier
    try {
      const stackFormated = err.stack.replaceAll("\n", "");
      const line =
        new Date() +
        separator +
        url +
        separator +
        err.message +
        separator +
        stackFormated +
        "\n";
      await appendFile(filePath, line);
    } catch (errorWrite) {
      console.log(errorWrite);
    }

    // 3. je ferme mon fichier
    if (file) {
      await file.close();
    }
  },
};

module.exports = errorHandler;

/**
 * Méthode pour générer le chemin vers le fichier de log du jour
 * @returns chemin vers le fichier .log
 */
function getFilePath() {
  // je génère un chemin absolu vers mon dossier de logs
  const logsPath = path.resolve(__dirname, "../../../logs");
  const today = new Date();
  let month = today.getMonth() + 1;
  if (month < 10) {
    // je vérifie si c'est <10 pour ajouter un 0 devant
    month = "0" + month;
  }
  let day = today.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  const fileName = today.getFullYear() + "-" + month + "-" + day + ".log";

  return logsPath + "/" + fileName;
}
