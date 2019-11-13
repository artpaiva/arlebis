
var h = window;
var scrollClass = 'scroll';

window.onscroll = function (){ 
    var cornice  = document.getElementById('cornice');
    // console.log(document.body.scrollTop);
    if (document.body.scrollTop > 0 ) {
        cornice.classList.add(scrollClass);
        // console.log(cornice.classList);
    } 
    else {
        cornice.classList.remove(scrollClass);
    }
};

function turnTorsoPanel(ele) {
    ele.classList.toggle("active");
}

// function changeTheme() {
//   var check = document.getElementById('check-theme');
//   if (check.checked == true){
//     console.log('Dark Theme');
//     scrollClass = 'scroll';
//     if (document.body.scrollTop > 0 ) {
//         cornice.classList.add(scrollClass);
//     }
//     cornice.classList.remove('scrolle');
//   } else {
//     console.log('Light Theme');
//     scrollClass = 'scrolle';
//     cornice.classList.add(scrollClass);
//     cornice.classList.remove('scroll');
//   }
// }

// Loading a next article below the last article just read
var currentNext = 1;
var maxNext = 3;
window.addEventListener('load', function() {
    watchNext();
    // var breviary = document.querySelector('.breviary')
    // breviary.style.color = breviary.getAttribute('front');
});

function whatNext (entries, observer) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            fillArticle(h.target);
            observer.unobserve(h.target);
            if(currentNext <= maxNext){
                var tellNext = setInterval( () => {
                    watchNext();
                    clearInterval(tellNext);
                }, 10);
            }
        }
    });
}
function watchNext () {
    h.previousArticle = document.querySelector(`#article-${currentNext}`);
    let options = {
      rootMargin: '10px',
      threshold: 0.8,
    }
    var next = document.createElement('article');
    var targetID = `next-${currentNext}`;
    next.id = targetID;
    // h.previousArticle.parentNode.insertBefore(next, h.previousArticle.nextSibling);
    document.querySelector('.torso').appendChild(next);
    h.target = document.querySelector(`#${targetID}`);
    var observer = new IntersectionObserver(whatNext, options);
    observer.observe(h.target);
}

function fillArticle (element) {
    var separator = document.createElement('div');
    separator.classList.add('next');
    // h.previousArticle.parentNode.insertBefore(separator, h.previousArticle.nextSibling);
    // h.previousArticle.appendChild(separator);
    element.appendChild(separator);
    // element.classList.add('article');
    currentNext += 1;
    element.id = `article-${currentNext}`;
    element.innerHTML += document.querySelector('#article-1').innerHTML;
    var breviary = element.querySelector('.breviary');
    var wrapper = breviary.querySelector('.wrapper');
    // console.log(breviary);
    // wrapper.appendChild(separator);
}