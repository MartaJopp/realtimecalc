myApp.service('CalculatorService', function ($http, $location, socket) {
    console.log('CalculatorService Loaded');
    var self = this;

    self.screen = {
        show: ''
    };

    self.equation = {
        problem: '',

    }

    self.equations = {
        data: []
    }

    var socket = io()
    // socket.on("chat", self.data)

    socket.on('chat', function (data) {
        console.log('data getting back', data)
        self.getProblems();
        // self.tests.data = data;
    })
    //updates the screen by adding onto the string
    self.updateScreen = function (value) {
        self.screen.show += value;
    }

    self.total = function (equalSign) {
        self.screen.show += equalSign + eval(self.screen.show);
        self.equation.problem = self.screen.show;
        console.log(self.equation);
        console.log('here')
        $http.post('/calculator/', self.equation, function (response) {
            console.log('now here')
            console.log('success')
        })
        // var socket = io()
        // socket.on("chat", self.test.testing)
    }

        

        self.getProblems = function () {
            $http.get('/calculator/').then(function (response) {
                console.log('Here it is', response);
                self.equations.data = response.data;
                // console.log(self.tests)
            }).catch(function (err) {
                console.log('You did not GET any riddles');
            })
        } // end refreshRentals

    


})//end CalculatorService