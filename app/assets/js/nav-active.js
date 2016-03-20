$(function() {
    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
    $("#nav ul li a").each(function() {
        if ($(this).attr("href") == pgurl) {
            $(this).parent().addClass("current");
        }
        else if (($(this).attr("href") == 'current-students.html') || ($(this).attr("href") == 'prospective-students.html')) {
            
        }
        else if ($(this).attr("href") == 'india-night.html') {

        }
    })
});
