exports.data_validation = (req, res, next) => {
  Keys_name = ["email", "name"];
  Object.keys(req.body).forEach(function (key) {
    if (Keys_name.includes(key)) {
    } else {
      return res.status(500).json({ msg: "Value not found" });
    }
  });
  const { email, name } = req.body;
  if (email == null || name == null || name == "" || email == "") {
    return res.status(500).json({ msg: "Value not found" });
  } else {
    console.log(name);
    return res.status(200).json({ msg: "Have values" });
  }
};
