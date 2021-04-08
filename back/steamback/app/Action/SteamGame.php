<?php


namespace App\Action;

use App\Core\Controller\AbstractController;
use Elasticsearch\ClientBuilder;

class SteamGame extends AbstractController
{
    public function __invoke()
    {

        $nbMatch=0;
        $nbRange=0;

        $name=null;
        $name="Tropico 5";
        $tx=null;
        $dev=null;
        //$dev=["Haemimont Games","valve"];
        //$publisher="Calypso Media Digital";
        $publisher=null;
        //  $dateDeb="2014-05-23";
        $dateDeb=null;
        $dateEnd=null;
        //$dateEnd="2015-01-01";
        $games = [];


        $client = ClientBuilder::create()->build();
        $params ['index']="steam";
        // $params ['scroll']="1m";
        $params['size']=900;
        if($name!==null){
            $test=explode(' ',$name);
            for($i=0;$i<count($test);$i++){
                $params['body']['query']['bool']['must'][$nbMatch]['match']['name']=$test[$i];
            }
            $nbMatch++;
        }
        //if taux exist
        if($tx!==null) {
            $params['body']['query']['bool']['filter'][$nbRange]['range']['percentage_ratings']["gte"] = $tx;
            $nbRange++;
        }
        //dev
        if($dev!=null){
            print_r($dev[1]);
            $params['body']['query']['bool']['must']['match']['developer'] = $dev[1];
            $params['body']['query']['bool']['must']['match']['developer'] = $dev[0];
        }
        //publisher
        if($publisher!=null) {
            $test = explode(' ', $publisher);
            for ($i = 0; $i < count($test); $i++) {
                $params['body']['query']['bool']['must'][$nbMatch]['match']['publisher'] = $test[$i];
            }
            $nbMatch++;
        }
        //date
        if($dateDeb) {
            if($dateEnd) {
                $params['body']['query']['bool']['filter'][$nbRange]['range']['release_date_string']["gte"] = $dateDeb;
                $params['body']['query']['bool']['filter'][$nbRange]['range']['release_date_string']["lte"] = $dateEnd;
            }
            else{
                $params['body']['query']['bool']['filter'][$nbRange]['range']['release_date_string']["gte"] = $dateDeb;
                $params['body']['query']['bool']['filter'][$nbRange]['range']['release_date_string']["lte"] = $dateDeb;
            }
            $nbRange++;
        }


        $response = $client->search($params);


        for ($i = 0; $i < count($response['hits']['hits']); $i++) {
            $params = [
                'index' => 'steam',
                'id' => $response['hits']['hits'][$i]["_id"],
                //  'scroll'=>'1m',
            ];
            $game = $client->get($params);
            array_push($games, $game);
        }


        return $this->render('steam/steamgamelist.html.twig', ['games' => $games]);
    }
}
