// @desc GET All Bootcamps
// @routes GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = (req, res, next) => {
  res
    .status(200)
    .json({ name: "Raushan ", todos: "Bootcamps", hello: req.hello });
};

// @desc GET Single Bootcamp
// @routes GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ name: "Raushan ", todos: "Bootcamps" });
};

// @desc Create New Bootcamps
// @routes POST /api/v1/bootcamps
// @access Private
exports.createBootcamp = (req, res, next) => {
  res.status(201).json({
    name: "Raushan ",
    todos: "create new Bootcamps",
  });
};

// @desc Update New Bootcamps
// @routes PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = (req, res, next) => {
  res.status(201).json({
    name: "Raushan ",
    todos: "Put Bootcamps",
  });
};

// @desc Delete New Bootcamps
// @routes DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(201).json({ name: "Raushan ", todos: "Delete Bootcamps" });
};
