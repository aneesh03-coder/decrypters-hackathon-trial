import { db } from "../../firebase";

export default async function handler(req, res) {
  const campaignId = req.body.paymentDetails.campaignId;

  if (req.method === "POST") {
    await db
      .collection("campaigns")
      .doc(campaignId)
      .collection("payments")
      .add(req.body.paymentDetails);
    return res.status(201).json({
      message: "Successfully saved to database",
      data: req.body.paymentDetails,
    });
  }
}
