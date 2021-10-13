import express from "express";
import {
  createConnectAccount,
  getAccountStatus,
  getAccountBalance,
  payoutSetting
} from "../controllers/stripeController.js";
import { requireSignin } from "../middlewares/index.js";

const router = express.Router();

router.post("/create-connect-account", requireSignin, createConnectAccount);
router.post("/get-account-status",requireSignin, getAccountStatus);
router.post("/get-account-balance", requireSignin, getAccountBalance);
router.post("/payout-setting", requireSignin, payoutSetting)

export default router;
