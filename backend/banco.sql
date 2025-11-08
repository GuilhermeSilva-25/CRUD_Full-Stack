CREATE DATABASE IF NOT EXISTS dados;
USE dados;

CREATE TABLE estudante (
    id INT AUTO_INCREMENT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO estudante (nome, email) VALUES
('Bruno', 'bruno@email.com'),
('Vivian', 'vivian@email.com'),
('Marco', 'marco@email.com');