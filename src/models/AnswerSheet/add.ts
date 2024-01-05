import { turso } from "@lib/turso";
import { ulid } from "ulidx";

async function add(questionId: string, answerId: string, userId: number) {
  try {
    const findQuestion = await turso.execute({
      sql: `SELECT id FROM question WHERE id = ?;`,
      args: [questionId],
    })

    if (findQuestion.rows.length === 0) {
      return {
        status: "error",
        message: "Question not found",
      }
    }

    const findAnswer = await turso.execute({
      sql: `SELECT id FROM answer WHERE id = ?;`,
      args: [answerId],
    })

    if (findAnswer.rows.length === 0) {
      return {
        status: "error",
        message: "Answer not found",
      }
    }

    // if check already submitted
    const findAnswerSheet = await turso.execute({
      sql: `SELECT id FROM answer_sheet WHERE question_id = ? AND answer_id = ? AND user_id = ?;`,
      args: [questionId, answerId, userId],
    })

    if (findAnswerSheet.rows.length > 0) {
      return {
        status: "error",
        message: "Already submitted",
      }
    }

    const rs = await turso.execute({
      sql: `INSERT INTO answer_sheet (id, question_id, answer_id, user_id) VALUES (?, ?, ?, ?);`,
      args: [ulid(), questionId, answerId, userId],
    });

    return {
      status: "ok",
      message: "AnswerSheet is submitted",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error,
    };
  }
}

export { add };
