import { db } from "../../firebase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await db
      .collection("campaigns")
      .doc("JOeQs6QIAMobFb1ZJ5Rt")
      .collection("payments")
      .get()
      .then((querySnapshot) => {
        let payments = [];
        querySnapshot.forEach((doc) => {
          payments.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        return res.status(200).json(payments);
      });
  }
}
