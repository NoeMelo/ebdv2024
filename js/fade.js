document.addEventListener('DOMContentLoaded', function() {
    var sections = document.querySelectorAll('.container-custom');
    for (var i = 0; i < sections.length; i++) {
        sections[i].addEventListener('scroll', function() {
            this.classList.add('fade');
        });
    }
    console.log(sections)
});
