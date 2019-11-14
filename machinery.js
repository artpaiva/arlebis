
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

// Loading a next article below the last article just read
var currentNext = 1;
var maxNext = 3;
window.addEventListener('load', function() {
    watchNext();
    var firstArticle = document.querySelector('#article-1');
    setTheme(firstArticle, true)
    watchTheme(firstArticle);
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
    document.querySelector('.torso').appendChild(next);
    h.target = document.querySelector(`#${targetID}`);
    var observer = new IntersectionObserver(whatNext, options);
    observer.observe(h.target);
}

function fillArticle (element) {
    var separator = document.createElement('div');
    separator.classList.add('next');
    element.appendChild(separator);
    currentNext += 1;
    element.id = `article-${currentNext}`;
    element.innerHTML += document.querySelector('#article-1').innerHTML;
    randomTheme(element.id);
    setTheme(element, false);
    watchTheme(element);
}

function randomTheme (id) {
    var element = document.querySelector(`#${id}`);
    var breviary = element.querySelector('.breviary');
    var backs = ['#111111', '#220000'];
    var fronts = ['#44ffdd', '#ffffff'];
    breviary.setAttribute('front', fronts[Math.floor(Math.random() * fronts.length)]);
    breviary.setAttribute("back", backs[Math.floor(Math.random() * backs.length)]);
}
function setTheme (element, all) {
    var breviary = element.querySelector('.breviary');
    var img = breviary.getAttribute('img');
    var font = breviary.getAttribute('font');
    var front = breviary.getAttribute('front');
    var back = breviary.getAttribute('back');

    var title = breviary.querySelector('.title');
    var backop = back + 'cc';
    var cornice = document.querySelector('.cornice');

    breviary.style.color = title.style.borderColor = front;
    breviary.style.fontFamily = font;
    breviary.style.backgroundImage = `linear-gradient(to bottom, ${back}, ${backop}), url(${img})`;
    if (all) {
        cornice.style.color = front;
        cornice.style.background = back;
    }
}
function watchTheme (element) {
    var target = element.querySelector('.breviary');
    console.log(target);
    let options = {
        rootMargin: '10px',
        threshold: 0,
    }
    var observer = new IntersectionObserver(touchBreviary, options);
    observer.observe(target);
}
var wasAbove = false;
function touchBreviary (entries, observer) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            console.log('ENTREI');
            setTheme (entry.target.parentNode, true);
        }
    });
}