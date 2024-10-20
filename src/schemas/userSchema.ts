import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  level: { type: Number, default: 1 },
  coins: { type: Number, default: 0 },
  upgrades: { coinsPerTap: { type: Number, default: 1 }, maxEnergy: { type: Number, default: 1000 } },
  energy: { type: Number, default: 1000 },
  referral: { referredBy: String, referralBonus: Number },
});
