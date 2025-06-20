const auth = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== "12345") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export default auth;
