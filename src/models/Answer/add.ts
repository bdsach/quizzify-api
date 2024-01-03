import { turso } from "@lib/turso";
import { ulid } from "ulidx";

async function addAnswer(questionId: string, answers: any[]) {
    try {
        const findQuiz = await turso.execute({
            sql: `
            SELECT id FROM question WHERE id = ?
            `,
            args: [questionId],
        })

        if (findQuiz.rows.length === 0) {
            return {
                status: "error",
                message: "Question not found",
            }
        }

        for (const answer of answers) {
            const rs = await turso.execute({
                sql: `
                INSERT INTO answer (id, text, is_correct, option, question_id) VALUES (?, ?, ?, ?, ?);
                `,
                args: [ulid(), answer.text, answer.is_correct, answer.option, questionId],
            })
        }

        return {
            status: "ok",
            message: "Answer created",
        }
        
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: error,
        }
    }
}


export { addAnswer };

