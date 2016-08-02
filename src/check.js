  var getMessage = function(a,b) {
    if ((typeof a) === 'boolean') {
      if (a) {
        return 'Я попал в ' + b;
      } else {
        return 'Я никуда не попал';
      }
    }

    if ((typeof a) === 'number') {
      return 'Я прыгнул на ' + a * 100 + ' сантиметров';
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      var length = a.reduce(function(previousValue, currentValue, currentIndex) {
        return previousValue + (currentValue * b[currentIndex]); 
      }, 0);
      return 'Я прошёл ' + length + ' шагов';
    } else {
      if (Array.isArray(a)) {
        var sum = a.reduce(function(previousValue, currentValue) {
          return previousValue + currentValue; 
        });
        return 'Я прошел ' + sum + ' шагов';
      }
    }
  };
  