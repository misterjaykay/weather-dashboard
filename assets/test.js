function makeListItems(text) {
    console.log(this);
    var liEl = $("<li>").addClass("list-group-item city-history-list");
    /// Option 1, make <a> tag
    // var aEl = $("<a>").attr("href", "index.html").addClass("previous-city").html(text);
    // $(liEl).append(aEl);
    // $(".city-history").append(liEl);

    /// Option 2, make <button> tag
    var buttonEl = $("<button>").attr("href", "index.html").addClass("previous-city").html(text);
    $(liEl).append(buttonEl);
    $(".city-history").append(liEl);
}


if (search.indexOf(input) === -1) {
    console.log(search);
    console.log(input);

    // search.push(input); 

    var userSearch = pulldata.name;
    search.push(userSearch);

    localStorage.setItem("search",JSON.stringify(search));
    makeListItems(search);

} 