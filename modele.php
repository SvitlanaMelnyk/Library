<?php
/*
 *  Thème: TP 2 Gestion d’une collection de livres
 *  Auteur : Melnyk Svitlana
 *  Date : août 2018
 */

/**
 * Class Modele pour l'accès à la base de données "Bibliothèque" et pour
 * implémentation des fonctions CRUD et recherche
 */
class Modele
{
    private $hote = '64.20.44.243';
    private $util = 'melnykca_admin';
    private $mdp = 'Pa$$w0rd';
    private $bd = 'melnykca_bibliotheque';

    private $connexion;
    private $erreur;

    /**
     *  Fonction de connexion à la base de données
     */
    public function __construct()
    {
        $dsn = 'mysql:host=' . $this->hote . ';dbname=' . $this->bd . ';charset=utf8';
        $options = [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ];
        try {
            $this->connexion = new PDO($dsn, $this->util, $this->mdp, $options);
        } catch (PDOException $e) {
            $this->erreur = $e->getMessage();
        }
    }

    /**
     * Fonction creer
     * Insèrer un livre dans la base de données
     * @param string $titre - titre du livre
     * @param string $auteur - auteur du livre
     * @param integer $annee - annee du livre
     * @param string $isbn - isbn du livre
     * @param string $editeur - editeur du livre
     * @param integer $evaluation - evaluation du livre
     * @return string
     */
    public function creer($titre, $auteur, $annee, $isbn, $editeur, $evaluation){
        $requete = $this->connexion->prepare('INSERT INTO livres (titre, auteur, annee, isbn, editeur, evaluation)
                                                        VALUES (:titre, :auteur, :annee, :isbn, :editeur, :evaluation)');
        $requete->bindParam("titre", $titre, PDO::PARAM_STR);
        $requete->bindParam("auteur", $auteur, PDO::PARAM_STR);
        $requete->bindParam("annee", $annee, PDO::PARAM_INT);
        $requete->bindParam("isbn", $isbn, PDO::PARAM_STR);
        $requete->bindParam("editeur", $editeur, PDO::PARAM_STR);
        $requete->bindParam("evaluation", $evaluation, PDO::PARAM_INT);
        $requete->execute();
        return $this->connexion->lastInsertId();
    }

    /**
     * Fonction lire
     * Retourner tous les champs de la table "livres" dans la base de données
     * @param aucun
     * @return array
     */
    public function lire()
    {
        $requete = $this->connexion->prepare('SELECT * FROM livres');
        $requete->execute();
        $data = array();
        while ($donnees = $requete->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $donnees;
        }
        return $data;
    }

    /**
     * Fonction modifier
     * Renouveler le livre dans la base de données
     * @param integer $id - id du livre
     * @param string $texte - texte modifié de champ
     * @param string $nomColonne - nom de champ de la base de données
     */
    public function modifier($id, $texte, $nomColonne){
        $requete = $this->connexion->prepare("UPDATE livres SET ". $nomColonne ." = '" . $texte . "'
                                                       WHERE id = :id");
        $requete->bindParam("id", $id, PDO::PARAM_INT);
        $requete->execute();
    }

    /**
     * Fonction supprimer
     * Supprimer un livre
     * @param integer $id - id du livre
     */
    public function supprimer($id){
        $requete = $this->connexion->prepare('DELETE FROM livres WHERE id = :id');
        $requete->bindParam("id", $id, PDO::PARAM_INT);
        $requete->execute();
    }

    /**
     * Fonction rechercher
     * Afficher les résultats de recherche
     * @param string $titre - titre du livre
     * @param string $auteur - auteur du livre
     * @param integer $annee - annee du livre
     * @param string $isbn - isbn du livre
     * @param string $editeur - editeur du livre
     * @param integer $evaluation - evaluation du livre
     * @return array
     */
    public function rechercher($titre, $auteur, $annee, $isbn, $editeur, $evaluation){
        $m = [];

        if ($titre !== ""){
            $m[] = " titre LIKE '%$titre%'";
        }

        if ($auteur != "") {
            $m[] = " auteur LIKE '%$auteur%'";
        }

        if ($annee != ""){
            $m[] = " annee LIKE '%$annee%'";
        }

        if ($isbn != ""){
            $m[] = " isbn LIKE '%$isbn%'";
        }

        if ($editeur != ""){
            $m[] = " editeur LIKE '%$editeur%'";
        }

        if ($evaluation != ""){
            $m[] = " evaluation LIKE '%$evaluation%'";
        }

        $ff = implode(" AND ", $m);

        $requete = "SELECT * FROM livres WHERE  $ff";


        $stmt = $this->connexion->prepare($requete);
        $stmt->execute();
        $data = $stmt->fetchAll();
        return $data;
    }

    /**
     * Fonction autocompleteTitre
     * Auto-complèter le champ de recherche de titre
     * @return array
     */

    public function autocompleteTitre(){
        $requete = $this->connexion->prepare("SELECT titre FROM livres");
        $requete->execute();
        $data = array();
        while ($donnees = $requete->fetch(PDO::FETCH_COLUMN)) {
            $data[] = $donnees;
        }
        return $data;
    }

    /**
     * Fonction autocompleteAuteur
     * Auto-complèter le champ de recherche d'auteur
     * @return array
     */
    public function autocompleteAuteur(){
        $requete = $this->connexion->prepare("SELECT auteur FROM livres");
        $requete->execute();
        $data = array();
        while ($donnees = $requete->fetch(PDO::FETCH_COLUMN)) {
            $data[] = $donnees;
        }
        return $data;
    }

    /**
     * Fonction autocompleteAnnee
     * Auto-complèter le champ de recherche d'annee
     * @return array
     */
    public function autocompleteAnnee(){
        $requete = $this->connexion->prepare("SELECT annee FROM livres");
        $requete->execute();
        $data = array();
        while ($donnees = $requete->fetch(PDO::FETCH_COLUMN)) {
            $data[] = $donnees;
        }
        return $data;
    }

    /**
     * Fonction autocompleteIsbn
     * Auto-complèter le champ de recherche d'isbn
     * @return array
     */
    public function autocompleteIsbn(){
        $requete = $this->connexion->prepare("SELECT isbn FROM livres");
        $requete->execute();
        $data = array();
        while ($donnees = $requete->fetch(PDO::FETCH_COLUMN)) {
            $data[] = $donnees;
        }
        return $data;
    }

    /**
     * Fonction autocompleteEditeur
     * Auto-complèter le champ de recherche d'editeur
     * @return array
     */
    public function autocompleteEditeur(){
        $requete = $this->connexion->prepare("SELECT editeur FROM livres");
        $requete->execute();
        $data = array();
        while ($donnees = $requete->fetch(PDO::FETCH_COLUMN)) {
            $data[] = $donnees;
        }
        return $data;
    }

    /**
     * Fonction autocompleteEvaluation
     * Auto-complèter le champ de recherche d'evaluation
     * @return array
     */
    public function autocompleteEvaluation(){
        $requete = $this->connexion->prepare("SELECT evaluation FROM livres");
        $requete->execute();
        $data = array();
        while ($donnees = $requete->fetch(PDO::FETCH_COLUMN)) {
            $data[] = $donnees;
        }
        return $data;
    }
}


