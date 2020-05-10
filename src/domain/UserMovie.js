class UserMovie {
  constructor(title, seen, rewatchable, rating, watchDesire, imdbLink, imdbId) {
    this.title = title
    this.seen = seen
    this.rewatchable = rewatchable
    this.rating = rating
    this.watchDesire = watchDesire
    this.imdbLink = imdbLink
    this.imdbId = imdbId
  }

  asArray() { return [this.title, this.seen, this.rewatchable, this.rating, this.watchDesire, this.imdbLink, this.imdbId] }
}


function userMovieFromOmdbS(omdbS) {
  var title = omdbS.title
  var seen = false
  var rewatchable = false
  var rating = 0
  var watchDesire = 0
  var imdbLink = omdbS.imdbLink
  var imdbId = omdbS.imdbId

  return new UserMovie(title, seen, rewatchable, rating, watchDesire, imdbLink, imdbId)
}


function userMovietoSheet(sheet, userMovie) {
  sheet.appendRow(userMovie.asArray())
  sheet.getRange(sheet.getLastRow(), 2, 1, 2).insertCheckboxes()
}


function userMovieArrayToSheet(sheet, userMovieArray) {
    userMovieArray.forEach( function (userMovie) { userMovietoSheet(sheet, userMovie) })  
}

