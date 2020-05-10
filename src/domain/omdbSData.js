class OmdbS {
  constructor(addToSheet, title, year, imdbId, imdbLink) {
    this.addToSheet = addToSheet
    this.title = title
    this.year = year
    this.imdbId = imdbId
    this.imdbLink = imdbLink
  }

  static _size = 5;

  static headers() { return new OmdbS("Add to sheet", "Title", "Year", "IMDB ID", "IMDB Link") }
  static fromArray(value) { return new OmdbS(value[0], value[1], value[2], value[3], value[4])}

  asArray() { return [this.addToSheet, this.title, this.year, this.imdbId, this.imdbLink] }
}


function jsonToOmdbS(jsonRow) {
  var addToSheet = false
  var title      = jsonRow[0]
  var year       = jsonRow[1]
  var imdbId     = jsonRow[2]
  var imdbLink   = "https://www.imdb.com/title/" + imdbId

  return new OmdbS(addToSheet, title, year, imdbId, imdbLink)
}


function omdbSArrayFromJsonResult(jsonResult) { 
  jsonResult.shift()
  return jsonResult.map(jsonToOmdbS)
}


function omdbSArrayFromSheet(sheet, rowIndex, columnIndex) {
  var values = sheet.getRange(rowIndex, columnIndex, sheet.getLastRow() - rowIndex, OmdbS._size).getValues()
  return values.map(OmdbS.fromArray)
}


function omdbSArrayToSheet(sheet, omdbSArray) {
  var headers = OmdbS.headers().asArray();
  
  sheet.appendRow(headers);
  
  var firstData = parseInt(sheet.getLastRow()) + 1;
  omdbSArray.forEach( function(row) { sheet.appendRow( row.asArray() ) });
  
  sheet.getRange(firstData, 1, omdbSArray.length, 1).insertCheckboxes();
}


function omdbTData() {
 //TODO NOT IMPLEMENTED move to new file if this should be implemented
}
