import { API_URL } from './key.js';
import { getFromQueryString, trimImageURL } from './lib.js';

const TOKEN = sessionStorage.getItem('my-token');
const partnerId = getFromQueryString('userId');

const messageSection = document.querySelector('.message-section');
const imageInput = document.querySelector('#image-attach-input');
const inputContainer = document.querySelector('.input-container');
const messageTextarea = document.querySelector('#message-textarea');
const messageForm = document.querySelector('#message-form');
const sendButton = document.querySelector('#send-button');

document.addEventListener('DOMContentLoaded', scrollToBottom);

function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

const backKeyBtn = document.querySelector('.btn-back-key');
backKeyBtn.addEventListener('click', () => {
    history.back();
});

if (partnerId) printPartnerInfo(partnerId);

async function printPartnerInfo(partnerId) {
    const { username, image } = await getPartnerInfo(partnerId);

    const partnerName = document.querySelector('.chat-partner-name');
    partnerName.textContent = username;
    const partnerImage = document.querySelector('.partner-image');

    partnerImage.src = trimImageURL(image);
}

async function getPartnerInfo(userId) {
    try {
        const res = await fetch(`${API_URL}/profile/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                'Content-type': 'application/json',
            },
        });
        const { profile } = await res.json();

        if (profile) return profile;
        else alert('상대의 정보를 가져오는 데에 실패했습니다.');
    } catch (error) {
        alert('상대의 정보를 가져오는 데에 실패했습니다.');
    }
}

messageTextarea.addEventListener('input', () => {
    validateInput();
    resizeTextarea();
});

function validateInput() {
    const message = messageTextarea.value;
    const canSend = /\S+/.test(message);

    if (canSend) sendButton.disabled = false;
    else sendButton.disabled = true;
}

function resizeTextarea() {
    messageTextarea.style.height = 'auto';
    const scrollHeight = messageTextarea.scrollHeight;
    messageTextarea.style.height = `${scrollHeight}px`;

    if (scrollHeight < 90) messageTextarea.style.overflowY = 'hidden';
    if (scrollHeight >= 90) messageTextarea.style.overflowY = 'scroll';
}
