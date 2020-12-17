// JavaScript source code
const infiniteScroll = (wrapperEl, moreBtn) => {
    let items = document.querySelector(wrapperEl).children;
    let moreBtnDOM = document.querySelector(moreBtn);

    let itemsNum = items.length;
    let currentShowNum = 0;
    let lastShowNum = 0;

    const SHOW_NUM = 14;
    const INTERVAL = 5;

    showItems();

    moreBtnDOM.addEventListener('click', () => {
        showItems();
    });

    function showItems() {
        currentShowNum += SHOW_NUM;

        if(currentShowNum > itemsNum) {
            for(let i = lastShowNum; i < itemsNum; i++){
                setTimeout(() => {
                    items[i].classList.add('show');
                }, INTERVAL * (i - lastShowNum));
            }

        } else {
            for(let i = lastShowNum; i < currentShowNum; i++){
                setTimeout(() => {
                    items[i].classList.add('show');
                }, INTERVAL * (i - lastShowNum));
            }
        }

        lastShowNum = currentShowNum;
    }
};

infiniteScroll('#infinite-scroll-list', '#more-btn');