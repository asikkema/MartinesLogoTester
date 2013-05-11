function MartineCtrl($scope) {

    var scoreTable = [scoreTable50, scoreTable56, scoreTable60, scoreTable70];
    var normTable  = [normScores50];

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
        $scope.zfNorm = '';
        $scope.awNorm = '';
        $scope.wceNorm = '';
        $scope.tbNorm = '';
        $scope.chvNorm = '';
        $scope.chaNorm = '';
        $scope.roNorm = '';
    };

    $scope.findTableBasedOnAge = function(age, tables) {
        for (var i = 0; i <  tables.length; i++) {
            var r = tables[i];
            console.log('compare: ' + age + ' to min: ' + r.minAge + ' and max: ' + r.maxAge + " is: " + (age >= r.minAge && age <= r.maxAge));
            if (parseFloat(age) >= parseFloat(r.minAge) && parseFloat(age) <= parseFloat(r.maxAge)) return r;
        }
        alert('Geen tabel aanwezig voor leeftijd: "' + age +'".');
        return null;
    };

    $scope.findInTable = function(table, part, rawScore) {
        for (var i=0; i < table[part].length; i++) {
            var r = table[part][i];
            if (rawScore >= r.from && rawScore <= r.to) {
                return r;
            }
        }
        console.log('Score: ' + rawScore + ' valt buiten het bereik van de tabel. [' + part + ']');
        return null;
    };

    $scope.search = function(part, score) {
        if ($scope.years == undefined) {
            alert("Geen leeftijd, voer geboorte datum in.");
        } else {
            var t = $scope.findTableBasedOnAge($scope.years, scoreTable);
            if (t != null) {
                console.log('Tabel: ' + t.minAge + ' - ' + t.maxAge + '. part: ' + part);
                return $scope.findInTable(t, part, score);
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

    function isEmpty(s) {
        return s == null || s == undefined || s == ''
    }

    $scope.sum = function() {
        var total = 0;
        for (var i=0; i < arguments.length; i++) {
            console.log('summing: ' + arguments[i]);
            if (isEmpty(arguments[i])) return '';
            total = total + arguments[i];
        }
        return total;
    };

    $scope.updateTotals = function() {
        function safeFindInTable(table, part, rawScore, retVal) {
            var r =  $scope.findInTable(table, part, rawScore);
            if (isEmpty(r)) return '';
            else {
                console.log("YES");
                return r[retVal];
            }
        }

        console.log('update totals');
        $scope.totaalNorm_Kernscore              = $scope.sum($scope.bavNorm , $scope.wsNorm , $scope.zhNorm , $scope.zfNorm);
        $scope.totaalNorm_Receptieve_Taal_Index  = $scope.sum($scope.bavNorm , $scope.wcrNorm , $scope.zbNorm);
        $scope.totaalNorm_Expressieve_Taal_Index = $scope.sum($scope.wsNorm , $scope.zhNorm , $scope.zfNorm , $scope.wceNorm , $scope.awNorm);
        $scope.totaalNorm_Taalinhoud_Index       = $scope.sum($scope.bavNorm , $scope.wcrNorm , $scope.wceNorm , $scope.awNorm , $scope.tbNorm);
        $scope.totaalNorm_Taalvorm_Index         = $scope.sum($scope.wsNorm , $scope.zhNorm , $scope.zfNorm , $scope.zbNorm);
        $scope.totaalNorm_Werkgeheugen_Index     = $scope.sum($scope.chvNorm , $scope.chaNorm , $scope.roNorm);

        var nt = $scope.findTableBasedOnAge($scope.years, normTable);
        if (nt == null) {
            alert("Kan normscore tabel niet vinden voor: " + $scope.years + " leeftijd.");
        }
        else {
            $scope.norm_Kernscore                    = safeFindInTable(nt, 'ks', $scope.totaalNorm_Kernscore, 'normScore');
            $scope.percentiel_Kernscore              = safeFindInTable(nt, 'ks', $scope.totaalNorm_Kernscore, 'percentiel');
            $scope.norm_Receptieve_Taal_Index        = safeFindInTable(nt, 'rti', $scope.totaalNorm_Receptieve_Taal_Index, 'normScore');
            $scope.percentiel_Receptieve_Taal_Index  = safeFindInTable(nt, 'rti', $scope.totaalNorm_Receptieve_Taal_Index, 'percentiel');
            $scope.norm_Expressieve_Taal_Index       = safeFindInTable(nt, 'eti', $scope.totaalNorm_Expressieve_Taal_Index, 'normScore');
            $scope.percentiel_Expressieve_Taal_Index = safeFindInTable(nt, 'eti', $scope.totaalNorm_Expressieve_Taal_Index, 'percentiel');
            $scope.norm_Taalinhoud_Index             = safeFindInTable(nt, 'tii', $scope.totaalNorm_Taalinhoud_Index, 'normScore');
            $scope.percentiel_Taalinhoud_Index       = safeFindInTable(nt, 'tii', $scope.totaalNorm_Taalinhoud_Index, 'percentiel');
            $scope.norm_Taalvorm_Index               = safeFindInTable(nt, 'tvi', $scope.totaalNorm_Taalvorm_Index, 'normScore');
            $scope.percentiel_Taalvorm_Index         = safeFindInTable(nt, 'tvi', $scope.totaalNorm_Taalvorm_Index, 'percentiel');
            $scope.norm_Werkgeheugen_Index           = safeFindInTable(nt, 'wgi', $scope.totaalNorm_Werkgeheugen_Index, 'normScore');
            $scope.percentiel_Werkgeheugen_Index     = safeFindInTable(nt, 'wgi', $scope.totaalNorm_Werkgeheugen_Index, 'percentiel');
        }
    }
}
