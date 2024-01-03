import { turso } from "@lib/turso";

async function deleteQuiz(id: string) {
  try {
    const rs = await turso.execute({
      sql: "DELETE FROM quiz WHERE id = ?",
      args: [id],
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
    }
  }
}

export { deleteQuiz };
