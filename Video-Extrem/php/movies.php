<?php

    include("/connection/connection_class.php");
    header('Content-Type: text/html; charset=utf8_spanish_ci');
    header("Content-Type: text/html;charset=utf-8");
    header('Access-Control-Allow-Origin: *'); 

    $_queryType ="";

    if (isset($_GET['queryType'])) {
        $_queryType = $_GET['queryType'];
    }

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    class movie{

        public $movieId = 0;
        public $movieYear = 0;
        public $movieName = "";
        public $movieDescription = "";
        public $moviePrice = 0;
        public $movieDate = "";
        public $image = "";

        function getMovies() {
            $connection = new connection();
            $movies = array();
            $select = 'SELECT * from Peliculas;';
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $movies[] = array("idPelicula"=>$row['idPelicula'], "ano"=>$row['ano'], "pelicula"=>$row['pelicula'], "trama"=>$row['trama'], "precio"=>$row['precio'], 
                                 "fechaIngreso"=>$row['fechaIngreso'], "linkImagen"=>$row['linkImagen']);
            }
            echo json_encode($movies); 
        }
    }

    $movieClass = new movie();

    if ($_queryType == "select"){
        $movieClass->getMovies();
    }
?>