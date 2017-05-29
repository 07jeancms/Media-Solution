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

    class discount{

        public $idDiscount = 0;
        public $link = "";
        public $status = 0;
        public $idCarousel = 0;
        public $arrayCarousels = [];
        public $carouselName = "";

        function getActiveDiscountsByCarousel($pIdCarousel) {
            $connection = new connection();
            $discounts = array();
            $select = "SELECT Promociones.link as 'link', Promociones.estado as 'estado', TipoCarrusel.tipo as 'tipo', TipoCarrusel.nombre as 'nombre'
                from Promociones
                INNER JOIN PromocionesXcarrusel on (Promociones.idPromocion = PromocionesXcarrusel.idPromocion)
                INNER JOIN TipoCarrusel on (PromocionesXcarrusel.idTipoCarrusel = TipoCarrusel.idTipoCarrusel) and (Promociones.estado = 1) and 
                                                                                                                (TipoCarrusel.idTipoCarrusel = '$pIdCarousel');";
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $discounts[] = array("link"=>$row['link'], "estado"=>$row['estado'], "tipo"=>$row['tipo'], "nombre"=>$row['nombre']);
            }
            echo json_encode($discounts); 
        }
        
        function getDisableDiscountsByCarousel($pIdCarousel) {
            $connection = new connection();
            $discounts = array();
            $select = "SELECT Promociones.link as 'link', Promociones.estado as 'estado', TipoCarrusel.tipo as 'tipo', TipoCarrusel.nombre as 'nombre'
                from Promociones
                INNER JOIN PromocionesXcarrusel on (Promociones.idPromocion = PromocionesXcarrusel.idPromocion)
                INNER JOIN TipoCarrusel on (PromocionesXcarrusel.idTipoCarrusel = TipoCarrusel.idTipoCarrusel) and (Promociones.estado = 0);";
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $discounts[] = array("link"=>$row['link'], "estado"=>$row['estado'], "tipo"=>$row['tipo'], "nombre"=>$row['nombre']);
            }
            echo json_encode($discounts); 
        }
        
        function getAllDiscounts() {
            $connection = new connection();
            $discounts = array();
            $select = "SELECT Promociones.idPromocion as 'idPromocion', Promociones.link as 'link', Promociones.estado as 'estado', TipoCarrusel.tipo as 'tipo', TipoCarrusel.nombre as 'nombre'
                from Promociones
                INNER JOIN PromocionesXcarrusel on (Promociones.idPromocion = PromocionesXcarrusel.idPromocion)
                INNER JOIN TipoCarrusel on (PromocionesXcarrusel.idTipoCarrusel = TipoCarrusel.idTipoCarrusel);";
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $actualStatus = "";
                if($row['estado'] == 1){
                    $actualStatus = "activado";
                }
                else{
                    $actualStatus = "desactivado";
                }
                $discounts[] = array("idPromocion"=>$row['idPromocion'], "link"=>$row['link'], "estado"=>$actualStatus, "tipo"=>$row['tipo'], "nombre"=>$row['nombre']);
            }
            echo json_encode($discounts); 
        }
        
        function getAllCarouselNames() {
            $connection = new connection();
            $discounts = array();
            $select = "SELECT TipoCarrusel.nombre as 'nombre' FROM TipoCarrusel;";
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $discounts[] = array("nombre"=>$row['nombre']);
            }
            echo json_encode($discounts); 
        }
        
        function deleteDiscount($pIdDiscount, $pCarouselName) {
            $connection = new connection();
            
            $call = "call deleteDiscountXcarouselByCarouselName('$pIdDiscount', '$pCarouselName');";
            $result = $connection->consult($call);            
            
            $call = "call deleteDiscount('$pIdDiscount');";
            $result = $connection->consult($call);
        }

        function addDiscount($pLink, $pStatus, $pCarousels) {
            $connection = new connection();
            $call = "call createDiscount('$pLink', '$pStatus');";
            $result = $connection->consult($call);
            foreach ($pCarousels as $addElement) {
                $call = "call createDiscountByCarousel('$addElement');";
                $result = $connection->consult($call);
            }
        }
        
        function editDiscount($pIdDiscount, $pLink, $pStatus) {
            $connection = new connection();
            $call = "call updateDiscount('$pIdDiscount','$pLink', '$pStatus');";
            $result = $connection->consult($call);
        }
    }

    $discountsClass = new discount();

    if ($_queryType == "select1"){
        $discountsClass->idCarousel = $request->idCarousel;
        $discountsClass->getActiveDiscountsByCarousel($discountsClass->idCarousel);
    }

    if ($_queryType == "select0"){
        $discountsClass->idCarousel = $request->idCarousel;
        $discountsClass->getDisableDiscountsByCarousel($discountsClass->idCarousel);
    }

    if ($_queryType == "select"){
        $discountsClass->getAllDiscounts();
    }

    if ($_queryType == "carouselNames"){
        $discountsClass->getAllCarouselNames();
    }

    if ($_queryType == "delete"){
        $discountsClass->idDiscount = $request->idDiscount;
        $discountsClass->carouselName = $request->carouselName;
        $discountsClass->deleteDiscount($discountsClass->idDiscount, $discountsClass->carouselName);

    }

    if ($_queryType == "add"){
        $discountsClass->link = $request->url;
        $discountsClass->status = $request->status;
        $discountsClass->arrayCarousels = $request->carouselTypes;
        $discountsClass->addDiscount($discountsClass->link, $discountsClass->status, $discountsClass->arrayCarousels);
    }
    
    if ($_queryType == "edit"){
        $discountsClass->idDiscount = $request->idDiscount;
        $discountsClass->link = $request->link;
        $discountsClass->status = $request->status;
        $discountsClass->editDiscount($discountsClass->idDiscount, $discountsClass->link, $discountsClass->status);
    }
?>