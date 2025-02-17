import { API_URL, IMAGE_URL } from './key.js';
import { debounce } from './lib.js';

const TOKEN = sessionStorage.getItem('my-token');

const backBtn = document.querySelector('.backBtn');
backBtn.addEventListener('click', () => {
    history.back();
});

const searchBar = document.querySelector('#search-bar');
searchBar.addEventListener('input', (e) => debouncedSearchUser(e.target.value));
let searchKeyword = '';
const resultList = document.querySelector('#search-result-list');

const debouncedSearchUser = debounce((value) => {
    searchKeyword = value.replaceAll(/\s+/g, '');
    if (!searchKeyword) resultList.innerHTML = '';
    if (searchKeyword) searchUser(searchKeyword);
}, 300);

async function searchUser(keyword) {
    try {
        const res = await fetch(
            `${API_URL}/user/searchuser/?keyword=${keyword}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    'Content-type': 'application/json',
                },
            }
        );
        const data = await res.json();
        printSearchResult(data);
    } catch (error) {
        alert('검색에 실패했습니다.');
    }
}

function printSearchResult(result) {
    resultList.innerHTML = '';

    if (result.length === 0) {
        const noResult = makeNoResult();
        resultList.append(noResult);
        return;
    }

    for (const userInfo of result) {
        const userProfileCard = makeUserProfileCard(userInfo);
        resultList.append(userProfileCard);
    }
}

function makeNoResult() {
    const li = document.createElement('li');
    li.classList.add('no-result');

    const span = document.createElement('span');
    span.textContent = '검색 결과가 없습니다.';

    li.append(span);

    return li;
}

function makeUserProfileCard({ username, accountname, image }) {
    const li = document.createElement('li');

    const a = document.createElement('a');
    a.classList.add('user-profile-card');
    a.href = `../pages/profile.html?userId=${accountname}`;

    const img = document.createElement('img');
    img.classList.add('profile-image');
    const isEllipse = /Ellipse\.png/.test(image);
    img.src = isEllipse ? image : IMAGE_URL + image;
    img.setAttribute('alt', username);
    img.setAttribute(
        'onerror',
        "this.src='../images/default-profile-img-small.png'"
    );

    const div = document.createElement('div');
    div.classList.add('profile-name');

    const keywordPattern = new RegExp(searchKeyword, 'g');
    const highlighted = accountname.replaceAll(
        keywordPattern,
        `<span class="match-keyword">${searchKeyword}</span>`
    );

    const userName = document.createElement('span');
    userName.classList.add('user-name', 'single-ellipsis');
    userName.innerHTML = highlighted;

    const accountName = document.createElement('span');
    accountName.classList.add('account-name', 'single-ellipsis');
    accountName.textContent = accountname;

    div.append(userName);
    div.append(accountName);
    a.append(img);
    a.append(div);
    li.append(a);

    return li;
}
