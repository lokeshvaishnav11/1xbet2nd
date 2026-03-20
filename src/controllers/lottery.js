const cron = require("node-cron");
const connection = require("../config/connectDB"); // Update the path if needed

// Generate round_id like "20250501-0925"

console.log("lottey controller is runnnign !");

function generateRoundId() {
  const now = new Date();
  const date = now.toISOString().split("T")[0].replace(/-/g, "");
  const time = `${now.getHours()}${now.getMinutes()}`;
  return `${date}-${time}`;
}

const generateRoundChicken = () => {
  const now = new Date();

  const pad = (num, size = 2) => String(num).padStart(size, "0");

  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);       // Months are 0-based
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());
  const milliseconds = pad(now.getMilliseconds(), 3); // pad to 3 digits

  // Optional: Use only first 2 digits of milliseconds (SS format)
  const msShort = milliseconds.slice(0, 2); // eg. "57"

  return `${year}${month}${day}${hours}${minutes}${seconds}${msShort}`;
};


// 🔁 Create new lottery round at 9:25 AM every day
cron.schedule("00 19 * * *", async () => {
  try {
    const roundId = generateRoundId();

    const sql = `INSERT INTO lottery (round_id, status, result,type) VALUES (?, ?, ?,?)`;
    await connection.query(sql, [roundId, true, false, "small"]);

    console.log(
      `✅ [${new Date().toLocaleString()}] New lottery round created: ${roundId}`
    );
  } catch (error) {
    console.error("❌ Error inserting lottery round:", error);
  }
});

// 🔁 Close the round at 3:30 PM every day
cron.schedule("00 17 * * *", async () => {
  try {
    // Get the latest active lottery round
    const [rows] = await connection.query(
      "SELECT round_id FROM lottery WHERE status = true AND type ='small' ORDER BY id DESC LIMIT 1"
    );

    if (rows.length === 0) {
      return console.log("⚠️ No active lottery round to close at 3:30 PM");
    }

    const roundId = rows[0].round_id;

    const sql = `UPDATE lottery SET status = false WHERE round_id = ?`;
    await connection.query(sql, [roundId]);

    console.log(
      `✅ [${new Date().toLocaleString()}] Lottery round closed: ${roundId}`
    );
  } catch (error) {
    console.error("❌ Error closing lottery round:", error);
  }
});

// weekly lottey inserting

// 🆕 Create lottery round every Monday at 12:00 AM
cron.schedule("0 0 * * 1", async () => {
  try {
    const roundId = generateRoundId();

    const sql = `INSERT INTO lottery (round_id, status, result,type) VALUES (?, ?, ?,?)`;
    await connection.query(sql, [roundId, true, false, "big"]);

    console.log(
      `✅ [${new Date().toLocaleString()}] New weekly lottery round created: ${roundId}`
    );
  } catch (error) {
    console.error("❌ Error inserting weekly lottery round:", error);
  }
});

// 🔁 Close the round every Sunday at 12:00 AM (start of Sunday)
cron.schedule("0 0 * * 0", async () => {
  try {
    const [rows] = await connection.query(
      "SELECT round_id FROM lottery WHERE status = true AND type = 'big' ORDER BY id DESC LIMIT 1"
    );

    if (rows.length === 0) {
      return console.log("⚠️ No active weekly lottery round to close");
    }

    const roundId = rows[0].round_id;

    const sql = `UPDATE lottery SET status = false WHERE round_id = ?`;
    await connection.query(sql, [roundId]);

    console.log(
      `✅ [${new Date().toLocaleString()}] Weekly lottery round closed: ${roundId}`
    );
  } catch (error) {
    console.error("❌ Error closing weekly lottery round:", error);
  }
});

const checkLottery = async (req, res) => {
  try {
    const sql = `SELECT * FROM lottery WHERE status = 1 ORDER BY id DESC`;
    const [rows] = await connection.query(sql);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ msg: "No lottery entries found." });
    }

    return res.json(rows);
  } catch (error) {
    console.error("Error fetching latest lottery:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};



const updateChickWallet = async (req, res) => {
  const auth = req.cookies.auth;
  console.log(auth, "chicken frontend");

  if (!auth) {
    return res.redirect("/login");
  }

  try {
    const [user] = await connection.query(
      "SELECT `phone`, `code`, `invite`, `money`, `win_wallet` FROM users WHERE `token` = ?",
      [auth]
    );

    if (!user || user.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    const phone = user[0].phone;
    let win_wallet = Number(user[0].win_wallet) || 0;
    let money = Number(user[0].money) || 0;
    const amount = Number(req.body.amount); // can be negative or positive

    console.log(req.body, "update wallet");
    console.log("Before update:", { win_wallet, money });

    if (isNaN(amount)) {
      return res.status(400).json({ msg: "Invalid amount" });
    }

    if (amount >= 0) {
      // Positive amount: just add to win_wallet
      win_wallet += amount;
    } else {
      // Negative amount: deduct from win_wallet first, then money if needed
      let absAmount = Math.abs(amount);

      if (win_wallet >= absAmount) {
        win_wallet -= absAmount;
      } else {
        absAmount -= win_wallet;
        win_wallet = 0;

        if (money >= absAmount) {
          money -= absAmount;
        } else {
          return res.status(400).json({ msg: "Insufficient balance" });
        }
      }
    }

    // Update both wallets
    await connection.query(
      "UPDATE users SET win_wallet = ?, money = ? WHERE phone = ?",
      [win_wallet, money, phone]
    );

    console.log("After update:", { win_wallet, money });

    return res.json({
      msg: "Wallet updated",
      win_wallet,
      money,
    });

  } catch (error) {
    console.error("Error updating wallet:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};



const betchicken = async (req, res) => {
  const auth = req.cookies.auth;
  console.log(auth, "chicken frontend");
  console.log(req.body, "update chicken bet n crash");

  if (!auth) {
    return res.redirect("/login");
  }

  try {
    const [user] = await connection.query(
      "SELECT `phone`, `code`, `invite`, `money`, `win_wallet` FROM users WHERE `token` = ?",
      [auth]
    );

    console.log(user, "user of chicken ");

    if (!user || user.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    const gameroundId = generateRoundChicken();
    console.log(gameroundId)
    const phone = user[0].phone;

     // 👇 Insert into `chicken` table
     await connection.query(
      "INSERT INTO chicken (roundId, amount, crash, win, phone) VALUES (?, ?, ?, ?, ?)",
      [gameroundId, req.body.betamt, req.body.crash, req.body.profitout, phone]
    );

    return res.status(200).json({ msg: "Chicken bet recorded", roundId: gameroundId });


   
  } catch (error) {
    console.error("Error updating wallet:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};


const getChickenHistory = async (req, res) => {
  const auth = req.cookies.auth;

  if (!auth) {
    return res.redirect("/login");
  }

  try {
    // Get user based on token
    const [user] = await connection.query(
      "SELECT phone FROM users WHERE token = ?",
      [auth]
    );

    if (!user || user.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    const phone = user[0].phone;

    // 🔎 Fetch last 24 hours of bet history for that phone number
    const [history] = await connection.query(
      `SELECT roundId, amount, crash, win, phone, created_at 
       FROM chicken 
       WHERE phone = ? AND created_at >= NOW() - INTERVAL 1 DAY 
       ORDER BY created_at DESC`,
      [phone]
    );

    return res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching chicken history:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};



const ticketBook = async (req, res) => {
  const { betRoundId, number, price, type } = req.body;

  const auth = req.cookies.auth;
  console.log(auth, "auth is here from frontend ");
  if (!auth) {
    return res.redirect("/login");
  }

  const [user] = await connection.query(
    "SELECT `phone`, `code`,`invite`, `money`,`win_wallet` FROM users WHERE `token` = ? ",
    [auth]
  );
  console.log(user, "user is here");
  const phone = user[0]?.phone;
  console.log();

  try {
    // Check if round_id exists in lottery table
    if (user[0].win_wallet + user[0]?.money < price)
      return res.status(204).json({
        msg: "Balance is too less ! Please Recharge in Your Account ",
        isStatus: false,
      });



      const [check] = await connection.query(
        "SELECT `phone` FROM lottery_bet WHERE `phone` = ? AND `roundId` = ? AND `number` = ? AND `price` = ? AND `type` = ?",
        [phone, betRoundId, number, price, type]
      );

      console.log(check,"check is here")
      
      if (check.length > 0) {
        return res.status(200).json({ msg: "Number already Purchased!", isStatus: false });
      }

    if (user[0].win_wallet >= price) {
      await connection.query(
        "UPDATE users SET win_wallet = win_wallet - ? WHERE phone = ?",
        [price, phone]
      );
    } else {
      await connection.query(
        "UPDATE users SET win_wallet = 0, money = money- ? WHERE phone = ?",
        [price - user[0].win_wallet, phone]
      );
    }

    const [row] = await connection.query(
      `SELECT * FROM lottery WHERE round_id = ?`,
      [betRoundId]
    );

    if (!row || row.length === 0) {
      return res
        .status(200)
        .json({ msg: "This Round ID Lottery doesn't exist!", isStatus: false });
    }

    // Insert into lottery_bet table
    const insertQuery = `
          INSERT INTO lottery_bet (roundId, number, price, type,phone)
          VALUES (?, ?, ?, ?,?)
        `;

    await connection.query(insertQuery, [
      betRoundId,
      number,
      price,
      type,
      phone,
    ]);

    return res
      .status(200)
      .json({ msg: "Bet placed successfully!", isStatus: true });
  } catch (error) {
    console.error("Error placing bet:", error);
    return res
      .status(500)
      .json({ msg: "Internal Server Error", isStatus: false });
  }
};



const history = async (req, res) => {
  const auth = req.cookies.auth;
  console.log(auth, "auth is here from frontend ");
  if (!auth) {
    return res.redirect("/login");
  }

  const [user] = await connection.query(
    "SELECT `phone`, `code`,`invite`, `money`,`win_wallet` FROM users WHERE `token` = ? ",
    [auth]
  );
  console.log(user, "user is here");
  const phone = user[0]?.phone;

  const [history] = await connection.query(
    `SELECT * FROM lottery_bet WHERE phone = ? AND created_at >= NOW() - INTERVAL 48 HOUR`,
    // `SELECT * FROM lottery_bet WHERE phone = ?`,

    [phone]
  );

  if (!history) {
    return res.status(203).json({ msg: "History is not found" });
  }

  res.status(200).json(history);
};

const lotteryList = async (req, res) => {
  const [row] = await connection.query(
    `SELECT * FROM lottery WHERE result = 0`
  );
  try {
    if (row.length > 0) {
      return res.status(200).json({ data: row });
    }
    res.status(200).json({ data: "No Result Pending !" });
  } catch (error) {
    return res.status(500).json({ data: "Internal server Error !" });
  }
};

// function for updating user wallet and user pending lottery status !

// const lottery_cal = async (id, data) => {
//   if (!id || !data) return false;

//   console.log(data, "datanalhdjlkflmflfllo");

//   try {
//     const [bet] = await connection.query(
//       "SELECT * FROM lottery_bet WHERE roundId = ?",
//       [id]
//     );

//     const Big_lottery = {
//       51: 5100,
//       100: 11000,
//       151: 21000,
//       251: 50000,
//       500: 100000,
//     };

//     console.log(bet, "bet data jhkolphgvjbkl;");

//     if (bet.length === 0) return true;

//     const promises = bet.map(async (item) => {
//       const result = data[item.price];
//       console.log(result, "result data ");
//       const isWin = result.includes(item.number);
//       console.log(isWin,"iswin")

//       if (isWin && item.type == "small") {
//         await connection.query(
//           `UPDATE users SET win_wallet = win_wallet + ? WHERE phone = ?`,
//           [item.price * 20, item.phone]
//         );

//         await connection.query(
//           `UPDATE lottery_bet SET result = ? WHERE id = ?`,
//           ["won", item.id]
//         );
//       } else {
//         await connection.query(
//           `UPDATE lottery_bet SET result = ? WHERE id = ?`,
//           ["loss", item.id]
//         );
//       }
//       if (isWin && item.type == "big") {
//         await connection.query(
//           `UPDATE users SET win_wallet = win_wallet + ? WHERE phone = ?`,
//           [Big_lottery[price], item.phone]
//         );

//         await connection.query(
//           `UPDATE lottery_bet SET result = ? WHERE id = ?`,
//           ["won", item.id]
//         );
//       } else {
//         await connection.query(
//           `UPDATE lottery_bet SET result = ? WHERE id = ?`,
//           ["loss", item.id]
//         );
//       }
//     });

//     // Wait for all updates to complete
//     await Promise.all(promises);
//     return true;
//   } catch (error) {
//     console.error("❌ Error in lottery_cal:", error);
//     return false;
//   }
// };

const lottery_cal = async (id, data) => {
  if (!id || !data) return false;

  console.log(data, "🔍 Incoming result data");

  try {
    const [bet] = await connection.query(
      "SELECT * FROM lottery_bet WHERE roundId = ?",
      [id]
    );

    const Big_lottery = {
      51: 5100,
      100: 11000,
      151: 21000,
      251: 50000,
      500: 100000,
    };

    if (!bet || bet.length === 0) return true;

    const promises = bet.map(async (item) => {
      const result = data[item.price]; // data = { 51: [123, 456, ...] }
      const isWin = result?.includes(item.number);

      console.log({ item, result, isWin }, "🔍 Checking bet result");

      if (isWin) {
        let winAmount = 0;

        if (item.type === "small") {
          winAmount = item.price * 20;
        } else if (item.type === "big") {
          winAmount = Big_lottery[item.price] || 0;
        }

        if (winAmount > 0) {
          await connection.query(
            `UPDATE users SET win_wallet = win_wallet + ? WHERE phone = ?`,
            [winAmount, item.phone]
          );

          await connection.query(
            `UPDATE lottery_bet SET result = ? WHERE id = ?`,
            ["won", item.id]
          );
        } else {
          // Invalid price or mapping not found
          await connection.query(
            `UPDATE lottery_bet SET result = ? WHERE id = ?`,
            ["loss", item.id]
          );
        }
      } else {
        await connection.query(
          `UPDATE lottery_bet SET result = ? WHERE id = ?`,
          ["loss", item.id]
        );
      }
    });

    await Promise.all(promises);
    return true;
  } catch (error) {
    console.error("❌ Error in lottery_cal:", error);
    return false;
  }
};


const setLotteryResult = async (req, res) => {
  console.log(req.body, "get result");
  const { type, data, roundId } = req.body;

  if (!type || !data || !roundId)
    return res.status(203).json({ msg: "please share all details !" });

  const resultofcal = await lottery_cal(roundId, data);
  if (!resultofcal)
    return res
      .status(200)
      .json({ msg: "Error in Bet Calcuation Please Try Again Results !" });

  await connection.query(
    "INSERT INTO lottery_result (round_id, type, data) VALUES (?, ?, ?)",
    [roundId, type, JSON.stringify(data)]
  );

  await connection.query(
    `UPDATE lottery SET result = ?, status = ? WHERE round_id = ?`,
    [true, false, roundId.toString()]
  );

  res.status(200).json({ msg: "Result Suceesfully Updated !" });
};

const lotteryData = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(204).json({ msg: "Round Id is Not Defined" });

  try {
    const [rows] = await connection.query(
      "SELECT * FROM lottery_bet WHERE roundId = ?",
      [id]
    );

    return res.status(200).json({ data: rows });
  } catch (error) {
    console.error("❌ Error fetching lottery data:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

console.log("check resuklttt1111 ");

const lotteryFinalResult = async (req, res) => {
  console.log("check resuklttt 122222 ");
  try {
    const [rows] = await connection.query("SELECT * FROM lottery_result WHERE created_at >= NOW() - INTERVAL 48 HOUR");
    // const [rows] = await connection.query("SELECT * FROM lottery_result");


    // Format each row's `data` field
    const formattedRows = rows.map((row) => {
      try {
        const parsedData = JSON.parse(row.data); // parse JSON string
        const formattedData = Object.entries(parsedData).map(
          ([key, value]) => ({
            [key]: value.join(","),
          })
        );
        return { ...row, data: formattedData }; // replace original data with formatted
      } catch (e) {
        // If parsing fails, keep original data
        return { ...row, data: [] };
      }
    });

    res.json({ success: true, data: formattedRows });
  } catch (error) {
    console.error("Error fetching lottery results:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

console.log("check resuklttt  3333");

module.exports = {
  checkLottery,
  ticketBook,
  history,
  lotteryList,
  setLotteryResult,
  lotteryData,
  lotteryFinalResult,
  updateChickWallet,
  betchicken,
  getChickenHistory
};
