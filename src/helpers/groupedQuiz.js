export const groupedQuiz = (flatResults) => {
  const nestedData = {};

  flatResults.forEach((row) => {
    if (!nestedData[row.quiz_id]) {
      nestedData[row.quiz_id] = {
        id: row.quiz_id,
        title: row.quiz_title,
        description: row.quiz_description,
        questions: [],
      };
    }

    let currentQuestion = nestedData[row.quiz_id].questions.find(
      (question) => question.id === row.question_id
    );

    if (!currentQuestion) {
      currentQuestion = {
        id: row.question_id,
        quiz_id: row.quiz_id,
        question_text: row.question_text,
        options: [],
      };
      nestedData[row.quiz_id].questions.push(currentQuestion);
    }

    const currentOption = {
      id: row.option_id,
      text: row.option_text,
      is_correct: row.is_correct,
    };

    currentQuestion.options.push(currentOption);
  });

  return { quiz: Object.values(nestedData) };
};