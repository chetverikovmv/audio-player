const tabFirst = document.querySelector('.tab-first');
const tabSecond = document.querySelector('.tab-second');

const tableFirst = document.querySelector('.table-first');
const tableSecond = document.querySelector('.table-second');

tabFirst.addEventListener('click', () => handlerTabFirstClick());
tabSecond.addEventListener('click', () => handlerTabSecondClick());

const handlerTabFirstClick = () => {
    tableFirst.classList.add('table--active');
    tableSecond.classList.remove('table--active');
    tabFirst.classList.add('tab--active');
    tabSecond.classList.remove('tab--active');
}

const handlerTabSecondClick = () => {
    tableFirst.classList.remove('table--active');
    tableSecond.classList.add('table--active');
    tabFirst.classList.remove('tab--active');
    tabSecond.classList.add('tab--active');
}
