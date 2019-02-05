/*
    Thème: TP 2 Gestion d’une collection de livres
    Auteur : Melnyk Svitlana
    Date : août 2018
*/

/* Base de données "Bibliothèque" */

CREATE TABLE `livres` (
`id` int(10) NOT NULL auto_increment,
`titre` varchar(200),
`auteur` varchar(100),
`annee` int(4),
`isbn` varchar(10) NOT NULL,
`editeur` varchar(200),
`evaluation` int(2),
PRIMARY KEY (`id`)
);

INSERT INTO livres (titre, auteur, annee, isbn, editeur, evaluation) 
VALUES ('Les Fantômes de Manhattan', 'Roger Jon Ellory', 2018, 'N35', 'SONATINE EDITIONS', 5),
('Origin', 'Dan Brown', 2018, 'K46', 'ANCHOR', 9),
('Un été pour deux', ' Elin Hilderbrand', 2017, 'N57', 'CITY ED.', 3),
('Lettres de prison', ' Nelson Mandela', 2018, 'L89', 'ROBERT LAFFONT', 10),
('Harry Péteur', 'Richard Petit', 2017, 'K38', 'ANDARA', 2),
('Le Pensionnat des innocentes', 'Angela Marsons', 2017, 'S23', 'BELFOND', 7),
('Le Vieil homme et la mer', 'Ernest Hemingway', 2018, 'G13', 'GALLIMARD', 9);