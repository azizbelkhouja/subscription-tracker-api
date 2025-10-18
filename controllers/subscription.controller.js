import Subscription from '../models/subscription.model.js';

// Create a new subscription
export const createSubscription = async (req, res, next) => {
  try {
    const subscription = new Subscription(req.body);
    await subscription.save();
    res.status(201).json(subscription);
  } catch (error) {
    next(error);
  }
};

// Get subscriptions for a specific user
export const getUserSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.params.userId });
    res.status(200).json(subscriptions);
  } catch (error) {
    next(error);
  }
};

// Update a subscription by ID
export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.status(200).json(subscription);
  } catch (error) {
    next(error);
  }
};

// Cancel a subscription by ID
export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(req.params.id, { status: 'canceled' }, { new: true });
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.status(200).json(subscription);
  } catch (error) {
    next(error);
  }
};