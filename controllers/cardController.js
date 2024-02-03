const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Card = require("../models/CardModel");

//Get All Cards
exports.getCards = catchAsyncErrors(async (req, res, next) => {
  const cards = req.user
    ? await Card.find()
    : await Card.find({ status: "approved" });

  res.status(200).json({
    success: true,
    cards,
  });
});

//Get a Single Card
exports.getCard = catchAsyncErrors(async (req, res, next) => {
  const card = await Card.findById(req.params.id);

  if (!card) {
    return next(new ErrorHandler("Card not found.", 404));
  }

  res.status(200).json({
    success: true,
    card,
  });
});

//Create a Card
exports.createCard = catchAsyncErrors(async (req, res, next) => {
  const { title, category, description } = req.body;
  let status = "pending";
  if (req.user && req.user.role === "user") {
    status = "approved";
  }
  const card = await Card.create({
    title,
    category,
    description,
    status,
  });
  res.status(201).json({
    success: true,
    card,
  });
});

//Approve a Card
exports.approveCard = catchAsyncErrors(async (req, res, next) => {
  let card = await Card.findById(req.params.id);

  if (!card) {
    return next(new ErrorHandler("Card not found.", 404));
  }

  let newStatus= card.status === "approved" ? "pending" : "approved";

  card = await Card.findByIdAndUpdate(
    req.params.id,
    { status: newStatus },
    {
      new: true,
    }
  );

  res.status(200).json({
    success: true,
    card,
  });
});

//Update a Card
exports.updateCard = catchAsyncErrors(async (req, res, next) => {
  let card = await Card.findById(req.params.id);

  if (!card) {
    return next(new ErrorHandler("Card not found.", 404));
  }

  card = await Card.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    card,
  });
});
