var app = angular.module('WebApp', []);
app.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.getTuition = function() {
        var workhour = Number($scope.data.workhour || 0);
        var ratehour = Number($scope.data.ratehour || 0);
   
    
        var alls = workhour * ratehour;


        $scope.data.totalp = alls.toFixed(2);   
       
    };

    $scope.getInfo = function() {
        $http.get(base_url + 'interest').then(function successCallback(response) {
            $scope.records = response.data;
        });
    };

    $scope.editInfo = function($id) {
        $http.get(base_url + 'interest/show/' + $id, {}).then(function form(response) {
            $scope.form = response.data;

        });
    };

    $scope.saveInfo = function() {
        $http({
            method: "POST",
            url: base_url + "interest/create",
            data: $scope.data
        }).then(function successCallback() {
            Swal.fire({
                icon: 'success',
                title: 'saved successfully',
                showConfirmButton: false,
                timer: 1500
            })
            $scope.data = {};
            $scope.getInfo();
        });
    };


    $scope.updateInfo = function($id) {
        $http({
            method: "POST",
            url: base_url + 'interest/update/' + $id,
            data: $scope.form
        }).then(function successCallback() {
            Swal.fire({
                icon: 'success',
                title: 'updated successfully',
                showConfirmButton: false,
                timer: 1500
            })
            $scope.getInfo();
            var myModalEl = document.getElementById('edit-info');
            var modal = bootstrap.Modal.getInstance(myModalEl)
            modal.hide();
        });
    };

    $scope.deleteInfo = function($id) {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {

                $http.get(base_url + 'interest/delete/' + $id).
                then(function() {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    $scope.getInfo();
                });
            }
        })
    };

    $scope.getCategory = function() {
        $http.get(base_url + 'category').then(function successCallback(response) {
            $scope.categories = response.data;
        });
    };

    $scope.getOrderTotal = function() {
        $http.get(base_url + 'cart/order-totals').then(function successCallback(response) {
            console.log(response.data);
            $scope.totals = response.data;
        });
    };


}]);

app.filter('pagination', function() {
    return function(input, start) {
        if (!input || !input.length) {
            return;
        }
        start = +start; //parse to int
        return input.slice(start);
    };
});


app.filter('roundTo', function(numberFilter) {
    return function(value, maxDecimals) {
        return numberFilter((value || 0)
            .toFixed(maxDecimals)
            .replace(/(?:\.0+|(\.\d+?)0+)$/, "$1")
        );
    }
})

app.filter('percentage', ['$filter', function($filter) {
    return function(input, decimals) {
        return $filter('number')(input / 100, decimals);
    };
}]);

app.filter('numbersWithoutTrailingZero', function($filter) {
    return function(input, decimalPlaces) {
        if (input % 1) {
            return $filter('number')(input, decimalPlaces);
        }
        return $filter('number')(input, 0);
    };
});



app.filter('numberEx', ['numberFilter', '$locale',
    function(number, $locale) {

        var formats = $locale.NUMBER_FORMATS;
        return function(input, fractionSize) {
            //Get formatted value
            var formattedValue = number(input, fractionSize);

            //get the decimalSepPosition
            var decimalIdx = formattedValue.indexOf(formats.DECIMAL_SEP);

            //If no decimal just return
            if (decimalIdx == -1) return formattedValue;


            var whole = formattedValue.substring(0, decimalIdx);
            var decimal = (Number(formattedValue.substring(decimalIdx)) || "").toString();

            return whole + decimal.substring(1);
        };
    }
]);


app.filter('sumOfValue', function() {
    return function(data, key) {
        if (angular.isUndefined(data) || angular.isUndefined(key))
            return 0;
        var sum = 0;
        angular.forEach(data, function(value) {
            sum = sum + parseInt(value[key], 10);
        });
        return sum;
    };
});

app.filter('capitalize', function() {
    return function(input) {
        return (angular.isString(input) && input.length > 0) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : input;
    }
});



function isAlfa(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 32 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
        return false;
    }
    return true;
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}    

function removeWhitespaces() {
    //Get the value from textbox
    var txtbox = document.getElementById('txtFN');
    //Remove all white spaces from textbox using the regex
    txtbox.value = txtbox.value.replace(/\s/g, "");
}

function trim(el) {
    el.value = el.value.
    replace(/(^\s*)|(\s*$)/gi, ""). // removes leading and trailing spaces
    replace(/[ ]{2,}/gi, " "). // replaces multiple spaces with one space
    replace(/\n +/, "\n"); // Removes spaces after newlines
    return el;
}

function isNumberKey(evt, obj) {

    var charCode = (evt.which) ? evt.which : event.keyCode
    var value = obj.value;
    var dotcontains = value.indexOf(".") != -1;
    if (dotcontains)
        if (charCode == 46) return false;
    if (charCode == 46) return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

