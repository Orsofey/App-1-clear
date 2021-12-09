import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

/*Получаем имя из id всех popup */
if (popupLinks.length > 0) { /*Проверка на наличие объектов*/
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index]; /*Получение конкретного объекта*/
        popupLink.addEventListener("click", function (e) {/*Вешаем событие на объект*/
            const popupName = popupLink.getAttribute("href").replace("#", "");
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();/*Запрет работы ссылки*/
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) { /*Проверка на наличие объектов*/
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];/*Получение конкретного объекта*/
        el.addEventListener('click', function (e) {/*Вешаем событие на объект*/
            popupClose(el.closest('.popup')); /*Поиск родителя закрывающего тега*/
            e.preventDefault(); /*Запрет работы ссылки*/
        });
    }
}



function popupOpen(curentPopup) {
    if (curentPopup && unlock) { /*unlock для проверки возможности нажатия на кнопку открытия попапа*/
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup__content')) { /*Проверяет есть ли в попапе контент*/
                popupClose(e.target.closest('.popup'));  /*Закрывает модальное окно при условии выше*/
            }
        });
    }
}
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}


function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'; /*Разница между шириной всего окна и всего контента внутри, чтобы получить ширину скрола, которые будет затем скрыт*/
    
    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            /*Бегаем по всем объектам и добавляем ширину скролла*/
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
        
    body.style.paddingRight = lockPaddingValue; /*Добавление padding для body*/
    body.classList.add('lock');

    unlock = false; /*Лочим unlock*/
    setTimeout(function () {
        unlock = true; /*Присваиваем true, чтобы можно было нажимать*/
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});