myApp.controller('CalculatorController', function ($http, $scope, socket, CalculatorService) {
    var vm = this;
    vm.calculatorService = CalculatorService;

    vm.screen = CalculatorService.screen;
    vm.equations = CalculatorService.equations;

    //updates the screen by adding onto the string
    vm.updateScreen = function (value) {
        CalculatorService.updateScreen(value);
        // vm.screen += value;
    }

    //calls the total function from the service
    vm.total = function (equalSign) {
        CalculatorService.total(equalSign)
    }

    //gets last 10 records
    vm.getProblems = function () {
        CalculatorService.getProblems();
    }
//call getProblems to get last 10 upon entering site
vm.getProblems()


})//end controller