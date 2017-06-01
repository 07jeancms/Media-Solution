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

    class backup{

        public $fileName = "";

    	function getMovies() {
            $connection = new connection();
            $movies = array();
            $select = "SELECT Peliculas.idPelicula as 'idPelicula', Peliculas.ano as 'ano', Peliculas.pelicula as 'pelicula', Peliculas.trama as 'trama',
            Peliculas.precio as 'precio', Peliculas.fechaIngreso as 'fechaIngreso', Peliculas.linkImagen as 'linkImagen', Peliculas.codigo as 'codigo' 
            from Peliculas order by idPelicula;";
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $movies[] = array("idPelicula"=>$row['idPelicula'], "ano"=>$row['ano'], "pelicula"=>$row['pelicula'], "trama"=>$row['trama'], "precio"=>$row['precio'], 
                                 "fechaIngreso"=>$row['fechaIngreso'], "linkImagen"=>$row['linkImagen'], "codigo"=>$row['codigo']);
            }
            
            //echo json_encode($movies);
            return $movies;
        }

    	function array_to_csv_download($array, $filename = "export.csv", $delimiter=";") {
		    // open raw memory as file so no temp files needed, you might run out of memory though
		    $f = fopen('php://memory', 'w'); 
		    // loop over the input array
		    foreach ($array as $line) { 
		        // generate csv lines from the inner arrays
		        fputcsv($f, $line, $delimiter); 
		    }
		    // reset the file pointer to the start of the file
		    fseek($f, 0);
		    // tell the browser it's going to be a csv file
		    header('Content-Type: application/csv');
		    // tell the browser we want to save it instead of displaying it
		    header('Content-Disposition: attachment; filename="'.$filename.'";');
		    // make php send the generated csv lines to the browser
		    fpassthru($f);
		}

    }

    $backupClass = new backup();

    if ($_queryType == "getBackup"){
        //$a1= array("idPelicula"=>"idPelicula","ano"=>"ano", "pelicula"=>"pelicula", "trama"=>"trama", "precio"=>"precio","fechaIngreso"=>"fechaIngreso","linkImagen"=>"linkImagen","codigo"=>"codigo");
        $tmp = $backupClass->getMovies();
        $backupClass->fileName = $request->file;
	    $backupClass->array_to_csv_download($tmp, $backupClass->fileName + ".csv");
    }
    // "http://www.videoextrem.com/api/generate_backup_movies_csv_file.php?queryType=getBackup"
?>