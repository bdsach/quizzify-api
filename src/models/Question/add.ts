import { turso } from "@lib/turso";
import { ulid } from "ulidx";

async function addQuestion(quizId: string, text: string, answers: any[]) {
  const transaction = await turso.transaction("write");

  try {
    const rs = transaction.execute({
      sql: `
            INSERT INTO question (id, text, quiz_id) VALUES (?, ?, ?);
            `,
      args: [ulid(), text, quizId],
    });

    const selectResult = await transaction.execute({
      sql: "SELECT * FROM question WHERE rowid = last_insert_rowid()",
      args: [],
    });

    const questionId = selectResult.rows[0].id;

    for (const answer of answers) {
      const rs = transaction.execute({
        sql: `
            INSERT INTO answer (id, text, is_correct, option, question_id) VALUES (?, ?, ?, ?, ?);
            `,
        args: [
          ulid(),
          answer.text,
          answer.is_correct,
          answer.option,
          questionId,
        ],
      });
    }
    await transaction.commit();
    return {
      status: "ok",
      message: "Question created",
    };
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return {
      status: "error",
      message: error,
    };
  }
}

export { addQuestion };
