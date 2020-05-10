var SearchResultID = "SRID"
var urlLocation    = "K2"

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('MovieBuddy')
      .addItem('Add movies to my data sheet', 'addMovieDataToSheet')
      .addItem('Build total sheet', 'buildTotalSheet')
      .addItem('Search movies', 'searchMovies')
  .addToUi();
}


function searchMovies() {
  var searcherSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("MovieSearcher");
  var url = searcherSheet.getRange(urlLocation).getValue()
  var firstRow = findInColumn(searcherSheet, 1, SearchResultID) + 1 
  
  var result = ImportJSON(url, "", "noInherit, noTruncate");
  var omdbSData = new OMDB_S_Data(result)
  
  searcherSheet.getRange(firstRow, 1, searcherSheet.getLastRow(), searcherSheet.getLastColumn()).removeCheckboxes()
  searcherSheet.getRange(firstRow, 1, searcherSheet.getLastRow(), searcherSheet.getLastColumn()).clearContent()
  
  omdbSDataToSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName("MovieSearcher"), omdbSData)
  
  searcherSheet.autoResizeColumns(1, searcherSheet.getLastColumn())
}


function addMovieDataToSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var searcherSheet = ss.getSheetByName("MovieSearcher");
  
  var dataSheetName = "Data" + getActiveUser();
  var dataSheet = ss.getSheetByName(dataSheetName);
  
  var firstRow = findInColumn(searcherSheet, 1, SearchResultID) + 2
  var moviesToAdd = searcherSheet.getRange(firstRow, 1, searcherSheet.getLastRow() - firstRow, 6).getValues();
  
  for (var i in moviesToAdd) {
    parseMovie(moviesToAdd[i], dataSheet)
  }
  
  dataSheet.autoResizeColumns(1, dataSheet.getLastColumn())
}


function buildTotalSheet() {
  
  
}


// Row   = ToAdd, Title,  Year,   IMBD reference, IMBD link
// Types = Bool,  String, String, String,         String
function parseMovie(row, dataSheet) {
  var toAdd = row[0]
  var title = row[1]
  var id = row[3]
  var imbdLink = row[4]
  
  if (toAdd) {
    var data = [id, title, false, 0, 0, false, imbdLink]
    dataSheet.appendRow(data)
  }
}




  