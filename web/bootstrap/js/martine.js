function MartineCtrl($scope) {

    var scoreTable = [scoreTable50, scoreTable56, scoreTable60, scoreTable70];

    $scope.calcAge = function () {
        var today = new Date();
        var birthDate = new Date($scope.birthday);
        var years = today.getFullYear() - birthDate.getFullYear();

        var m = today.getMonth() - birthDate.getMonth();
        var months = 0;

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            years--;
            months = today.getMonth() + 12 - birthDate.getMonth();
        } else {
            months = today.getMonth() - birthDate.getMonth();
        }

        var d = months < 10 ? '0' + months : months;

        $scope.years = parseFloat((years + '.' + d));

        console.log('years: ' + $scope.years);

        $scope.ageDisplay = '' + years + ' jaar en ' + months + ' maanden.';

        $scope.bavNorm = '';
        $scope.bavPercentiel = '';
        $scope.zhNorm = '';
        $scope.zhPercentiel = '';
        $scope.wsNorm = '';
        $scope.wsPercentiel = '';
        $scope.bavNorm = '';
        $scope.bavPercentiel = '';
        $scope.wcrNorm = '';
        $scope.zbNorm = '';
    };

    $scope.search = function(part, score) {
        function findTableByAge(age) {
            for (var i = 0; i <  scoreTable.length; i++) {
                var r = scoreTable[i];
                console.log('compare: ' + age + ' to min: ' + r.minAge + ' and max: ' + r.maxAge + " is: " + (age >= r.minAge && age <= r.maxAge));
                if (parseFloat(age) >= parseFloat(r.minAge) && parseFloat(age) <= parseFloat(r.maxAge)) return r;
            }
            alert('Geen tabel aanwezig voor leeftijd: "' + age +'".');
            return null;
        }

        function findInTable(table, part, rawScore) {
            for (var i=0; i < table[part].length; i++) {
                var r = table[part][i];
                if (rawScore >= r.from && rawScore <= r.to) {
                    return r;
                }
            }
            alert('Score: ' + rawScore + ' valt buiten het bereik van de tabel. [' + part + ']');
        }

        if ($scope.years == undefined) {
            alert("Geen leeftijd, voer geboorte datum in.");
        } else {
            var t = findTableByAge($scope.years);
            if (t != null) {
                console.log('Tabel: ' + t.minAge + ' - ' + t.maxAge);
                return findInTable(t, part, score);
            }
        }
    };


    $scope.scoreChange = function(ab) {
        var fieldName = ab + 'Score';
        console.log('searching FieldName: ' + fieldName);
        var r = $scope.search(ab, $scope[fieldName]);
        if (r) {
            $scope[ab+'Norm'] = r.normScore;
            $scope[ab+'Percentiel'] = r.percentiel;
            $scope.updateTotals();
        }
    };

    $scope.updateTotals = function() {
        console.log('update totals');
        $scope.totaalNorm_Kernscore = $scope.bavNorm + $scope.wsNorm + $scope.zhNorm + $scope.zfNorm;
        $scope.totaalNorm_Receptieve_Taal_Index = $scope.bavNorm + $scope.wcrNorm + $scope.zbNorm;
        $scope.totaalNorm_Expressieve_Taal_Index = $scope.wsNorm + $scope.zhNorm + $scope.zfNorm + $scope.wceNorm + $scope.awNorm;
        $scope.totaalNorm_Taalinhoud_Index = $scope.bavNorm + ($scope.wcrNorm + $scope.wceNorm) + $scope.awNorm + $scope.tbNorm;
        $scope.totaalNorm_Taalvorm_Index = $scope.wsNorm + $scope.zhNorm + $scope.zfNorm + $scope.zbNorm;
        $scope.totaalNorm_Werkgeheugen_Index = ($scope.chvNorm + $scope.chaNorm) + $scope.roNorm;
    }
}
