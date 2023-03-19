(() => {
  window.addEventListener('DOMContentLoaded', () => {
    const TARIFF = 0.22; //  руб/ткм
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

    const hideTabContent = () => {
      tabsContent.forEach((item) => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
      });
      tabs.forEach((tab) => tab.classList.remove('tabheader__item_active'));
    };

    const showTabContent = (i = 0) => {
      tabsContent[i].classList.remove('hide');
      tabsContent[i].classList.add('show', 'fade');
      tabs[i].classList.add('tabheader__item_active');
    };

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
      const target = e.target;
      if (target?.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
          if (target === item) {
            hideTabContent();
            showTabContent(i);
          }
        });
      }
    });

    //Timer
    const deadline = '2023-03-20';

    const getTimeRemaning = (endTime) => {
      const total = Date.parse(endTime) - Date.parse(new Date()),
        days = Math.floor(total / (1000 * 3600 * 24)),
        hours = Math.floor((total / (1000 * 3600)) % 24),
        minutes = Math.floor((total / (1000 * 60)) % 60),
        seconds = Math.floor((total / 1000) % 60);
      return {
        total,
        days,
        hours,
        minutes,
        seconds,
      };
    };

    const getZero = (num) => {
      return num >= 0 && num < 10 ? `0${num}` : num;
    };

    const setClock = (selector, endTime) => {
      const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);
      updateClock();

      function updateClock() {
        const time = getTimeRemaning(endTime);
        days.textContent = getZero(time.days);
        hours.textContent = getZero(time.hours);
        minutes.textContent = getZero(time.minutes);
        seconds.textContent = getZero(time.seconds);

        if (!time.total || time.total <= 0) {
          clearInterval(timeInterval);
          timer.innerHTML = '<h2>Акция завершена</h2>';
        }
      }
    };
    setClock('.timer', deadline);

    //Modal
    const modal = document.querySelector('.modal');
    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modalCloseBtn = document.querySelector('[data-modal-close]');

    const closeModal = () => {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.removeProperty('overflow');
    };

    const openModal = () => {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimerId);
    };
    modalTrigger.forEach((btn) => {
      btn.addEventListener('click', () => {
        openModal();
      });
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modalCloseBtn || e.target === modal) {
        closeModal();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (modal.classList.contains('show') && e.code === 'Escape') {
        closeModal();
      }
    });

    const modalTimerId = setTimeout(openModal, 500000000000);

    const openModalByScroll = () => {
      if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        openModal();
        window.removeEventListener('scroll', openModalByScroll);
      }
    };

    window.addEventListener('scroll', openModalByScroll);

    //Card classes

    class MenuCard {
      constructor(imgSrc, imgAlt, title, discription, price, parentSelector) {
        this.src = imgSrc;
        this.alt = imgAlt;
        this.title = title;
        this.discription = discription;
        this.price = +price;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 2.8;
        this.changeToBLR();
      }
      changeToBLR() {
        this.price = Math.round(this.price * this.transfer);
      }
      render() {
        const element = document.createElement('div');
        element.classList.add('menu__item');
        element.innerHTML = `<img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">
              ${this.discription}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> руб/час</div>
            </div>`;
        this.parent.append(element);
      }
    }

    new MenuCard(
      'img/tabs/cargo.avif',
      'cargo',
      'ГРУЗОВЫЕ ПЕРЕВОЗКИ"',
      'Выполним доставку различных грузов. Работаем по всей территории РБ и РФ. Все наши автомобили оборудованны крепежными ремнями и упаковочным материалом.',
      8,
      '.menu .container'
    ).render();

    new MenuCard(
      'img/tabs/flatMoving.avif',
      'flatMoving',
      'КВАРТИРНЫЕ И ОФИСНЫЕ ПЕРЕЕЗДЫ”',
      'Выполним квартирные и офисные переезды качественно и быстро. Предлагаем полный цикл квартирного или офисного переезда, от упаковки до перевозки и подъёма на этаж.',
      18,
      '.menu .container'
    ).render();

    new MenuCard(
      'img/tabs/loaders.avif',
      'loaders',
      'УСЛУГИ ГРУЗЧИКОВ"',
      'Мы предоставляем услуги квалифицированных грузчиков в любом количестве. Аккуратно и в кратчайшие сроки, наши грузчики произведут погрузку и разгрузку ваших вещей или грузов.',
      10,
      '.menu .container'
    ).render();

    const form = document.querySelector('form');
    form.addEventListener('change', function () {
      const length = document.querySelector('#length').value;
      const width = document.querySelector('#width').value;
      const height = document.querySelector('#height').value;
      const weight = document.querySelector('#weight').value;
      const distance = document.querySelector('#distance').value;

      const price = distance * TARIFF;
      $('.calculating__result span').text(price);
    });
    


    $('.offer__slider-wrapper').slick({
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 5000,
      nextArrow: '.offer__slider-next',
      prevArrow: '.offer__slider-prev',
    });
    $('.offer__slider-wrapper').on('afterChange', function (event, slick, currentSlide, nextSlide) {
      $('#current').text('0' + (currentSlide + 1));
    });
    $('#total').text('0' + $('.offer__slider-wrapper').slick('getSlick').slideCount);
  });
})();
