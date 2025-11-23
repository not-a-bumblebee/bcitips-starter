import { readDb, writeDb } from "../../database/database.js";
import crypto from "node:crypto";

export default {
  async findAll() {
    // TODO: get ahold of the db using readDb();
    let db = await readDb()

    // TODO: return the tips from the db
    return db.tips
  },

  async create({ title, userId }) {
    // TODO: get ahold of the db using readDb();
    let db = await readDb()

    // TODO: create a tip object containing { id: "some-random-id", title, userId }
    let tip = { id: crypto.randomUUID(), title, userId }
    // TODO: push the tip object into tips list in the database
    db.tips.push(tip)
    // TODO: write changes to database with await writeDb(db)
    await writeDb(db)
    // TODO: return the id of the created tip
    return tip.id
  },

  async update({ id, title, userId }) {
    // TODO: get ahold of the db using readDb();
    let db = await readDb()

    // TODO: find a tip in the db whose id & userId matches the incoming id & userId
    let tipIndex = db.tips.findIndex((x) => x.id == id && x.userId == userId)
    // TODO: if there is no matching tip, return false.
    if (tipIndex) {
      db.tips[tipIndex].title = title

      await writeDb(db)
      return true
    }
    return false
    // TODO: otherwise, set the found tip's title to the incoming title

    // TODO: write changes to database with await writeDb(db)
    // TODO: return true
  },

  async remove({ id, userId }) {
    // TODO: get ahold of the db using readDb();
    let db = await readDb()

    // TODO: find the INDEX of the tip in the db whose id & userId match the incoming id & userId
    let tipIndex = db.tips.findIndex((x) => x.id == id && x.userId == userId)

    // TODO: if there is no index (-1), return false.
    if (tipIndex) {
      db.tips.splice(tipIndex, 1)
      await writeDb(db)
      return true
    }
    return false
    // TODO: otherwise, use splice to delete from db.tips the tip based on the index
    // TODO: write changes to database with await writeDb(db)
    // TODO: return true
  },
};
