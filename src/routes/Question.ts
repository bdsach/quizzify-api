import { Elysia, t } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";
import { addQuestion } from "@models/Question";

import { HTTPStatus } from "../types/HTTPStatus";

const questionRoute = new Elysia();

questionRoute
  .use(
    jwt({
      name: "jwt",
      secret: String(process.env.JWT_SECRETS),
    })
  )
  .use(cookie())

  .post(
    "/question",
    async ({ body, set, jwt, cookie }) => {
      try {
        const profile = await jwt.verify(cookie.token);

        if (!profile) {
          return {
            status: "error",
            message: "Unauthorized",
          };
        }

        const response = await addQuestion(
          body.quiz_id,
          body.text,
          body.answers
        );

        if (response?.status === "error") {
          set.status = HTTPStatus.INTERNAL_SERVER_ERROR;
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
        text: t.String(),
        quiz_id: t.String(),
        answers: t.Array(
          t.Object({
            text: t.String(),
            is_correct: t.Boolean(),
            option: t.String(),
          })
        ),
      }),
    }
  );

export default questionRoute;
