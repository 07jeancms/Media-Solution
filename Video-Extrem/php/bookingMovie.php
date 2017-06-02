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

    class bookingMovie{
        public $movieName = "";
        public $description = "";
        public $store = "";
        public $movie = "";
        public $user = 0;
        public $counter = 0;
        public $idBookingMaster = 0;
        
        function getMovies($pMovieName) {
            $connection = new connection();
            $movies = array();
            $select = "SELECT pelicula FROM Peliculas WHERE pelicula LIKE '%$pMovieName%';";
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $movies[] = array("pelicula"=>$row['pelicula']);
            }
            echo json_encode($movies);
        }

        function getStores() {
            $connection = new connection();
            $stores = array();
            $select = "SELECT local FROM Locales;";
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $stores[] = array("local"=>$row['local']);
            }
            echo json_encode($stores);
        }

        function addBooking($pDescripcion, $pLocal, $pPelicula, $pUsuario, $pCounter) {
            $connection = new connection();
            if($pCounter == 0){
                $call_booking = "call addBooking('$pDescripcion');";
                $result_booking = $connection->consult($call_booking);                
            }

            $select_reservation = "SELECT idReservacion FROM Reservaciones WHERE descripcion = '$pDescripcion';";
            $result_reservation = $connection->consult($select_reservation);
            $idReservacion = 0;
            while($row = mysql_fetch_assoc($result_reservation)){
                $idReservacion = $row['idReservacion'];
            }

            $select_store = "SELECT idLocal FROM Locales WHERE local = '$pLocal';";
            $result_store = $connection->consult($select_store);
            $idLocal = 0;
            while($row = mysql_fetch_assoc($result_store)){
                $idLocal = $row['idLocal'];
            }

            $select_movie = "SELECT idPelicula FROM Peliculas WHERE pelicula = '$pPelicula';";
            $result_movie = $connection->consult($select_movie);
            $idPelicula = 0;
            while($row = mysql_fetch_assoc($result_movie)){
                $idPelicula = $row['idPelicula'];
            }

            $call_booking_master = "call addBookingMaster('$idLocal','$idReservacion','$idPelicula','$pUsuario');";

            $result_booking_master = $connection->consult($call_booking_master);

        }
        function getBooking(){
            $connection = new connection();
            $select_master_reservation = "SELECT ReservacionMaestra.idReservacionMaestra as 'idReservacionMaestra', 
                Usuarios.userName as 'userName', GROUP_CONCAT(Peliculas.pelicula) as 'peliculas', Locales.local as 'local', 
                Reservaciones.descripcion as 'descripcion', Reservaciones.fecha as 'fecha'
                FROM ReservacionMaestra INNER JOIN Reservaciones 
                ON Reservaciones.idReservacion = ReservacionMaestra.idReservacion INNER JOIN Peliculas 
                ON Peliculas.idPelicula = ReservacionMaestra.idPelicula INNER JOIN Locales 
                ON Locales.idLocal = ReservacionMaestra.idLocal INNER JOIN Usuarios 
                ON Usuarios.idUsuario = ReservacionMaestra.idUsuario
                GROUP BY Reservaciones.idReservacion;";
            $result_master_reservation = $connection->consult($select_master_reservation);
            $booking = array();
            while($row = mysql_fetch_assoc($result_master_reservation)){
                $booking[] = array("idReservacionMaestra"=>$row['idReservacionMaestra'],"userName"=>$row['userName'], "peliculas"=>$row['peliculas'], "local"=>$row['local'], "descripcion"=>$row['descripcion'], "fecha"=>$row['fecha']);
            }
            echo json_encode($booking);
        
        }

        function deleteBooking($pidMasterReservation){
            $connection = new connection();

            $select_master_reservation_id = "SELECT idReservacion FROM ReservacionMaestra 
            WHERE idReservacionMaestra = '$pidMasterReservation';";
            $result_master_reservation_id = $connection->consult($select_master_reservation_id);
            $idReservacion = 0;
            while($row = mysql_fetch_assoc($result_master_reservation_id)){
                $idReservacion = $row['idReservacion'];
            }
            
            $select_master_reservation = "call deleteMasterReservation('$pidMasterReservation');";
            $result_master_reservation = $connection->consult($select_master_reservation);  

            $select_reservation = "call deleteReservation('$idReservacion');";
            $result_reservation = $connection->consult($select_reservation);              
        }
    }

    $movieClass = new bookingMovie();

    if ($_queryType == "select"){
        $movieClass->movieName = $request->pelicula;
        $movieClass->getMovies($movieClass->movieName);
    }

    if ($_queryType == "stores"){
        $movieClass->getStores();
    }

    if ($_queryType == "booking"){
        $movieClass->description = $request->pdescription;
        $movieClass->store = $request->pstore;
        $movieClass->movie = $request->pmovie;
        $movieClass->user = $request->puser;
        $movieClass->counter = $request->pcounter;
        $movieClass->addBooking($movieClass->description, $movieClass->store, $movieClass->movie, $movieClass->user, $movieClass->counter);
    }

    if ($_queryType == "getBookingMaster"){
        $movieClass->getBooking();
    }

    if ($_queryType == "delete"){
        $movieClass->idBookingMaster = $request->idBooking;
        $movieClass->deleteBooking($movieClass->idBookingMaster);
    }
?>