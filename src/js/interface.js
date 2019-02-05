/*
  Thème: TP 2 Gestion d’une collection de livres
  Auteur : Melnyk Svitlana
  Date : août 2018
*/

$(document).ready(function() {

    // Appeler AJAX dans jQuery pour obtenir les données pour afficher tous les livres
    $('#voirLivres').click(function(){
        let jsonData = {action: "afficher_tousLivres"}; // JSON
        $.ajax({
            url: 'index.php', // La ressource ciblée
            type: 'GET',
            data: 'donnees=' + JSON.stringify(jsonData), // Convertit un objet vers une chaîne JSON
            dataType: 'json',
            success: function(tousLivres, statut){ // Traiter le retour de la requête
                montrerLivres(tousLivres); // Afficher tous les livres
            },
            error: function (a, b, c) {   // Afficher en cas d’erreur
                console.log(a);
                console.log(b);
                console.log(c);
            }
        });
    });

    // Obtenir les données pour éditer le livre et appeler la fonction 'modifierLivre'
    $(document).on('blur', '.titre', function(){
        let id = $(this).data("id1");
        let titre = $(this).text();
        modifierLivre(id, titre, "titre");
    });

    $(document).on('blur', '.auteur', function(){
        let id = $(this).data("id2");
        let auteur = $(this).text();
        modifierLivre(id, auteur, "auteur");
    });

    $(document).on('blur', '.annee', function(){
        let id = $(this).data("id3");
        let annee = $(this).text();
        modifierLivre(id, annee, "annee");
    });

    $(document).on('blur', '.isbn', function(){
        let id = $(this).data("id4");
        let isbn = $(this).text();
        modifierLivre(id, isbn, "isbn");
    });

    $(document).on('blur', '.editeur', function(){
        let id = $(this).data("id5");
        let editeur = $(this).text();
        modifierLivre(id, editeur, "editeur");
    });

    $(document).on('blur', '.evaluation', function(){
        let id = $(this).data("id6");
        let evaluation = $(this).text();
        modifierLivre(id, evaluation, "evaluation");
    });

    // Définir la couleur de fond et la couleur de texte dans les champs de recherche
    $('#rechercheTitre').keyup(function(){
        $('#nomTitre').css('background-color', 'darkgrey');
        $('#rechercheTitre').css('color', 'red');
    });

    $('#rechercheAuteur').keyup(function(){
        $('#nomAuteur').css('background-color', 'darkgrey');
        $('#rechercheAuteur').css('color', 'red');
    });

    $('#rechercheAnnee').keyup(function(){
        $('#nomAnnee').css('background-color', 'darkgrey');
        $('#rechercheAnnee').css('color', 'red');
    });

    $('#rechercheIsbn').keyup(function(){
        $('#nomIsbn').css('background-color', 'darkgrey');
        $('#rechercheIsbn').css('color', 'red');
    });

    $('#rechercheEditeur').keyup(function(){
        $('#nomEditeur').css('background-color', 'darkgrey');
        $('#rechercheEditeur').css('color', 'red');
    });

    $('#rechercheEvaluation').keyup(function(){
        $('#nomEvaluation').css('background-color', 'darkgrey');
        $('#rechercheEvaluation').css('color', 'red');
    });

    // Appeler AJAX dans jQuery pour obtenir les données pour rechercher des livres
    $('#rechercheTitre, #rechercheAuteur, #rechercheAnnee, #rechercheIsbn, #rechercheEditeur, #rechercheEvaluation').bind("blur", function(){
        // Obtenir la valeur des champs de recherche
        let titre = $('#rechercheTitre').text();
        let auteur = $('#rechercheAuteur').text();
        let annee = $('#rechercheAnnee').text();
        let isbn = $('#rechercheIsbn').text();
        let editeur = $('#rechercheEditeur').text();
        let evaluation = $('#rechercheEvaluation').text();

        // JSON
        let jsonData = {
            action: "rechercher",
            titre: titre,
            auteur: auteur,
            annee: annee,
            isbn: isbn,
            editeur: editeur,
            evaluation: evaluation
        };
        $.ajax({
            url: 'index.php',
            type: 'GET',
            data: 'donnees=' + JSON.stringify(jsonData), // Convertit un objet vers une chaîne JSON
            dataType: 'json',
            success: function(livresRecherche, statut){  // Traiter le retour de la requête
                // Effacer les champs
                $('#rechercheTitre').text('');
                $('#rechercheAuteur').text('');
                $('#rechercheAnnee').text('');
                $('#rechercheIsbn').text('');
                $('#rechercheEditeur').text('');
                $('#rechercheEvaluation').text('');

                // Retirer la couleur de fond
                $('#nomTitre').css('background-color', '');
                $('#nomAuteur').css('background-color', '');
                $('#nomAnnee').css('background-color', '');
                $('#nomIsbn').css('background-color', '');
                $('#nomEditeur').css('background-color', '');
                $('#nomEvaluation').css('background-color', '');
                rechercher(livresRecherche);  // Chercher les livres
            },
            error: function (a, b, c) {   // Afficher en cas d’erreur
                console.log(a);
                console.log(b);
                console.log(c);
            }
        });
    });

    // Auto-complèter le champ de recherche de titre
    $('#rechercheTitre').click(function(){
            let jsonData = {action: "autocomplete_titre"};  // JSON
            $.ajax({
                url: 'index.php',  // La ressource ciblée
                type: 'GET',
                data: 'donnees=' + JSON.stringify(jsonData), // Convertit un objet vers une chaîne JSON
                dataType: 'json',
                success: function(titreRecherche, statut){  // Traiter le retour de la requête
                    $('#rechercheTitre').autocomplete({  // Auto-complèter le champ
                        source: titreRecherche
                    })
                },
                error: function (a, b, c) {  // Afficher en cas d’erreur
                    console.log(a);
                    console.log(b);
                    console.log(c);
                }
            });
    });

    // Auto-complèter le champ de recherche d'auteur
    $('#rechercheAuteur').click(function(){
        let jsonData = {action: "autocomplete_auteur"};  // JSON
        $.ajax({
            url: 'index.php',  // La ressource ciblée
            type: 'GET',
            data: 'donnees=' + JSON.stringify(jsonData), // Convertit un objet vers une chaîne JSON
            dataType: 'json',
            success: function(auteurRecherche, statut){  // Traiter le retour de la requête
                $('#rechercheAuteur').autocomplete({  // Auto-complèter le champ
                    source: auteurRecherche
                })
            },
            error: function (a, b, c) {  // Afficher en cas d’erreur
                console.log(a);
                console.log(b);
                console.log(c);
            }
        });
    });

    // Auto-complèter le champ de recherche d'annee
    $('#rechercheAnnee').click(function(){
        let jsonData = {action: "autocomplete_annee"};  // JSON
        $.ajax({
            url: 'index.php',  // La ressource ciblée
            type: 'GET',
            data: 'donnees=' + JSON.stringify(jsonData), // Convertit un objet vers une chaîne JSON
            dataType: 'json',
            success: function(anneeRecherche, statut){  // Traiter le retour de la requête
                $('#rechercheAnnee').autocomplete({  // Auto-complèter le champ
                    source: anneeRecherche
                })
            },
            error: function (a, b, c) {  // Afficher en cas d’erreur
                console.log(a);
                console.log(b);
                console.log(c);
            }
        });
    });

    // Auto-complèter le champ de recherche d'isbn
    $('#rechercheIsbn').click(function(){
        let jsonData = {action: "autocomplete_isbn"};  // JSON
        $.ajax({
            url: 'index.php',  // La ressource ciblée
            type: 'GET',
            data: 'donnees=' + JSON.stringify(jsonData), // Convertit un objet vers une chaîne JSON
            dataType: 'json',
            success: function(isbnRecherche, statut){  // Traiter le retour de la requête
                $('#rechercheIsbn').autocomplete({  // Auto-complèter le champ
                    source: isbnRecherche
                })
            },
            error: function (a, b, c) {  // Afficher en cas d’erreur
                console.log(a);
                console.log(b);
                console.log(c);
            }
        });
    });

    // Auto-complèter le champ de recherche d'editeur
    $('#rechercheEditeur').click(function(){
        let jsonData = {action: "autocomplete_editeur"};  // JSON
        $.ajax({
            url: 'index.php',  // La ressource ciblée
            type: 'GET',
            data: 'donnees=' + JSON.stringify(jsonData), // Convertit un objet vers une chaîne JSON
            dataType: 'json',
            success: function(editeurRecherche, statut){  // Traiter le retour de la requête
                $('#rechercheEditeur').autocomplete({  // Auto-complèter le champ
                    source: editeurRecherche
                })
            },
            error: function (a, b, c) {  // Afficher en cas d’erreur
                console.log(a);
                console.log(b);
                console.log(c);
            }
        });
    });

    // Auto-complèter le champ de recherche d'evaluation
    $('#rechercheEvaluation').click(function(){
        let jsonData = {action: "autocomplete_evaluation"};  // JSON
        $.ajax({
            url: 'index.php',  // La ressource ciblée
            type: 'GET',
            data: 'donnees=' + JSON.stringify(jsonData), // Convertit un objet vers une chaîne JSON
            dataType: 'json',
            success: function(evaluationRecherche, statut){  // Traiter le retour de la requête
                $('#rechercheEvaluation').autocomplete({  // Auto-complèter le champ
                    source: evaluationRecherche
                })
            },
            error: function (a, b, c) {  // Afficher en cas d’erreur
                console.log(a);
                console.log(b);
                console.log(c);
            }
        });
    });

});

/**
 * Fonction montrerLivres
 * Afficher tous les livres
 * @param tousLivres
 */
function montrerLivres(tousLivres){
    let interneTable = '';
    let numero = 1;
    let notification = 'Bienvenue dans notre bibliothèque !'; // Variable de la zone de notification
    for(let livre of tousLivres){   // Afficher une table de livres
        interneTable += `
            <tr>
            <th scope="row">${numero}</th>
            <td class='titre' data-id1=${livre.id} contenteditable='true'>${livre.titre}</td>
            <td class='auteur' data-id2=${livre.id} contenteditable='true'>${livre.auteur}</td>
            <td class='annee' data-id3=${livre.id} contenteditable='true'>${livre.annee}</td>
            <td class='isbn' data-id4=${livre.id} contenteditable='true'>${livre.isbn}</td>
            <td class='editeur' data-id5=${livre.id} contenteditable='true'>${livre.editeur}</td>
            <td class='evaluation' data-id6=${livre.id} contenteditable='true'>${livre.evaluation}</td>
            <td><a href="#" class="btn btn-outline-info" onclick="supprimerLivre(${livre.id})"><i class="fa fa-trash"></i></a></td>
            </tr>
        `;
        numero++;
        $('#tousLivres tbody').html(interneTable);
    }
    $('#notification').html(notification);  // Afficher la notification
}

/**
 * Fonction ajouterLivre
 * Ajouter un livre
 */
function ajouterLivre(){
    let notification = 'Vous avez ajouté un livre !'; // Variable de la zone de notification

    // Obtenir la valeur des champs de la forme de l'ajout d'un livre
    let titre = $('#titre').val();
    titre = titre.trim();             // Vérifier le champ pour les espaces
    let auteur = $('#auteur').val();
    auteur = auteur.trim();           // Vérifier le champ pour les espaces
    let annee = $('#annee').val();
    annee = annee.trim();             // Vérifier le champ pour les espaces
    let isbn = $('#isbn').val();
    isbn = isbn.trim();               // Vérifier le champ pour les espaces
    let editeur = $('#editeur').val();
    editeur = editeur.trim();         // Vérifier le champ pour les espaces
    let evaluation = $('#evaluation').val();
    evaluation = evaluation.trim();   // Vérifier le champ pour les espaces

    // Utiliser les expressions régulières pour remplir correctement les champs
    let regex = /^(?:[1-9]|0[1-9]|10)$/;
    let regex_2 = /^[0-9]{4}$/;

    // Vérifier les champs pour le vide et les champs numériques pour le nombre
    if (titre === ''){
        alert("Le champ 'titre' est requis!");
    } else if (auteur === ''){
        alert("Le champ 'auteur' est requis!");
    } else if (annee === '' || isNaN(annee) || !regex_2.test(annee)){
        alert("Désolé, mais vous avez mal rempli le champ 'annee'. Il faut entrer quatre chiffres de l'année!");
    } else if (isbn === ''){
        alert("Le champ 'isbn' est requis!");
    } else if (editeur === ''){
        alert("Le champ 'editeur' est requis!");
    } else if (evaluation === '' || isNaN(evaluation) || !regex.test(evaluation)) {
        alert("Désolé, mais vous avez mal rempli le champ 'evaluation'. Il faut entrer des nombres de 1 à 10!");
    }
    else {
        // JSON
        let jsonData = {
            action: "ajouter_livre",
            titre: titre,
            auteur: auteur,
            annee: annee,
            isbn: isbn,
            editeur: editeur,
            evaluation: evaluation
        };
        $.ajax({
            url: 'index.php',
            type: 'GET',
            data: 'donnees=' + JSON.stringify(jsonData), // Convertit un objet vers une chaîne JSON
            dataType: 'json',
            success: function(tousLivres, statut){  // Traiter le retour de la requête
                // Fermer fenêtre de 'modal'
                $('#ajouterModal').modal('hide');
                montrerLivres(tousLivres); // Afficher tous les livres
                // Effacer les champs
                $('#titre').val('');
                $('#auteur').val('');
                $('#annee').val('');
                $('#isbn').val('');
                $('#editeur').val('');
                $('#evaluation').val('');
                $('#notification').html(notification); // Afficher la notification
            },
            error: function (a, b, c) {  // Afficher en cas d’erreur
                console.log(a);
                console.log(b);
                console.log(c);
            }
        })
    }
}

/**
 * Fonction supprimerLivre
 * Supprimer un livre
 * @param id
 */
function supprimerLivre(id){
    let notification = 'Vous avez supprimé le livre !'; // Variable de la zone de notification

    // JSON
    let jsonData = {
        action: "supprimer_livre",
        id: id,
    };
    $.ajax({
        url: 'index.php',  // La ressource ciblée
        type: 'GET',
        data: 'donnees=' + JSON.stringify(jsonData), // Convertit un objet vers une chaîne JSON
        dataType: 'json',
        success: function(tousLivres, statut){  // Traiter le retour de la requête
            montrerLivres(tousLivres);  // Afficher tous les livres
            $('#notification').html(notification);  // Afficher la notification
        },
        error: function (a, b, c) {  // Afficher en cas d’erreur
            console.log(a);
            console.log(b);
            console.log(c);
        }
    })
}

/**
 * Fonction modifierLivre
 * Éditer un livre
 * @param id
 * @param texte
 * @param nomColonne
 */
function modifierLivre(id, texte, nomColonne){
    let notification = 'Vous avez édité le livre !'; // Variable de la zone de notification

    // JSON
    let jsonData = {
        action: "modifier_livre",
        id: id,
        texte: texte,
        nomColonne: nomColonne
    };
    $.ajax({
        url: 'index.php',  // La ressource ciblée
        method: 'GET',
        data: 'donnees=' + JSON.stringify(jsonData), // Convertit un objet vers une chaîne JSON
        dataType: "json",
        success: function(tousLivres, statut){  // Traiter le retour de la requête
            montrerLivres(tousLivres);  // Afficher tous les livres
            $('#notification').html(notification);  // Afficher la notification
        },
        error: function (a, b, c) {  // Afficher en cas d’erreur
            console.log(a);
            console.log(b);
            console.log(c);
        }
    })
}

/**
 * Fonction rechercher
 * Chercher des livres
 * @param livresRecherche
 */
function rechercher(livresRecherche){
    let interneTable = '';
    let numero = 1;
    let notification = 'Voici les résultats de votre recherche !'; // Variable de la zone de notification
    let notification_2 = 'Désolé, il n\'y a pas de résultats de votre recherche !'; // Variable de la zone de notification

    for(let livre of livresRecherche){  // Afficher une table de livres
        interneTable += `
            <tr>
            <th scope="row">${numero}</th>
            <td class='titre' data-id1=${livre.id} contenteditable='true'>${livre.titre}</td>
            <td class='auteur' data-id2=${livre.id} contenteditable='true'>${livre.auteur}</td>
            <td class='annee' data-id3=${livre.id} contenteditable='true'>${livre.annee}</td>
            <td class='isbn' data-id4=${livre.id} contenteditable='true'>${livre.isbn}</td>
            <td class='editeur' data-id5=${livre.id} contenteditable='true'>${livre.editeur}</td>
            <td class='evaluation' data-id6=${livre.id} contenteditable='true'>${livre.evaluation}</td>
            <td><a href="#" class="btn btn-outline-info" onclick="supprimerLivre(${livre.id})"><i class="fa fa-trash"></i></a></td>
            </tr>
        `;
        numero++;
        $('#tousLivres tbody').html(interneTable);
    }

    // Vérifier s'il y a des résultats pour afficher la notification appropriée
    if(livresRecherche.length === 0){
        $('#notification').html(notification_2);
    } else {
        $('#notification').html(notification);
    }
}

