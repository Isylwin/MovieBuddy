// TODO lookup the email to name conversion from a sheet instead of hardcoding.
function getActiveUser() {
  // GET EMAIL ADDRESS OF ACTIVE USER
  var email = Session.getEffectiveUser().getEmail();
  
  switch(email) {
    case "oscardeleeuw@hotmail.com":
      return "Oscar"
    case "j.vorstenbosche@gmail.com":
      return "Jochem"
    case "happynu3@gmail.com":
      return "Bram"
    default:
      throw "Hoeren"
  }
}


// sheet       = Sheet
// columnIndex = Integer
// target      = Object
function findInColumn(sheet, columnIndex, target) {
  var lastRow = sheet.getLastRow();
  var allRows = sheet.getRange(1, columnIndex, lastRow, 1).getValues();
  
  for (var row in allRows) {
    if (allRows[row][0] == target) {
      return parseInt(row) + 1
    }
  }
  
  return -1
}