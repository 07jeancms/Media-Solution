//     _____                             _   _                 
//    / ____|                           | | (_)                
//   | (___  _   _  __ _  __ _  ___  ___| |_ _  ___  _ __  ___ 
//    \___ \| | | |/ _` |/ _` |/ _ \/ __| __| |/ _ \| '_ \/ __|
//    ____) | |_| | (_| | (_| |  __/\__ \ |_| | (_) | | | \__ \
//   |_____/ \__,_|\__, |\__, |\___||___/\__|_|\___/|_| |_|___/
//                  __/ | __/ |                                
//                 |___/ |___/                                 

app.controller("suggestionsController", suggestionsController);
suggestionsController.$inject = ["NgTableParams", "$resource"];

function suggestionsController(NgTableParams, $resource) {
    // tip: to debug, open chrome dev tools and uncomment the following line 
    //debugger;

    this.tableParams = new NgTableParams({}, {
        getData:function(){
            return []
        }

    });

}  
