function MartineCtrl($scope) {

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

        $scope.years = years;

        $scope.ageDisplay = '' + years + ' jaar en ' + months + ' maanden.';

        $scope.bavNorm = '';
        $scope.bavPercentiel = '';
        $scope.zhNorm = '';
        $scope.zhPercentiel = '';
        $scope.wsNorm = '';
        $scope.wsPercentiel = '';
        $scope.bavNorm = '';
        $scope.bavPercentiel = '';
    };


    $scope.search = function(part, score) {
        function findTableByAge(age) {
            for (var i = 0; i <  scoreTable.length; i++) {
                var r = scoreTable[i];
                if (age >= r.minAge && age <= r.maxAge) return r;
            }
            alert('Geen tabel aanwezig voor leeftijd: "' + age +'".');
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
            return findInTable(t, part, score);
        }
    };


    $scope.bavScoreChange = function () {
        var r = $scope.search('bav', $scope.bavScore);
        $scope.bavNorm = r.normScore;
        $scope.bavPercentiel = r.percentiel;
        $scope.updateTotals();
    };

    $scope.wsScoreChange = function() {
        var r = $scope.search('ws', $scope.wsScore);
        $scope.wsNorm = r.normScore;
        $scope.wsPercentiel = r.percentiel;
        $scope.updateTotals();
    };

    $scope.zhScoreChange = function() {
        var r = $scope.search('zh', $scope.zhScore);
        $scope.zhNorm = r.normScore;
        $scope.zhPercentiel = r.percentiel;
        $scope.updateTotals();
    };

    $scope.zfScoreChange = function() {
        var r = $scope.search('zf', $scope.zfScore);
        $scope.zfNorm = r.normScore;
        $scope.zfPercentiel = r.percentiel;
        $scope.updateTotals();
    };

    $scope.updateTotals = function() {
        $scope.normTotal = $scope.bavNorm + $scope.wsNorm + $scope.zhNorm + $scope.zfNorm;
    }
}
