// дэлгэцийн контролллэр 
var uiController = (function() {
    var DOMList = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeList: ".income__list",
        expenseList: ".expenses__list"
    };
    return {
        getDOMList: function() {
            return DOMList;
        },
        getInput: function() {
            return {
                type: document.querySelector(DOMList.inputType).value,
                description: document.querySelector(DOMList.inputDescription).value,
                value: parseInt(document.querySelector(DOMList.inputValue).value)
            }

        },
        addList: function(item, type) {
            if (type == "inc") {
                html = '<div class="item clearfix" id="income-' + item.id + '"><div class="item__description">' + item.description + '</div><div class="right clearfix"><div class="item__value">' + item.value + '</div><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                list = DOMList.incomeList;
            } else {
                html = ' <div class="item clearfix" id="expense-' + item.id + '"> <div class="item__description">' + item.description + '</div><div class="right clearfix"> <div class="item__value">' + item.value + '</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';;
                list = DOMList.expenseList;
            }
            document.querySelector(list).insertAdjacentHTML('beforeend', html);
        },
        clearField: function() {
            var fields = document.querySelectorAll(DOMList.inputDescription + "," + DOMList.inputValue);
            var fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(el) {
                el.value = "";
            });
            fieldsArr[0].focus();
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
    var calcTotal = function(type) {
        var sum = 0;
        data.items[type].forEach(function(el) {
            sum += el.value;
        })
        data.totals[type] = sum;

    }
    var data = {
        items: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        tusuv: 0,
        huvi: 0
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
            data.items[type].push(item);
            return item;
        },
        seeData: function() {
            console.log(data);
        },
        total: function() {
            calcTotal('inc');
            calcTotal('exp');
            data.tusuv = data.totals.inc - data.totals.exp;
            data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
        },
        tusuviigAvah: function() {
            return {
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalInc: data.totals.inc,
                totalExp: data.total.exp
            }
        }
    }
})();
// холбогч конроллэр 
var connectionController = (function(uiController, fanincialController) {
    var ctrlAddItem = function() {
        var input = uiController.getInput();
        // 1 орлого зарлагаа аван.
        if (input.description !== "" && !isNaN(input.value)) {
            var item = fanincialController.addItem(input.type, input.description, input.value);
            console.log("nemegdsen");
            uiController.addList(item, input.type);
            uiController.clearField();
            // 2 орлого зарлагаа санхүүгийн контроллэрт дамжүүлна
            // 3 мэдээллийг харагдах газарт нь гаргана.
            // 4 төсөв тооцоолох 
            // 5 эцсийн үлдэгдэл    
            fanincialController.total();

        }
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