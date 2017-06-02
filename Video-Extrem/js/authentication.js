function validate(){
    if(!authenticate()){
        [].forEach.call(document.querySelectorAll('.cmsElement'), function (el) {
            el.style.visibility = 'hidden';
        });

    }
}
function authenticate(){
    var userToken =  sessionStorage["userToken"];
    var currentUser =  sessionStorage["currentUser"];
    if(userToken!=null){
        //var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
        //U2FsdGVkX18ZUVvShFSES21qHsQEqZXMxQ9zgHy+bu0=
        //alert(encrypted);
        var decryptedUserToken = CryptoJS.AES.decrypt(userToken,currentUser);
        return (decryptedUserToken.toString(CryptoJS.enc.Utf8) =="true");
    }
    else{
        return false;
    }
}
(function() {
    var script = document.createElement('script');
    script.src = "./js/encrypt.js";
    document.getElementsByTagName('head')[0].appendChild(script);

    this.validate();

})();