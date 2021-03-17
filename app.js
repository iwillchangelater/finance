// дэлгэцийн контролллэр 
var uiController = (function() {

})();
// санхүүгийн контроллер 
var fanincialController = (function() {

})();
// холбогч конроллэр 
var connectionController = (function(uiController, fanincialController) {
    var ctrlAddItem = function() {
        // 1 орлого зарлагаа аван.
        console.log("oruulah btn daragdsan");
        // 2 орлого зарлагаа санхүүгийн контроллэрт дамжүүлна
        // 3 мэдээллийг харагдах газарт нь гаргана.
        // 4 төсөв тооцоолох 
        // 5 эцсийн үлдэгдэл    
    };
    document.querySelector(".add__btn").addEventListener("click", function() {
        ctrlAddItem();
    });
    document.addEventListener("keydown", function(event) {
        if (event.keyCode == 13 || event.which == 13) { ctrlAddItem(); };
    });
})(uiController, fanincialController);