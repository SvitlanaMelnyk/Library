<?php
/*
 *  Thème: TP 2 Gestion d’une collection de livres
 *  Auteur : Melnyk Svitlana
 *   Date : août 2018
 */

// Exécuter le fichier "modele.php"
require_once("modele.php");

// Récupèrer une chaîne encodée JSON et la convertit en une variable php
if(isset($_GET["donnees"])) {
    $donnees = json_decode($_GET["donnees"], true);
    $action = $donnees["action"];
}
else
    $action = "index";

// Obtenir la valeur d' "action" et chqnger la "case" requise
switch($action)
{
    // Afficher la page de la bibliotheque
    case "index":
        require_once("bibliotheque.html");
        break;

    // Afficher tous les livres
    case "afficher_tousLivres":
        $livresModele = new Modele();
        $tousLivres = $livresModele->lire(); // Exécuter la fonction 'lire'
        echo json_encode($tousLivres); // Retourner la représentation JSON d'une valeur
        break;

    // Ajouter un livre
    case "ajouter_livre":
        $livresModele = new Modele();
        // Exécuter la fonction creer
        $livresModele->creer($donnees["titre"], $donnees["auteur"], $donnees["annee"], $donnees["isbn"], $donnees["editeur"], $donnees["evaluation"]);
        $tousLivres = $livresModele->lire(); // Exécuter la fonction 'lire'
        echo json_encode($tousLivres); // Retourner la représentation JSON d'une valeur
        break;

    // Supprimer un livre
    case "supprimer_livre":
        $livresModele = new Modele();
        $livresModele->supprimer($donnees["id"]); // Exécuter la fonction supprimer
        $tousLivres = $livresModele->lire(); // Exécuter la fonction 'lire'
        echo json_encode($tousLivres); // Retourner la représentation JSON d'une valeur
        break;

    // Modifier un livre
    case "modifier_livre":
        $livresModele = new Modele();
        // Exécuter la fonction modifier
        $livresModele->modifier($donnees["id"], $donnees["texte"], $donnees["nomColonne"]);
        $tousLivres = $livresModele->lire(); // Exécuter la fonction 'lire'
        echo json_encode($tousLivres); // Retourner la représentation JSON d'une valeur
        break;

    // Chercher des livres
    case "rechercher":
        $livresModele = new Modele();
        // Exécuter la fonction rechercher
        $livresRecherche = $livresModele->rechercher($donnees["titre"], $donnees["auteur"], $donnees["annee"], $donnees["isbn"], $donnees["editeur"], $donnees["evaluation"]);
        echo json_encode($livresRecherche); // Retourner la représentation JSON d'une valeur
        break;

    // Auto-complèter le champ de recherche de titre
    case "autocomplete_titre":
        $livresModele = new Modele();
        $titreRecherche = $livresModele->autocompleteTitre(); // Exécuter la fonction autocompleteTitre
        echo json_encode($titreRecherche); // Retourner la représentation JSON d'une valeur
        break;

    // Auto-complèter le champ de recherche d'auteur
    case "autocomplete_auteur":
        $livresModele = new Modele();
        $auteurRecherche = $livresModele->autocompleteAuteur(); // Exécuter la fonction autocompleteAuteur
        echo json_encode($auteurRecherche); // Retourner la représentation JSON d'une valeur
        break;

    // Auto-complèter le champ de recherche d'annee
    case "autocomplete_annee":
        $livresModele = new Modele();
        $anneeRecherche = $livresModele->autocompleteAnnee(); // Exécuter la fonction autocompleteAnnee
        echo json_encode($anneeRecherche); // Retourner la représentation JSON d'une valeur
        break;

    // Auto-complèter le champ de recherche d'isbn
    case "autocomplete_isbn":
        $livresModele = new Modele();
        $isbnRecherche = $livresModele->autocompleteIsbn(); // Exécuter la fonction autocompleteIsbn
        echo json_encode($isbnRecherche); // Retourner la représentation JSON d'une valeur
        break;

    // Auto-complèter le champ de recherche d'editeur
    case "autocomplete_editeur":
        $livresModele = new Modele();
        $editeurRecherche = $livresModele->autocompleteEditeur(); // Exécuter la fonction autocompleteEditeur
        echo json_encode($editeurRecherche); // Retourner la représentation JSON d'une valeur
        break;

    // Auto-complèter le champ de recherche d'evaluation
    case "autocomplete_evaluation":
        $livresModele = new Modele();
        $evaluationRecherche = $livresModele->autocompleteEvaluation(); // Exécuter la fonction autocompleteEvaluation
        echo json_encode($evaluationRecherche); // Retourner la représentation JSON d'une valeur
        break;
}
