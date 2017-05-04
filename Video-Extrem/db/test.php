<?php

include("/connection/connection_class.php");
header('Content-Type: text/html; charset=utf8_spanish_ci');
header("Content-Type: text/html;charset=utf-8");
header('Access-Control-Allow-Origin: *'); 

	$categories = array();
	$connection = new connection();
	$select = 'SELECT * from Categorias;';
	$result = $connection->consult($select);
	while($row = mysql_fetch_assoc($result)){
		$categories[] = array("idCategoria"=>$row['idCategoria'], "categoria"=>$row['categoria']);
	}
	echo json_encode($categories);
?>