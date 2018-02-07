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

    //listens for the pro to receive the full time update
    socket.on('pro', function (data) {
        self.getProblems()
    })
    //updates the screen by adding onto the string
    self.updateScreen = function (value) {
        self.screen.show += value;
    }

    //equation and answer + POST route to database
    self.total = function (equalSign) {
        //saves the current equation
        var problem = self.screen.show
        //evaluates the equation
        self.screen.show = eval(self.screen.show)
        //problem and solution made into an object
        self.equation.problem = problem + equalSign + self.screen.show
        console.log(self.equation);
        console.log('here')
        $http.post('/calculator/', self.equation).then(function (response) {
            console.log('Success');
        }).catch(function (err) {
            console.log('Error Posting Total');
        })
    } //end total function


    //get the last 10 calculations
    self.getProblems = function () {
        $http.get('/calculator/').then(function (response) {
            self.equations.data = response.data;
        }).catch(function (err) {
            console.log('Error getting records');
        })
    } // end getProblems function

    //clears the calculator screen
    self.clear = function () {
        self.screen.show = '';
    } //end clear function



})//end CalculatorService