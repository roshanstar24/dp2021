function emailvalidation(xhtml) {
    var x = xhtml.val();
    var atposition = x.indexOf("@");
    var dotposition = x.lastIndexOf(".");
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= x.length) {
        xhtml.css('border-color', 'red');
        return true
    }
    else {
        return false
    }
}
function emptyvalidation(xhtml) {
    var x = xhtml.val();
    x = x.trim();
    if (x.length == 0) {
        xhtml.css('border-color', 'red')
        return true
    }
    else {
        return false;
    }
}
var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000
});