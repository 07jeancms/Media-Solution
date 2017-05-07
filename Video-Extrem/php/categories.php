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

    class category{

        public $categoryId = 0;
        public $categoryName = "";

        function getCategories() {
            $connection = new connection();
            $categories = array();
            $select = 'SELECT * from Categorias;';
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $categories[] = array("idCategoria"=>$row['idCategoria'], "categoria"=>$row['categoria']);
            }
            echo json_encode($categories); 
        }

        function deleteCategory($pCategoryId) {
            $connection = new connection();
            $call = "call deleteCategory('$pCategoryId');";
            $result = $connection->consult($call);
        }

        function addCategory($pCategoryName) {
            $connection = new connection();
            $call = "call addCategory('$pCategoryName');";
            $result = $connection->consult($call);
        }
        
        function editCategory($pCategoryId, $pCategoryName) {
            $connection = new connection();
            $call = "call updateCategory('$pCategoryName','$pCategoryId');";
            $result = $connection->consult($call);
        }
    }

    $categoryClass = new category();

    if ($_queryType == "select"){
        $categoryClass->getCategories();
    }
    if ($_queryType == "delete"){
        $categoryClass->categoryId = $request->idCategoria;
        $categoryClass->deleteCategory($categoryClass->categoryId);
    }
    if ($_queryType == "add"){
        $categoryClass->categoryName = $request->categoria;
        $categoryClass->addCategory($categoryClass->categoryName);
    }
    if ($_queryType == "edit"){
        $categoryClass->categoryName = $request->categoria;
        $categoryClass->categoryId = $request->idCategoria;
        $categoryClass->editCategory($categoryClass->categoryId, $categoryClass->categoryName);
    }

?>