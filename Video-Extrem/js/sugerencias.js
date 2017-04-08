var loadSuggestion = true;

function showHideTextArea() {
    suggestionButton = document.getElementById('suggestionButton');
    if (loadSuggestion == true){
        document.getElementById('suggestionTextArea').style.display = "block";
        suggestionButton.textContent = "-";
        loadSuggestion = false;
    }
    else{
        document.getElementById('suggestionTextArea').style.display = "none";
        suggestionButton.textContent = "+";
        loadSuggestion = true;
    }
}

function sendSuggestionInfo(){
    var textAreaSuggestion = document.getElementById('textAreaSuggestion');
    var selectLocal = document.getElementById('selectLocal');
    var strNewLine = "\n";
    var strValidation = "";
    if(selectLocal.value === "local"){
        strValidation += "Porfavor ingresa:" + strNewLine + "Un local" + strNewLine;
    }
    if(textAreaSuggestion.value === ""){
        strValidation += "Una sugerencia" + strNewLine;
    }
    if (strValidation === ""){
        alert("PLACEHOLDER: Gracias, tu sugerencias ha sido enviada");
        showHideTextArea();
    }
    else{
        alert(strValidation);
    }
}