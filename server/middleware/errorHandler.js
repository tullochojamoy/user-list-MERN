const errorHandler = (error, req, res, next) => {
    return res.status(400).send({
        error: error.message,
        message: error.message,
        success: false
    });
}

module.exports = errorHandler;