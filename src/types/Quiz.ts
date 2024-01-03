interface Quiz {
    id: string
    title: string
    questions: Question[]
}

interface Question {
    id: string;
    text: string;
    answers: Answer[]
}

interface Answer {
    id: string
    text: string
}

interface AnswerSheet {
    id: string
    text: string
}