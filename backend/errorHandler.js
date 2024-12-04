
const errorHandler = (err, req, res, next) => {
    const response = {
        success: false,
        message: err.message,
        // Ajoute le chemin (stack trace) uniquement si l'environnement est de développement pour éviter les fuites d'informations
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };

    res.status(err.status || 500).json(response);
};

// Retournons notre middleware
module.exports = errorHandler;