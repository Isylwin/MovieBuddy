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
  var omdbSData = omdbSArrayFromJsonResult(result)
  
  searcherSheet.getRange(firstRow, 1, searcherSheet.getLastRow(), searcherSheet.getLastColumn()).removeCheckboxes()
  searcherSheet.getRange(firstRow, 1, searcherSheet.getLastRow(), searcherSheet.getLastColumn()).clearContent()
  
  omdbSArrayToSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName("MovieSearcher"), omdbSData)
  
  searcherSheet.autoResizeColumns(1, searcherSheet.getLastColumn())
}


function addMovieDataToSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var searcherSheet = ss.getSheetByName("MovieSearcher");
  
  var dataSheetName = "Data" + getActiveUser();
  var dataSheet = ss.getSheetByName(dataSheetName);
  
  var firstRow = findInColumn(searcherSheet, 1, SearchResultID) + 2
  var omdbSArray = omdbSArrayFromSheet(searcherSheet, firstRow, 1)
  
  var userMoviesArrray = omdbSArray.filter( function(omdbS) { return omdbS.addToSheet}).map(userMovieFromOmdbS)
  userMovieArrayToSheet(dataSheet, userMoviesArrray)
  
  dataSheet.autoResizeColumns(1, dataSheet.getLastColumn())
}


function buildTotalSheet() {
  
  
}
  