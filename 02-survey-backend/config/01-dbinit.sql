DROP TABLE IF EXISTS survey_recipients, survey_clicks, modelliste, survey_answers, comments, contribution_reactions;

CREATE TABLE IF NOT EXISTS survey_recipients (
    recipient_id INT NOT NULL GENERATED ALWAYS AS IDENTITY (
        INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
    ),
    recipient_name VARCHAR(100) NOT NULL,
    recipient_type VARCHAR(100) NOT NULL,
    recipient_institution VARCHAR(200) NOT NULL,
    recipient_superordinate_department VARCHAR(100),
    recipient_number_openings INT DEFAULT 0,
    recipient_hash VARCHAR(5),
    PRIMARY KEY (recipient_id)
);

CREATE TABLE IF NOT EXISTS survey_clicks (
    click_id INT NOT NULL GENERATED ALWAYS AS IDENTITY (
        INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
    ),
    click_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    recipient_id INT,
    PRIMARY KEY(click_id),
    CONSTRAINT fk_recipient FOREIGN KEY(recipient_id) REFERENCES survey_recipients(recipient_id) ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS survey_answers (
    answer_id INT NOT NULL GENERATED ALWAYS AS IDENTITY (
        INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
    ),
    
    datenschutz BOOLEAN,
    berufsabschluss VARCHAR(10000),
    dienststelle VARCHAR(10000),
    dienstbezeichnung VARCHAR(10000),
    diensttaetigkeit VARCHAR(10000),
    berufserfahrung INT,
    system VARCHAR(10000),
    system_comment VARCHAR(10000),
    raumrelevanz VARCHAR(10000),
    kontaktaufnahme BOOLEAN,
    contact_name VARCHAR(10000),
    mail VARCHAR(10000),
    tel VARCHAR(10000),
    survey_recipient INT,
    survey_submission TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (answer_id),
    FOREIGN KEY(survey_recipient) REFERENCES survey_recipients(recipient_id)
);

CREATE TABLE IF NOT EXISTS modelliste (
    modelliste_id INT NOT NULL GENERATED ALWAYS AS IDENTITY (
        INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
    ),
    answer_id INT,
    model_name VARCHAR(1000),
    beschreibung VARCHAR(10000),
    zweck VARCHAR(10000),
    verwendung VARCHAR(10000),
    PRIMARY KEY (modelliste_id),
    FOREIGN KEY(answer_id) REFERENCES survey_answers(answer_id)

);


CREATE TABLE IF NOT EXISTS comments (
    comment_id INT NOT NULL GENERATED ALWAYS AS IDENTITY (
        INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
    ),
    writer_id INT,
    comment_title VARCHAR(100),
    comment_text VARCHAR(10000),
    comment_category VARCHAR(100),
    comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comment_reference INT,
    comment_anonymous BOOLEAN,
    simulation_reference VARCHAR(100),
    PRIMARY KEY (comment_id),
    CONSTRAINT fk_recipient FOREIGN KEY(writer_id) REFERENCES survey_recipients(recipient_id) ON DELETE SET NULL,
    FOREIGN KEY (comment_reference) REFERENCES comments(comment_id)
);


CREATE TABLE IF NOT EXISTS contribution_reactions (
    contribution_reaction_id INT NOT NULL GENERATED ALWAYS AS IDENTITY (
        INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
    ),
    contribution_reaction_type VARCHAR(50),
    contribution_reaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comment_reference INT,
    contribution_reactor_id INT,
    PRIMARY KEY (contribution_reaction_id),
    FOREIGN KEY (comment_reference) REFERENCES comments(comment_id),
    FOREIGN KEY(contribution_reactor_id) REFERENCES survey_recipients(recipient_id)
);
