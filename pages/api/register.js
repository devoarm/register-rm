import db_rm from "../../config/db_rm";
var md5 = require("md5");

export default async function handler(req, res) {
  if (req.method === "POST") {
    let data = JSON.parse(req.body);
    try {
      let checkName = await db_rm("user")
        .where({
          fullname: data.fullname,
        })
        .select("*");
      let checkUser = await db_rm("user")
        .where({
          loginname: data.loginname,
        })
        .select("*");

      if (checkName.length > 0) {
        res.status(401).json({
          status: 401,
          msg: "hasName",
          data: checkName,
        });
      } else if (checkUser.length > 0) {
        res.status(401).json({
          status: 401,
          msg: "hasUser",
          data: checkUser,
        });
      } else {
        let query = await db_rm("user").insert({
          fullname: data.fullname,
          loginname: data.loginname,
          password: md5(data.password),
          person_id: data.person_id,
          dept: data.dept,
          level: data.level,
          header: data.header,
          dept_view: `[${data.dept}]`,
        });
        res.status(200).json({
          status: 200,
          results: query,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        results: error.message,
        data: data,
      });
    }
  }
}
