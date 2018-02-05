myApp.controller('CalculatorController', function ($http, $scope, socket, CalculatorService) {
    var vm = this;
    vm.calculatorService = CalculatorService;

})//end controller