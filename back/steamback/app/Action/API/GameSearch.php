<?php


namespace App\Action\API;
use App\Core\Controller\AbstractController;
use App\Service\GameSearchManager;
use App\Serializer\ObjectSerializer;

class GameSearch extends AbstractController
{
    public function __invoke(){

        $gamesmanager = New GameSearchManager();

        $games = $gamesmanager->searchGame(intval($_POST['pageid']), $_POST['name'], $_POST['categories'], $_POST['genres'], $_POST['developer'], $_POST['publisher'], $_POST['sortby'], $_POST['asc_desc']);

        return json_encode($games);
    }
}
