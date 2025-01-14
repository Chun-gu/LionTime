import { getFromQueryString } from './lib.js';

const modalContainer = document.querySelector('.list-modal-container');
const modal = document.querySelector('.modal');
const dimd = document.querySelector('.dimd');
const userId = getFromQueryString('userId');
const myUserId = sessionStorage.getItem('my-accountname');
const isMyProfile = userId === myUserId;

let bottomValue = 0;

document.addEventListener('click', (e) => {
    if (e.target.classList.value === 'btn-menu') {
        const menulist = createEle('li', 'class', 'list-modal-menu');
        const menuBtn = createEle('button', 'type', 'button');
        addAttr(menuBtn, 'class', 'btn-list close-chat-room');
        menuBtn.appendChild(document.createTextNode('채팅방 나가기'));
        menulist.appendChild(menuBtn);
        modalContainer.appendChild(menulist);

        bottomValue = modalContainer.childElementCount * 46 + 46;
        modal.style.bottom = `-${bottomValue}px`;

        if (modal.classList.value === 'modal') {
            createModal();
        } else {
            removeModal();
        }
    }

    if (e.target.classList.value === 'btn-profile-menu') {
        const menulistfirst = createEle('li', 'class', 'list-modal-menu');
        const menulistSecond = createEle('li', 'class', 'list-modal-menu');
        const menuBtnSetting = createEle('button', 'type', 'button');
        const menuBtnLogOut = createEle('button', 'type', 'button');

        addAttr(menuBtnSetting, 'class', 'btn-list setting');
        menuBtnSetting.appendChild(document.createTextNode('설정 및 개인정보'));
        addAttr(menuBtnLogOut, 'class', 'btn-list logOut');
        menuBtnLogOut.appendChild(document.createTextNode('로그아웃'));

        menulistfirst.appendChild(menuBtnSetting);
        menulistSecond.appendChild(menuBtnLogOut);
        modalContainer.appendChild(menulistfirst);
        modalContainer.appendChild(menulistSecond);

        bottomValue = modalContainer.childElementCount * 46 + 46;
        modal.style.bottom = `-${bottomValue}px`;

        if (modal.classList.value === 'modal') {
            createModal();
        } else {
            removeModal();
        }
    }

    if (e.target.classList.value === 'btn-post-menu') {
        if (isMyProfile) {
            const menulistfirst = createEle('li', 'class', 'list-modal-menu');
            const menulistSecond = createEle('li', 'class', 'list-modal-menu');
            const menuBtnSetting = createEle('button', 'type', 'button');
            const menuBtnLogOut = createEle('button', 'type', 'button');

            addAttr(menuBtnSetting, 'class', 'btn-list delete');
            menuBtnSetting.appendChild(document.createTextNode('삭제'));
            addAttr(menuBtnLogOut, 'class', 'btn-list update');
            menuBtnLogOut.appendChild(document.createTextNode('수정'));

            const postId = e.target.closest('.post-list-item').dataset.postId;
            sessionStorage.setItem('targetPostId', postId);

            menulistfirst.appendChild(menuBtnSetting);
            menulistSecond.appendChild(menuBtnLogOut);
            modalContainer.appendChild(menulistfirst);
            modalContainer.appendChild(menulistSecond);

            bottomValue = modalContainer.childElementCount * 46 + 46;
            modal.style.bottom = `-${bottomValue}px`;
            if (modal.classList.value === 'modal') {
                createModal();
            } else {
                removeModal();
            }
        } else {
            const menulist = createEle('li', 'class', 'list-modal-menu');
            const menuBtn = createEle('button', 'type', 'button');
            addAttr(menuBtn, 'class', 'btn-list post-report');
            menuBtn.appendChild(document.createTextNode('신고하기'));
            menulist.appendChild(menuBtn);
            modalContainer.appendChild(menulist);

            bottomValue = modalContainer.childElementCount * 46 + 46;
            modal.style.bottom = `-${bottomValue}px`;

            if (modal.classList.value === 'modal') {
                createModal();
            } else {
                removeModal();
            }
        }
    }

    if (e.target.classList.value === 'btn-more-mini') {
        const menulistfirst = createEle('li', 'class', 'list-modal-menu');
        const menulistSecond = createEle('li', 'class', 'list-modal-menu');
        const menuBtnSetting = createEle('button', 'type', 'button');
        const menuBtnLogOut = createEle('button', 'type', 'button');

        addAttr(menuBtnSetting, 'class', 'btn-list delete');
        menuBtnSetting.appendChild(document.createTextNode('삭제'));
        addAttr(menuBtnLogOut, 'class', 'btn-list update');

        const targetPostId = getFromQueryString('postId');
        sessionStorage.setItem('targetPostId', targetPostId);

        menuBtnLogOut.appendChild(document.createTextNode('수정'));

        menulistfirst.appendChild(menuBtnSetting);
        menulistSecond.appendChild(menuBtnLogOut);
        modalContainer.appendChild(menulistfirst);
        modalContainer.appendChild(menulistSecond);

        bottomValue = modalContainer.childElementCount * 46 + 46;
        modal.style.bottom = `-${bottomValue}px`;

        if (modal.classList.value === 'modal') {
            createModal();
        } else {
            removeModal();
        }
    }

    if (e.target.classList.value === 'btn-more-mini user') {
        const menulist = createEle('li', 'class', 'list-modal-menu');
        const menuBtn = createEle('button', 'type', 'button');
        addAttr(menuBtn, 'class', 'btn-list post-report');
        menuBtn.appendChild(document.createTextNode('신고하기'));
        menulist.appendChild(menuBtn);
        modalContainer.appendChild(menulist);

        bottomValue = modalContainer.childElementCount * 46 + 46;
        modal.style.bottom = `-${bottomValue}px`;

        if (modal.classList.value === 'modal') {
            createModal();
        } else {
            removeModal();
        }
    }

    if (e.target.classList.value === 'btn-more-mini comment') {
        const commentId = e.target.closest('.comment-card').dataset.commentId;
        sessionStorage.setItem('targetCommentId', commentId);

        const menulist = createEle('li', 'class', 'list-modal-menu');
        const menuBtn = createEle('button', 'type', 'button');
        addAttr(menuBtn, 'class', 'btn-list comment-report');

        menuBtn.appendChild(document.createTextNode('신고하기'));
        menulist.appendChild(menuBtn);
        modalContainer.appendChild(menulist);

        bottomValue = modalContainer.childElementCount * 46 + 46;
        modal.style.bottom = `-${bottomValue}px`;

        if (modal.classList.value === 'modal') {
            createModal();
        } else {
            removeModal();
        }
    }

    if (e.target.closest('.product-item')) {
        const productId = e.target.closest('li').dataset.productId;
        sessionStorage.setItem('targetProductId', productId);

        if (isMyProfile) {
            const menulistfirst = createEle('li', 'class', 'list-modal-menu');
            const menuBtnSetting = createEle('button', 'type', 'button');
            addAttr(menuBtnSetting, 'class', 'btn-list productDelete');
            menuBtnSetting.appendChild(document.createTextNode('삭제'));
            menulistfirst.appendChild(menuBtnSetting);
            modalContainer.appendChild(menulistfirst);

            const menulistSecond = createEle('li', 'class', 'list-modal-menu');
            const menuBtnLogOut = createEle('button', 'type', 'button');
            addAttr(menuBtnLogOut, 'class', 'btn-list productUpdate');
            menuBtnLogOut.appendChild(document.createTextNode('수정'));
            menulistSecond.appendChild(menuBtnLogOut);
            modalContainer.appendChild(menulistSecond);
        }

        const menulistThrid = createEle('li', 'class', 'list-modal-menu');
        const menuBtnWeb = createEle('button', 'type', 'button');
        addAttr(menuBtnWeb, 'class', 'btn-list website');
        menuBtnWeb.appendChild(
            document.createTextNode('웹사이트에서 상품 보기')
        );
        menulistThrid.appendChild(menuBtnWeb);
        modalContainer.appendChild(menulistThrid);

        bottomValue = modalContainer.childElementCount * 46 + 46;
        modal.style.bottom = `-${bottomValue}px`;

        if (modal.classList.value === 'modal') {
            createModal();
        } else {
            removeModal();
        }
    }

    // 채팅방 나가기 또는 웹사이트로 이동
    if (e.target.classList.value === 'btn-list close-chat-room') {
        history.back();
    } else if (e.target.classList.value === 'btn-list website') {
        const product = document.querySelector('.product-item');
        const productLink = product.getAttribute('href');
        location.href = productLink;
    }
});

dimd.addEventListener('click', () => {
    removeModal();
});

function createEle(eleName, attr, attrName) {
    const createEle = document.createElement(eleName);
    createEle.setAttribute(attr, attrName);
    return createEle;
}

function addAttr(ele, attr, attName) {
    ele = ele.setAttribute(attr, attName);
    return ele;
}

function removeModal() {
    bottomValue = modalContainer.childElementCount * 46 + 46;
    modal.style.bottom = `-${bottomValue}px`;
    dimd.classList.remove('on');
    setTimeout(function () {
        modal.classList.remove('on');
        while (modalContainer.hasChildNodes()) {
            modalContainer.removeChild(modalContainer.firstChild);
        }
    }, 100);
}

function createModal() {
    modal.classList.add('on');
    dimd.classList.add('on');
    setTimeout(function () {
        modal.style.bottom = '0px';
    }, 10);
}
