// TODO lookup the email to name conversion from a sheet instead of hardcoding.
function getActiveUser() {
  // GET EMAIL ADDRESS OF ACTIVE USER
  var email = Session.getEffectiveUser().getEmail();
  
  if (email = "oscardeleeuw@hotmail.com") {
    return "Oscar"
  }
  if (email = "j.vorstenbosche@gmail.com") {
    return "Jochem" 
  }
  if (email = "happynu3@gmail.com") {
    return "Bram"
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