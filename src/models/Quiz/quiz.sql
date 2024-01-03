DROP TABLE IF EXISTS answer;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS quiz;

CREATE TABLE IF NOT EXISTS quiz (
    id TEXT,
    text TEXT,
    slug TEXT,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS question (
    id TEXT PRIMARY KEY,
    text TEXT,
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
