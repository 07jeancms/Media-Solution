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
        public $image = "";
        public $genresArrayRemove;
        public $genresArrayAdd;
        public $languagesArrayRemove;
        public $languagesArrayAdd;
        public $actorsArrayRemove;
        public $actorsArrayAdd;
        public $genresArray;
        public $languagesArray;
        public $actorsArray;
        
        function getMovies() {
            $connection = new connection();
            $movies = array();
            $genres = array();
            $languages = array();
            $select = "SELECT Peliculas.idPelicula as 'idPelicula', Peliculas.ano as 'ano', Peliculas.pelicula as 'pelicula', Peliculas.trama as 'trama',
            Peliculas.precio as 'precio', Peliculas.fechaIngreso as 'fechaIngreso', Peliculas.linkImagen as 'linkImagen', Peliculas.codigo as 'codigo' 
            from Peliculas order by idPelicula;";
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $movies[] = array("idPelicula"=>$row['idPelicula'], "ano"=>$row['ano'], "pelicula"=>$row['pelicula'], "trama"=>$row['trama'], "precio"=>$row['precio'], 
                                 "fechaIngreso"=>$row['fechaIngreso'], "linkImagen"=>$row['linkImagen'], "codigo"=>$row['codigo']);
            }
            
            echo json_encode($movies);
        }

        function deleteMovie($pMovieId) {
            $connection = new connection();
            $call = "call deleteMovie('$pMovieId');";
            $result = $connection->consult($call);
        }
        
        function editMovie($pMovieId, $pMovieName, $pMovieYear, $pMovieDescription, $pMoviePrice, $pMovieLink, $pArrayRemove, $pArrayAdd, $pArrayRemoveLanguages, $pArrayAddLanguages, $pArrayRemoveActors, $pArrayAddActors) {
            $connection = new connection();
            $call = "call updateMovie('$pMovieId','$pMovieName', '$pMovieYear', '$pMovieDescription', '$pMoviePrice', '$pMovieLink');";
            $result = $connection->consult($call);
            foreach ($pArrayRemove as $removeElement) {
                $call = "call deleteGenreByMovieSpecific('$removeElement','$pMovieId');";
                $result = $connection->consult($call);
            }
            foreach ($pArrayAdd as $addElement) {
                $call = "call addGenreByMovie('$pMovieId','$addElement');";
                $result = $connection->consult($call);
            }
            foreach ($pArrayRemoveLanguages as $removeElementLanguage) {
                $call = "call deleteLanguageByMovieSpecific('$removeElementLanguage','$pMovieId');";
                $result = $connection->consult($call);
            }
            foreach ($pArrayAddLanguages as $addElementLanguage) {
                $call = "call addLanguageByMovie('$pMovieId','$addElementLanguage');";
                $result = $connection->consult($call);
            }
            foreach ($pArrayRemoveActors as $removeElementActor) {
                $call = "call deleteActorByMovieSpecific('$removeElementActor','$pMovieId');";
                $result = $connection->consult($call);
            }
            foreach ($pArrayAddActors as $addElementActor) {
                $call = "call addActorByMovie('$pMovieId','$addElementActor');";
                $result = $connection->consult($call);
            }
        }
    
        function addMovie($pMovieName, $pMovieYear, $pMovieDescription, $pMoviePrice, $pMovieLink, $pGenresArray, $pLanguagesArray, $pActorsArray) {
            $connection = new connection();
            $call = "call addNewMovie('$pMovieYear','$pMovieName', '$pMovieDescription', '$pMoviePrice', '$pMovieLink');";
            $result = $connection->consult($call);
            foreach ($pGenresArray as $genreElement) {
                $call = "call addGenreByMovieNoID('$genreElement');";
                $result = $connection->consult($call);
            }
            foreach ($pLanguagesArray as $languageElement) {
                $call = "call addLanguageByMovieNoID('$languageElement');";
                $result = $connection->consult($call);
            }
            foreach ($pActorsArray as $actorElement) {
                $call = "call addActorByMovieNoID('$actorElement');";
                $result = $connection->consult($call);
            }
        }
    }

    $movieClass = new movie();

    if ($_queryType == "select"){
        $movieClass->getMovies();
    }
    if ($_queryType == "delete"){
        $movieClass->movieId = $request->idPelicula;
        $movieClass->deleteMovie($movieClass->movieId);
    }
    if ($_queryType == "edit"){
        $movieClass->movieId = $request->idPelicula;
        $movieClass->movieName = $request->pelicula;
        $movieClass->movieYear = $request->ano;
        $movieClass->movieDescription = $request->trama;
        $movieClass->moviePrice = $request->precio;
        $movieClass->movieLink = $request->linkImagen;
        $movieClass->genresArrayRemove = $request->arrayRemove;
        $movieClass->genresArrayAdd = $request->arrayAdd;
        $movieClass->languagesArrayRemove = $request->arrayRemoveLanguages;
        $movieClass->languagesArrayAdd = $request->arrayAddLanguages;
        $movieClass->actorsArrayRemove = $request->arrayRemoveActors;
        $movieClass->actorsArrayAdd = $request->arrayAddActors;
    
        $movieClass->editMovie($movieClass->movieId, $movieClass->movieName, $movieClass->movieYear, $movieClass->movieDescription, 
                               $movieClass->moviePrice, $movieClass->movieLink, $movieClass->genresArrayRemove, $movieClass->genresArrayAdd,
                                $movieClass->languagesArrayRemove, $movieClass->languagesArrayAdd, $movieClass->actorsArrayRemove, $movieClass->actorsArrayAdd);
    }
    if ($_queryType == "add"){
        $movieClass->movieName = $request->pelicula;
        $movieClass->movieYear = $request->ano;
        $movieClass->movieDescription = $request->trama;
        $movieClass->moviePrice = $request->precio;
        $movieClass->movieLink = $request->linkImagen;
        $movieClass->genresArray = $request->genresArray;
        $movieClass->languagesArray = $request->languagesArray;
        $movieClass->actorsArray = $request->actorsArray;
    
        $movieClass->addMovie($movieClass->movieName, $movieClass->movieYear, $movieClass->movieDescription, 
                              $movieClass->moviePrice, $movieClass->movieLink, $movieClass->genresArray, 
                              $movieClass->languagesArray, $movieClass->actorsArray);
    }
?>