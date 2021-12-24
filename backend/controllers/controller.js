// controllers/controller.js
const firstRequest = async (req, res, next) => {
    try {
        res.json({ message: "Hello from server!" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    firstRequest
}