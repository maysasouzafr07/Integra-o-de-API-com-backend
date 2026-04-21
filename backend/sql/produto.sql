-- Active: 1776724880610@@127.0.0.1@5432@projetotri1
CREATE TABLE produto (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    marca VARCHAR(255) NOT NULL,
    descricao TEXT,
    valor DECIMAL(10, 2) NOT NULL
);