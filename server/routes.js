const express = require("express");
const db = require("./db.js");

const router = express.Router();

const checkPermission = async (req, res, next) => {
  const { permission } = req.query;
  const { role } = req.user;

  const permissions = {
    USER_ACCOUNT_READ_PAGE: ["ROOT"],
    USER_ACCOUNT_CREATE_PAGE: ["ROOT"],
    USER_ACCOUNT_UPDATE_PAGE: ["ROOT"],
    USER_ACCOUNT_DELETE_PAGE: ["ROOT"],
  };

  if (permissions[permission] && permissions[permission].includes(role)) {
    next();
  } else {
    res.status(403).json({ error: "Permission denied" });
  }
};

router.get("/users", checkPermission, async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM USERS");
    res.json(result.rows);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/users", checkPermission, async (req, res) => {
  try {
    const {
      email,
      password,
      secondary_email,
      gsm,
      firstname,
      lastname,
      locale,
      timezone,
      status,
    } = req.body;

    const query = `
      INSERT INTO USERS (
        email,
        password,
        secondary_email,
        gsm,
        firstname,
        lastname,
        locale,
        timezone,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;

    await db.query(query, [
      email,
      password,
      secondary_email,
      gsm,
      firstname,
      lastname,
      locale,
      timezone,
      status,
    ]);

    res.send("User added successfully");
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.put("/users/:userId", checkPermission, async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      email,
      password,
      secondary_email,
      gsm,
      firstname,
      lastname,
      locale,
      timezone,
      status,
    } = req.body;

    const query = `
      UPDATE USERS
      SET
        email = $1,
        password = $2,
        secondary_email = $3,
        gsm = $4,
        firstname = $5,
        lastname = $6,
        locale = $7,
        timezone = $8,
        status = $9
      WHERE user_id = $10
    `;

    await db.query(query, [
      email,
      password,
      secondary_email,
      gsm,
      firstname,
      lastname,
      locale,
      timezone,
      status,
      userId,
    ]);

    res.send("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.delete("/users/:userId", checkPermission, async (req, res) => {
  try {
    const { userId } = req.params;

    const query = "DELETE FROM USERS WHERE user_id = $1";

    await db.query(query, [userId]);

    res.send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
