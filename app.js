(function () {
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceProvider)

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var list = this;

        list.items = ShoppingListCheckOffService.getBuyItems();

        list.moveItem = function (itemIndex) {
          ShoppingListCheckOffService.moveItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var list = this;
        list.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService(minItems) {
        var service = this;
      
        // List of shopping items
        var BuyItems = [
        { name: "bread", quantity: "1 loaf" },
        { name: "milk", quantity: "1 gallon" },
        { name: "honey", quantity: "1 bottle" },
        { name: "eggs", quantity: "2 dozen" },
        { name: "yogurt", quantity: "5 containers" },
        ];
        var BoughtItems = [];

        service.moveItem = function (itemIndex) {
          var item = BuyItems[itemIndex];
          BoughtItems.push(item);
          BuyItems.splice(itemIndex, 1);
        };
      
        service.getBuyItems = function () {
          return BuyItems;
        };

        service.getBoughtItems = function () {
          return BoughtItems;
        };

      }

      function ShoppingListCheckOffServiceProvider() {
        var provider = this;

        provider.$get = function () {
          var shoppingList = new ShoppingListCheckOffService();
          return shoppingList;
        };
      }

})();