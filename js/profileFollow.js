import { API_URL } from './key.js';
import { getFromQueryString, trimImageURL } from './lib.js';

const MY_ID = sessionStorage.getItem('my-id');
const MY_ACCOUNTNAME = sessionStorage.getItem('my-accountname');
const TOKEN = sessionStorage.getItem('my-token');
const TARGET_ACCOUNTNAME = getFromQueryString('userId');

const isFollowersPage = localStorage.getItem('is-followers-page') === 'true';
localStorage.removeItem('is-followers-page');

const pageName = document.querySelector('.page-name');
if (isFollowersPage) {
    document.title = '팔로워';
    pageName.textContent = 'Followers';
} else {
    document.title = '팔로잉';
    pageName.textContent = 'Followings';
}

const usersList = document.querySelector('.users-list');
const limit = 15;
let skip = 0;

async function fetchData(endpoint) {
    try {
        const res = await fetch(
            API_URL +
                `/profile/${TARGET_ACCOUNTNAME}/${endpoint}?limit=${limit}&skip=${skip}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    'Content-type': 'application/json',
                },
            }
        );
        skip += limit;
        const resJson = await res.json();

        return resJson;
    } catch (err) {
        alert('정보를 가져오는 데에 실패했습니다.');
    }
}

async function getFollowsData() {
    const followsData = isFollowersPage
        ? await fetchData('follower')
        : await fetchData('following');
    return followsData;
}

function makeFollowsItem(follows) {
    const { accountname, image, username, intro, follower } = follows;

    const followsItem = document.createElement('li');
    followsItem.classList.add('users-list-item');
    followsItem.dataset.accountname = accountname;

    const img = document.createElement('img');
    img.classList.add('user-img');
    img.setAttribute('src', trimImageURL(image));
    img.setAttribute(
        'onError',
        "this.src='https://mandarin.api.weniv.co.kr/Ellipse.png'"
    );

    const div = document.createElement('div');
    div.classList.add('user-profile');

    const span = document.createElement('span');
    span.classList.add('user-name');
    span.textContent = username;
    div.append(span);

    if (!!intro) {
        const p = document.createElement('p');
        p.classList.add('user-intro');
        p.textContent = intro;
        div.append(p);
    }

    followsItem.append(img);
    followsItem.append(div);

    if (accountname !== MY_ACCOUNTNAME) {
        const button = document.createElement('button');
        button.classList.add('btn-follow');
        if (follower.includes(MY_ID)) {
            button.classList.add('cancel');
        }
        followsItem.append(button);
    }

    return followsItem;
}

async function printFollowsList(followsData) {
    for (const follows of followsData) {
        const followsItem = makeFollowsItem(follows);
        usersList.append(followsItem);
    }
}

function followsIoCb(entries, followsIo) {
    entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
            followsIo.unobserve(entry.target);
            const followsData = await getFollowsData();
            if (followsData.length === 0) {
                followsIo.disconnect();
            } else {
                printFollowsList(followsData);
                observeLastItem(
                    followsIo,
                    document.querySelectorAll('.users-list-item')
                );
            }
        }
    });
}

const followsIo = new IntersectionObserver(followsIoCb);

function observeLastItem(followsIo, items) {
    const lastItem = items[items.length - 1];
    followsIo.observe(lastItem);
}

(async function initFollows() {
    const followsData = await getFollowsData();
    if (followsData.length === 0) {
        usersList.textContent = '아무도 없네요...';
        return;
    }
    printFollowsList(followsData);
    observeLastItem(followsIo, document.querySelectorAll('.users-list-item'));
})();

async function toggleFollow(accountname, endpoint, method) {
    let isSuccess = false;
    try {
        const res = await fetch(
            `${API_URL}/profile/${accountname}/${endpoint}`,
            {
                method: method,
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    'Content-type': 'application/json',
                },
            }
        );
        const { profile } = await res.json();

        if (profile) isSuccess = true;
        else alert('오류가 발생했습니다.');
    } catch (error) {
        alert('오류가 발생했습니다.');
    }
    return isSuccess;
}

// 기능 분기
usersList.addEventListener('click', async ({ target }) => {
    const target_accountname = target.closest('li').dataset.accountname;
    if (target.classList.contains('cancel')) {
        const isSuccess = await toggleFollow(
            target_accountname,
            'unfollow',
            'DELETE'
        );
        if (isSuccess) target.classList.toggle('cancel');
        return;
    }
    if (target.classList.contains('btn-follow')) {
        const isSuccess = await toggleFollow(
            target_accountname,
            'follow',
            'POST'
        );
        if (isSuccess) target.classList.toggle('cancel');
        return;
    }
    if (
        target.classList.contains('user-img') ||
        target.classList.contains('user-name') ||
        target.classList.contains('user-intro')
    ) {
        location.href = `../pages/profile.html?userId=${target_accountname}`;
        return;
    }
});
