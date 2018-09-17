function liked(itemId){

    var settings = {
        "url": "/liked/"+itemId,
        "method": "GET"
    }

    $.ajax(settings).done(function (response) {
            //console.log("ajax req done");
            $("#alike"+itemId).attr("onclick","unliked("+itemId+")");
            $("#heart"+itemId).removeAttr("class");
            $("#heart"+itemId).attr("class","fas fa-heart");
            if(sessionStorage.getItem("temp_wishlist")){
                sessionStorage.setItem("temp_wishlist",sessionStorage.getItem("temp_wishlist")+","+itemId);
            }else{
                sessionStorage.setItem("temp_wishlist",itemId);
            }
    });
}

$(document).ready(function(){
    if(sessionStorage.getItem("temp_wishlist")){
        var favItems=sessionStorage.getItem("temp_wishlist");
        var facitemsArr=favItems.split(",");
        facitemsArr.forEach(function(itemId){
            $("#heart"+itemId).attr("class","fas fa-heart");
        });
    }
});

function unliked(itemId){

    var settings = {
        "url": "/unliked/"+itemId,
        "method": "GET"
    }

    $.ajax(settings).done(function (response) {
            //console.log("ajax req done");
            $("#alike"+itemId).attr("onclick","liked("+itemId+")");
            $("#heart"+itemId).removeAttr("class");
            $("#heart"+itemId).attr("class","far fa-heart");

    });
}

