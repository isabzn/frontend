// Dynamically add the "current" class to the list element in the navigation menu
$(function() {
    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
    $("#nav ul li a").each(function() {
        if ($(this).attr("href") == pgurl) {
            $(this).parent().addClass("current");
            if (('current-students.html' == pgurl) || ('prospective-students.html' == pgurl)) {
                $("nav ul").find("#students").addClass("current");
            } else if ('india-night.html' == pgurl) {
                $("nav ul").find("#events").addClass("current");
            }
        }
    })
});
