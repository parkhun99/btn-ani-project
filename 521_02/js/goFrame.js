$(document).ready(function () {
    goFirst();
});

function goFirst() {
    $("#headerLogo").on("click touchstart", function () {
        console.log("go first");
        // top.$("#worldGate").hide();
        top.$("#smartSci").css({
            opacity: 0,
            "z-index": 0,
        });
        top.$("#smartSci").attr("src", "about:blank");
    });
}
