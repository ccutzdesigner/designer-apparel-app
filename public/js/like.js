function liked(itemId){

    var settings = {
        "url": "/liked/"+itemId,
        "method": "GET"
    }

    $.ajax(settings).done(function (response) {
            console.log("ajax req done");
            $("#alike"+itemId).attr("onclick","unliked("+itemId+")");
            $("#heart"+itemId).removeAttr("class");
            $("#heart"+itemId).attr("class","fas fa-heart");


    });
}

function unliked(itemId){

    var settings = {
        "url": "/unliked/"+itemId,
        "method": "GET"
    }

    $.ajax(settings).done(function (response) {
            console.log("ajax req done");
            $("#alike"+itemId).attr("onclick","liked("+itemId+")");
            $("#heart"+itemId).removeAttr("class");
            $("#heart"+itemId).attr("class","far fa-heart");

    });
}