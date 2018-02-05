myApp.controller('CalculatorController', function ($http, $scope, socket, CalculatorService) {
    var vm = this;
    vm.calculatorService = CalculatorService;

//start display with 0
vm.screen = "";

vm.equation = {
    problem: '',
    
}

//updates the screen by adding onto the string
vm.updateScreen = function (value) {
    vm.screen += value;
}

vm.total = function (value) {
    // vm.equation.problem = vm.screen;
    // console.log(value)
    vm.screen += value + eval(vm.screen);
    vm.equation = vm.screen;
    console.log(vm.equation);

}



    

})//end controller