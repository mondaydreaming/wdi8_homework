// Homework
// - jQuery videos
// - movies - don’t do it as a rails app
//      - single page search
//      - list of different options
//      - when you choose one - then you see the poster
//      - gh -pages branch - it will put the code into the url for you and host within but not for backend only javascript HTML and CSS

$(document).ready(function() {

    // MODELS
    //general search
    var searchOMDB = function() {
        var query = $('#movieName').val()
        var omdbUrl = "http://omdbapi.com/?s=" + query
        $.getJSON(omdbUrl).done(determineMovie)
            // debugger;

    };

    //determine from list of movies
    var determineMovie = function(result) {
        // debugger;
        var movieList = result.Search
        var $movieDisplay = $('<ul/>').appendTo('#results')

        _(movieList).each(function(movie){
            // var url = [
            //     "http://omdbapi.com/?i=",'#imdbID'
            // ].join('');
            var imdbID = movie.imdbID
            var title = movie.Title
            var $link = $('<button>' + title + '</button>' ).attr('id', imdbID).addClass('btn btn-success showMovie');
            var $eachMovie = $('<li/>').append($link).closest('li').appendTo($movieDisplay);
        })

        $('.showMovie').on('click', function(event){
            event.preventDefault();
            processInformation($(this).attr('id'));
        })   
    };

    //show all movies
    var processInformation = function(id) {
        var url = [
            "http://omdbapi.com/?i=", id
        ].join('');
        var outcome = $.getJSON(url).done(movieDetails)
        // console.log(url)
        // debugger;
    };

    var movieDetails = function(result) {
    // debugger;

        var moviePoster = result.Poster
        var $poster = $('<img>').attr('src', moviePoster);
        $poster.appendTo('#results')
        console.log($poster)
        
    }

    // CONTROLLERS
    //Need to include toggle on off to prevent multiple requests
    $('#movieSearch').on('click', function(event) {
        event.preventDefault();  
        searchOMDB();
        // debugger;
    });

    // $('.showMovie').on('click', function(event){
    //     event.preventDefault();
    //     processInformation($(this).attr('id'));
    // })

    // element that we are working the click on must be uniform and apply to all i.e. can't use unique IDs to grab them

})
