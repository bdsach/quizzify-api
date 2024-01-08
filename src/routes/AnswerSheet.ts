import { Elysia, t } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";
import { HTTPStatus } from "../types/HTTPStatus";
import { add, result } from "@models/AnswerSheet";

const answerSheetRoute = new Elysia();

answerSheetRoute
  .use(
    jwt({
      name: "jwt",
      secret: String(process.env.JWT_SECRETS),
    })
  )
  .use(cookie())

  .post(
    "/answersheet",
    async ({ body, set, jwt, cookie }) => {
      try {
        const profile = await jwt.verify(cookie.token);

        if (!profile) {
          return {
            status: "error",
            message: "Unauthorized",
          };
        }
        
        const response = await add(
          body.question_id,
          body.answer_id,
          Number(body.user_id)
        );

        if (response?.status === "error") {
          set.status = HTTPStatus.CONFLICT;
          return response;
        }

        set.status = HTTPStatus.CREATED;

        return response;
      } catch (error) {
        console.log(error);
      }
    },
    {
      body: t.Object({
        question_id: t.String(),
        answer_id: t.String(),
        user_id: t.String(),
      }),
    }
  )

  .post(
    "/result",
    async ({ body, set, cookie, jwt }) => {
      try {
        const profile = await jwt.verify(cookie.token);

        if (!profile) {
          return {
            status: "error",
            message: "Unauthorized",
          };
        }

        const response = await result(body.quiz_id, body.user_id);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    {
      body: t.Object({
        quiz_id: t.String(),
        user_id: t.Number(),
      }),
    }
  );

export default answerSheetRoute;
