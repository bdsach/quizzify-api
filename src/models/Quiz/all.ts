import { turso } from "@lib/turso";

// @ts-ignore
import { groupedQuiz } from "../../helpers/groupedQuiz";

async function allQuiz() {
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
              answer.is_correct
          FROM quiz
              LEFT JOIN question ON question.quiz_id = quiz.id
              LEFT JOIN answer ON answer.question_id = question.id
              ORDER BY quiz.id, question.id, answer.id;
              `,
      args: [],
    });
    const result = groupedQuiz(rs.rows);

    return {
      status: "ok",
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error,
    };
  }
}

export { allQuiz };
