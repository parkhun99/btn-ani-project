$(document).ready(function() {
    $("#bar").draggable({
        axis: 'y',
        containment: 'parent'
    });
    $("#bar").on("drag", function (event, ui) {
        getPos()
    });

    var min = 0; 
    var max = -800; 

    function getPos() {
        var barTop = $("#bar").css("top"); 
        barTop = parseInt(barTop); 
        var pos = (barTop * (max - min)) / 780 + min; 
        $("#contListWrap ul").css("top", pos);
    }
});


