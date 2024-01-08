import { turso } from "@lib/turso";

async function result(quizId: string, userId: number) {
  try {
    const findQuizAndUser = await turso.execute({
      sql: `SELECT * FROM answer_sheet
            INNER JOIN question ON question.id = answer_sheet.question_id
            INNER JOIN answer ON answer.id = answer_sheet.answer_id
            INNER JOIN quiz ON quiz.id = question.quiz_id

            WHERE quiz.id = ? AND answer_sheet.user_id = ?;`,
      args: [quizId, userId],
    });

    if (findQuizAndUser.rows.length === 0) {
      return {
        status: "error",
        message: "Quiz or User not found",
      };
    }

    const rs = await turso.execute({
      sql: `SELECT SUM(is_correct) AS total_correct FROM answer_sheet

            INNER JOIN question ON question.id = answer_sheet.question_id
            INNER JOIN answer ON answer.id = answer_sheet.answer_id
            INNER JOIN quiz ON quiz.id = question.quiz_id
            
            WHERE quiz.id = ? AND answer_sheet.user_id = ?;`,
      args: [quizId, userId],
    });

    return {
      status: "ok",
      data: rs.rows,
    };
  } catch {}
}

export { result };
