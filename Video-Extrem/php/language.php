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

    class language{

        public $languageId = 0;
        public $languageName = "";

        function getLanguages() {
            $connection = new connection();
            $languages = array();
            $select = 'SELECT * from Idiomas;';
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $languages[] = array("idIdioma"=>$row['idIdioma'], "idioma"=>$row['idioma']);
            }
            echo json_encode($languages); 
        }

        function deleteLanguage($pLanguageId) {
            $connection = new connection();
            $call = "call deleteLanguage('$pLanguageId');";
            $result = $connection->consult($call);
        }

        function addLanguage($pLanguageName) {
            $connection = new connection();
            $call = "call addLanguage('$pLanguageName');";
            $result = $connection->consult($call);
        }
        
        function editLanguage($pLanguageId, $pLanguageName) {
            $connection = new connection();
            $call = "call updateLanguage('$pLanguageId','$pLanguageName');";
            $result = $connection->consult($call);
        }
    }

    $languageClass = new language();

    if ($_queryType == "select"){
        $languageClass->getLanguages();
    }
    if ($_queryType == "delete"){
        $languageClass->languageId = $request->idIdioma;
        $languageClass->deleteLanguage($languageClass->languageId);
    }
    if ($_queryType == "add"){
        $languageClass->languageName = $request->idioma;
        $languageClass->addLanguage($languageClass->languageName);
    }
    if ($_queryType == "edit"){
        $languageClass->languageName = $request->idioma;
        $languageClass->languageId = $request->idIdioma;
        $languageClass->editLanguage($languageClass->languageId, $languageClass->languageName);
    }


?>