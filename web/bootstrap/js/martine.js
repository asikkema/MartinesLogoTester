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
    };



    $scope.search = function(part, score) {
        function findTableByAge(age) {
            return scoreTable[0];
        }

        function findInTable(table, part, rawScore) {
            for (var i=0; i < table[part].length; i++) {
                var r = table[part][i];
                if (rawScore >= r.from && rawScore <= r.to) {
                    return r;
                }
            }
        }

        var t = findTableByAge($scope.years);
        return findInTable(t, part, score);
    };


    $scope.bavScoreChange = function () {
        var r = $scope.search('bav', $scope.bavScore);
        $scope.bavNorm = r.normScore;
        $scope.bavPercentiel = r.percentiel;
    };

    $scope.wsScoreChange = function() {
        var r = $scope.search('ws', $scope.wsScore);
        $scope.wsNorm = r.normScore;
        $scope.wsPercentiel = r.percentiel;

    }
}
