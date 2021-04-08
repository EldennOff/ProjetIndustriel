# ProjetIndustriel
Projet Tutoré 2 de la licence Professionnel Dev Web et App E-Commerce de Metz

Configuration et mise en place du projet :

Pour le fonctionnement du projet, il sera nécessaire d'installer elasticsearch en local et également l'extension elasticsearch-head sur votre navigateur (Chrome de préférence).

Il faudra également que sur votre environement il y ait d'installer les composants suivants :

   - Un serveur local (Wampp ou Xampp)
   - Composer
   - npm
   - node.js

Suite à ça, après avoir téléchargé le projet, à l'aide de votre invitation de commande, il faudra effectuer les commandes suivantes dans les dossiers suivants :

 - "npm update" => "/back/scriptdata/" et "front"
 - "composer update" => "/back/steamback/"

À la fin de ses configurations, vous pourrez lancer le script qui permettra d'ajouter les données des fichiers csv dans ElasticSearch.

 - "node index.js" => "/back/scriptdata/"

Après avoir récupéré toutes vos données sur Elastic Search, il faudra le configurer avec ElasticSearch-head.
Dans l'onglet "Autres requêtes", vous devrez rentrer les commandes suivantes :

"_settings" => PUT => {"index.max_result_window":500000}

Puis vous pouvez lancer la requête, et dès que le message "{ "acknowledged": true }" sera affiché alors Elastic Search sera configuré comme il se doit.

Pour finir, il faut mettre en place un "virtual host" avec votre serveur local en direction du dossier "back/steamback/public" et devra porter pour nom "steamback".

Si cela est fait, vous pourrez accéder à la page concernant le BackEnd du projet à l'adresse "http://steamback/". Cela permettra d'avoir accès aux API configuré en back.

Après toutes ses étapes, vous pourrez lancer le front du projet avec cette commande :

 - "npm start" => "/front/"
 
 Bonne continuation !
