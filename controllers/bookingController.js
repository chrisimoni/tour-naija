const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('./../models/tourModel');
const catchAsyn = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');
// const factory = require('./handleFactory');

exports.getCheckoutSession = catchAsyn(async (req, res, next) => {
  //Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);

  //Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1
      }
    ]
  });

  //Create session as response
  res.status(200).json({
    status: 'success',
    session
  });
});
