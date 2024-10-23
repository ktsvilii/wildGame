import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  level: { type: Number, default: 1 },
  coins: { type: Number, default: 0 },
  currentScore: { type: Number, default: 0 },
  upgrades: {
    currentEnergyLevel: { type: Number, default: 1 },
    currentDamageLevel: { type: Number, default: 1 },
    currentRechargeLevel: { type: Number, default: 1 },
  },
  settings: {
    damage: { type: Number, default: 1 },
    maxEnergy: { type: Number, default: 500 },
    currentEnergy: { type: Number, default: 500 },
  },
  referral: { referredBy: String },
  friends: [{ referred: String, receivedBonus: Number }],
});

const User = mongoose.model('User', userSchema);

export default User;
