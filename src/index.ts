import { Elysia } from "elysia";
import { logger } from "@grotto/logysia";
import userRoute from "@routes/User";
import quizRoute from "@routes/Quiz";
import questionRoute from "@routes/Question";
import answerRoute from "@routes/Answer";

const app = new Elysia();
app
  .use(logger())
  .use(userRoute)
  .use(quizRoute)
  .use(questionRoute)
  .use(answerRoute)
  .get("/test", () => {
    return {
      message: "Hello",
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
