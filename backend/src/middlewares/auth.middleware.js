export const protectRoute = (req, res, next) => {
  if (!req.auth().isAuthtenticated) {
    return res
      .status(401)
      .json({ message: "Unauthorized you must be logged in" });
  }
  next();
};
