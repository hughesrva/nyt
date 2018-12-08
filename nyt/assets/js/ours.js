var resultsCount;
var searchQuery; // q
var startYear; // begin_date
var endYear; // end_date
var searchInput;
var title;
var author;

$("#searchBtn").on("click", searchFunction());

function searchFunction() {
    searchQuery = $("#searchInput").val().trim();
    resultsCount = $("#resultsNumber").val().trim();
    startYear = $("#startYearSel").val().trim();
    endYear = $("#endYearSel").val().trim();

    function showResults() {
        var resultTitle = $("<p></p>").text(title);
        $("#resultsRow").append(resultTitle);
        var resultAuthor = $("<p></p>").text(author);
        $("#resultsRow").append(resultAuthor);
    }

    resultsCount = 5;;
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' +
        'api-key=00b76c2a17a44867a0f3d287d545f5a8'
        + "&q="
        + searchQuery
        + "&fq=byline";
    $.ajax({
        url: url,
        method: 'GET',
    }).done(function (response) {
        for (i = 0; i < resultsCount; i++) {
            title = response.response.docs[i].headline.main;
            author = response.response.docs[i].byline.original;
            console.log(title);
            showResults();
        }

    }).fail(function (err) {
        throw err;
    });
    showResults();
};
