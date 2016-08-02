'use strict';

var BIRTH_DAY = 19;
var BIRTH_MONTH = 11;

module.exports = {
  daysToExpire: function() {
    var now = new Date();
    var myBirthday = new Date();
    myBirthday.setFullYear(now.getFullYear(), BIRTH_MONTH, BIRTH_DAY);

    var difference = now - myBirthday;

    if (difference < 0) {
      myBirthday.setFullYear(now.getFullYear() - 1, BIRTH_MONTH, BIRTH_DAY);
      difference = now - myBirthday;
    }

    return difference;
  },

  showValidationMessage: function(block) {
    if (!block.validity.valid && (block.parentNode.lastChild.tagName !== 'DIV')) {
      var divWithMessage = document.createElement('div');
      divWithMessage.style.color = 'blue';
      divWithMessage.style.display = 'inline-block';
      divWithMessage.style.borderWidth = '2px';
      divWithMessage.style.borderStyle = 'dotted';
      divWithMessage.style.borderColor = 'blue';
      block.parentNode.appendChild(divWithMessage);
      divWithMessage.appendChild(document.createTextNode(block.validationMessage));
    } else if (block.validity.valid && (block.parentNode.lastChild.tagName === 'DIV')) {
      block.parentNode.removeChild(block.parentNode.lastChild);
    }
  }
};
