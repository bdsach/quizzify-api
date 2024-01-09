DROP TABLE IF EXISTS answer;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS quiz;
DROP TABLE IF EXISTS answer_sheet

CREATE TABLE IF NOT EXISTS quiz (
    id TEXT,
    text TEXT,
    slug TEXT,
    icon TEXT,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS question (
    id TEXT PRIMARY KEY,
    text TEXT,
    image TEXT,
    quiz_id TEXT,
    FOREIGN KEY (quiz_id) REFERENCES quiz(id)
);

CREATE TABLE IF NOT EXISTS answer (
    id TEXT PRIMARY KEY,
    text TEXT,
    is_correct BOOLEAN,
    option TEXT,
    question_id TEXT,
    FOREIGN KEY (question_id) REFERENCES question(id)
);

CREATE TABLE IF NOT EXISTS answer_sheet {
    id TEXT PRIMARY KEY,
    question_id TEXT,
    answer_id TEXT,
    user_id INTEGER,
    FOREIGN KEY (answer_id) REFERENCES answer(id),
    FOREIGN KEY (question_id) REFERENCES question(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
}

INSERT INTO quiz (text, slug) VALUES
('General Knowledge', 'general_knowledge'),
('Science', 'science'),
('History', 'history'),
('Geography', 'geography'),
('Movies', 'movies'),
('Music', 'music'),
('Sports', 'sports'),
('Technology', 'technology'),
('Literature', 'literature'),
('Food and Cuisine', 'food_and_cuisine')
