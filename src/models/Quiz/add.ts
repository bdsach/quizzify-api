import { turso } from "@lib/turso";
import { ulid } from "ulidx";

async function addQuiz(text: string, slug: string) {
    try {
      const rs = await turso.execute({
        sql: "INSERT INTO quiz (id, text, slug) values (?, ?, ?)",
        args: [ulid(), text, slug],
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