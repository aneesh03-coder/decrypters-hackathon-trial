import { db } from "../../firebase";

export default async function handler(req, res) {
  let newCampaign = req.body.newCampaign;
  if (
    newCampaign.patient_image?.length == 0 ||
    newCampaign.patient_image == null ||
    isEmpty(newCampaign.patient_image)
  ) {
    newCampaign = {
      ...newCampaign,
      patient_image:
        "https://washingtonmonthly.com/wp-content/uploads/2019/10/iStock-1046447804.jpg",
    };
  }
  if (req.method === "POST") {
    await db.collection("campaigns").add(newCampaign);
    return res
      .status(201)
      .json({ message: "Successfully saved to database", data: newCampaign });
  }
}
