// дэлгэцийн контролллэр 
var uiController = (function() {
    var DOMList = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn"
    };
    return {
        getDOMList: function() {
            return DOMList;
        },
        getInput: function() {
            return {
                type: document.querySelector(DOMList.inputType).value,
                description: document.querySelector(DOMList.inputDescription).value,
                value: document.querySelector(DOMList.inputValue).value
            }

        }
    }

})();
// санхүүгийн контроллер 
var fanincialController = (function() {
    var income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;

    }
    var expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var data = {
        items: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
    }
    return {
        addItem: function(type, desc, val) {
            var item;
            var id;
            if (data.items[type].length == 0) {
                id = 1;

            } else {
                id = data.items[type][data.items[type].length - 1].id + 1;
            }
            if (type == 'inc') {
                item = new income(id, desc, val);
            } else {
                item = new expense(id, desc, val);
            }
            data.items[type].push(item)
        },
        seedata: function() {
            return data;
        },
        deldata: function() {
            return delete data.items["inc"]["1"];
        }
    }
})();
// холбогч конроллэр 
var connectionController = (function(uiController, fanincialController) {
    var ctrlAddItem = function() {
        var input = uiController.getInput();
        // 1 орлого зарлагаа аван.
        fanincialController.addItem(input.type, input.description, input.value);
        console.log("nemegdsen");
        // 2 орлого зарлагаа санхүүгийн контроллэрт дамжүүлна
        // 3 мэдээллийг харагдах газарт нь гаргана.
        // 4 төсөв тооцоолох 
        // 5 эцсийн үлдэгдэл    
    };
    var setupEventListeners = function() {
        var DOM = uiController.getDOMList();
        document.querySelector(DOM.addBtn).addEventListener("click", function() {
            ctrlAddItem();
        });
        document.addEventListener("keydown", function(event) {
            if (event.keyCode == 13 || event.which == 13) { ctrlAddItem(); };
        });
    }
    return {
        init: function() {
            console.log("app started");
            setupEventListeners();
        }
    }
})(uiController, fanincialController);

connectionController.init();