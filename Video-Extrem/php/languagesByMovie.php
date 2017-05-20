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

    class languagesByMovie{

        public $movieId = 0;

        function getLanguagesByMovie($pIdMovie) {
            $connection = new connection();
            $languagesArray = array();
            $select = "SELECT Idiomas.idioma as 'idioma' from IdiomasXpelicula
                INNER JOIN Idiomas on (IdiomasXpelicula.idIdioma = Idiomas.idIdioma and IdiomasXpelicula.idPelicula = '".$pIdMovie."');";
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $languagesArray[] = array("idioma"=>$row['idioma']);
            }
            echo json_encode($languagesArray); 
        }
        
        function getAllLanguages($pIdMovie) {
            $connection = new connection();
            $languagesArray = array();
            $select = "SELECT Idiomas.idioma as 'idioma' from Idiomas
            where Idiomas.idioma
            NOT IN
            (SELECT Idiomas.idioma as 'idioma' from IdiomasXpelicula
                INNER JOIN Idiomas on (IdiomasXpelicula.idIdioma = Idiomas.idIdioma and IdiomasXpelicula.idPelicula = '".$pIdMovie."')
            );";
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $languagesArray[] = array("idioma"=>$row['idioma']);
            }
            echo json_encode($languagesArray); 
        }
    }

    $languagesByMovieClass = new languagesByMovie();

    if ($_queryType == "select"){
        $languagesByMovieClass->movieId = $request->idPelicula;
        $languagesByMovieClass->getLanguagesByMovie($languagesByMovieClass->movieId);
    }
    if ($_queryType == "languages"){
        $languagesByMovieClass->movieId = $request->idPelicula;
        $languagesByMovieClass->getAllLanguages($languagesByMovieClass->movieId);
    }
?>