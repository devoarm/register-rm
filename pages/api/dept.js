import db_rm from "../../config/db_rm";
var md5 = require("md5");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let query = await db_rm("dept").select("*");
      res.status(200).json({
        status: 200,
        results: query,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        results: error.message,
      });
    }
  }
}
