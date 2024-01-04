import { turso } from "@lib/turso";

async function allCategories() {
  try {
    const rs = await turso.execute({
      sql: `SELECT * FROM quiz;`,
      args: [],
    });
    

    return {
      status: "ok",
      data: rs.rows,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error,
    };
  }
}

export { allCategories };
