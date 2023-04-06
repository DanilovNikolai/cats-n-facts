// Функция, проверяющая, что все DOM элементы загружены прежде, чем выполнится код

const ready = (anyFn) => {
   if (document.readyState !== 'loading') {
      anyFn();
   } else {
      console.log('DOM загружен!');
      document.addEventListener('DOMContentLoaded', anyFn);
   }
}

// Навешиваем на стрелку на начальном экране (fullscreen) прокрутку вниз при событии "click"
const arrowDown = document.querySelector('.fullscreen__arrow');
const content = document.querySelector('.content');
const body = document.querySelector('body');
const footer = document.querySelector('.footer');

function scrollDown() {
   // footer.scrollIntoView({behavior: "smooth", block: "end"});
   document.body.scrollTo({
      top: 920,
      behavior: "smooth",
   });
}

ready(arrowDown.addEventListener('click', scrollDown));

// =======SLIDER SWIPER===============

// const swiper = new Swiper('.swiper', {
//    // Optional parameters
//    loop: true,
//    direction: 'horizontal',
//    effect: 'slide',
//    width: 300,
//    // autoHeight: true,
//    // If we need pagination
//    pagination: {
//       el: '.swiper-pagination',
//       clickable: true,
//    },
//    slidesPerView: 1,
//    // Navigation arrows
//    navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//    },
//    // And if we need scrollbar
//    scrollbar: {
//       el: '.swiper-scrollbar',
//       draggable: true,
//    },
// });

// =========== Random Cats & Facts ============
const url = 'https://api.thecatapi.com/v1/images/search';
const url2 = 'https://cat-fact.herokuapp.com/facts';
const catFacts = document.querySelector('.catfact');
const catContainer = document.querySelector('.catcontainer');
const catButton = document.querySelector('.catbutton');

function randomIntFromInterval(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min)
}

const getCat = () => {
   fetch(url)
   .then(data => data.json())
   .then(data => {
      console.log(data[0].url);
      let count = 0;
      count += 1;
      catContainer.style.backgroundImage = 'url(' + data[0].url + ')';
   })
}
const getFact = () => {
   fetch(url2, {
      headers: {
      'x-api-key': 'your-api-key'
      }
   })
   .then(data => data.json())
   .then(data => {
      console.log(data);
      let random = randomIntFromInterval(0, 4);
      catFacts.innerHTML = `Факт № ${random}: ${data[random].text}`;
   })
}

catButton.addEventListener('click', () => {
   getCat();
   getFact();
})