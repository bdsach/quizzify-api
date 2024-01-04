import { turso } from "@lib/turso";

// @ts-ignore
import { groupedQuestion } from "../../helpers/groupedQuestion";

async function quizById(id: string) {
  try {
    const rs = await turso.execute({
      sql: `
            SELECT
                quiz.id as quiz_id,
                quiz.text AS quiz_text,
                question.id AS question_id,
                question.text AS question_text,
                answer.id AS option_id,
                answer.text AS option_text,
                answer.option AS option_char,
                answer.is_correct
            FROM quiz
                LEFT JOIN question ON question.quiz_id = quiz.id
                LEFT JOIN answer ON answer.question_id = question.id
                WHERE quiz.id = ?
                ORDER BY quiz.id, question.id, answer.option;
                `,
      args: [id],
    });
    const result = groupedQuestion(rs.rows);

    return {
      status: "ok",
      data: result,
      // data: rs.rows,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error,
    };
  }
}

export { quizById };
