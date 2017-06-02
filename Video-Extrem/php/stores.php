<?php

    include("/connection/connection_class.php");
    header('Content-Type: text/html; charset=utf8_spanish_ci');
    header("Content-Type: text/html;charset=utf-8");
    header('Access-Contactor-Allow-Origin: *'); 

    $_queryType ="";

    if (isset($_GET['queryType'])) {
        $_queryType = $_GET['queryType'];
    }

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    class store{

        public $idStore = 0;
        public $storeName = "";
        public $location = "";
        public $link = "";
        public $phone = "";
        public $email = "";

        function getStores() {
            $connection = new connection();
            $stores = array();
            $select = 'SELECT * from Locales order by idLocal;';
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $stores[] = array("idLocal"=>$row['idLocal'], "local"=>$row['local'], "ubicacion"=>$row['ubicacion'], "link"=>$row['link'], "telefono"=>$row['telefono'], "correo"=>$row['correo']);
            }
            echo json_encode($stores); 
        }

        function deleteStore($pIdStore) {
            $connection = new connection();
            $call = "call deleteStore('$pIdStore');";
            $result = $connection->consult($call);
        }

        function addStore($pStoreName, $pLocation, $pLink, $pPhone, $pEmail) {
            $connection = new connection();
            $call = "call addStore('$pStoreName','$pLocation','$pLink','$pPhone','$pEmail');";
            $result = $connection->consult($call);
        }
        
        function editStore($pIdStore, $pStoreName, $pLocation, $pLink, $pPhone, $pEmail) {
            $connection = new connection();
            $call = "call updateStore('$pIdStore','$pStoreName','$pLocation','$pLink','$pPhone','$pEmail');";
            $result = $connection->consult($call);
        }
    }

    $storeClass = new store();

    if ($_queryType == "select"){
        $storeClass->getStores();
    }
    if ($_queryType == "delete"){
        $storeClass->idStore = $request->idStore;
        $storeClass->deleteStore($storeClass->idStore);
    }
    if ($_queryType == "add"){
        $storeClass->storeName = $request->storeName;
        $storeClass->location = $request->location;
        $storeClass->link = $request->link;
        $storeClass->phone = $request->phone;
        $storeClass->email = $request->email;
        $storeClass->addStore($storeClass->storeName, $storeClass->location, $storeClass->link, $storeClass->phone, $storeClass->email);
    }
    if ($_queryType == "edit"){
        $storeClass->idStore = $request->idStore;
        $storeClass->storeName = $request->storeName;
        $storeClass->location = $request->location;
        $storeClass->link = $request->link;
        $storeClass->phone = $request->phone;
        $storeClass->email = $request->email;
        $storeClass->editStore($storeClass->idStore, $storeClass->storeName, $storeClass->location, $storeClass->link, $storeClass->phone, $storeClass->email);
    }


?>