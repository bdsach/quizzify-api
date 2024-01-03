import { turso } from "@lib/turso";
import { ulid } from "ulidx";

async function addQuiz(text: string) {
    try {
      const rs = await turso.execute({
        sql: "INSERT INTO quiz (id, text) values (?, ?)",
        args: [ulid(), text],
      });
      return {
        status: "ok",
        message: "Quiz created",
      };
    } catch (error) {
      console.log(error);
    }
  }

export { addQuiz };