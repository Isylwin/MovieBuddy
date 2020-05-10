class OMDB_S_Instance {
  constructor(addToSheet, title, year, imdbId, imdbLink) {
    this.addToSheet = addToSheet
    this.title = title
    this.year = year
    this.imdbId = imdbId
    this.imdbLink = imdbLink
  }
  asArray() { return [this.addToSheet, this.title, this.year, this.imdbId, this.imdbLink] }
}


function omdbSHeaders() {
  return new OMDB_S_Instance("Add to sheet", "Title", "Year", "IMDB ID", "IMDB Link")
}


function omdbSDataRow(rowArray) {
  var addToSheet = false
  var title      = rowArray[0]
  var year       = rowArray[1]
  var imdbId     = rowArray[2]
  var imdbLink   = "https://www.imdb.com/title/" + imdbId

  return new OMDB_S_Instance(addToSheet, title, year, imdbId, imdbLink)
}


class OMDB_S_Data {
  constructor(jsonResult) {
    jsonResult.shift() //remove original headers
    this.headers = omdbSHeaders()
    this.data = jsonResult.map(omdbSDataRow)
  }
}


function omdbSDataToSheet(sheet, omdbSData) {
  var headers = omdbSData.headers.asArray();
  var data = omdbSData.data
  
  sheet.appendRow(headers);
  
  var firstData = parseInt(sheet.getLastRow()) + 1;
  data.forEach( function(row) { sheet.appendRow( row.asArray() ) });
  
  sheet.getRange(firstData, 1, data.length, 1).insertCheckboxes();
}


function omdbTData() {
 //TODO NOT IMPLEMENTED move to new file if this should be implemented
}
