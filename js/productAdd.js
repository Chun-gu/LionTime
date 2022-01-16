// 뒤로가기 
const btnBack = document.querySelector('.btn-back');
btnBack.addEventListener("click",()=>{
  history.back();
});

// 1. input file - image upload preview
const inpImage = document.querySelector("#img-product");

function readImage(input) {
    const previewImage = document.querySelector(".img-preview");
    if(input.files && input.files[0]) {
        const reader = new FileReader();
        // 이미지가 로드가 된 경우
        reader.onload = e => {
            previewImage.src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    } else {
        previewImage.src = "../images/img-preview.png";
    }
}

inpImage.addEventListener("input", e => {
    readImage(e.target);
    formCheck();
});

// 2. form 태그 내부값 체크, 버튼 활성화
const inpName = document.querySelector(".inp-name");
const inpPrice = document.querySelector(".inp-price");
const inpLink = document.querySelector(".inp-link");
const btnSave = document.querySelector(".btn-save");

function formCheck() {
    if(inpName.value && inpPrice.value && inpLink.value && inpImage.value) {
        btnSave.disabled = false;
    } else {
        btnSave.disabled = true;
    }
}

inpName.addEventListener("input", e => {
    formCheck();
});
inpPrice.addEventListener("input", e => {
    formCheck();
});
inpLink.addEventListener("input", e => {
    formCheck();
});

// 3. 가격 1000 단위 컴마 찍기
function comma(str) {
    return str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
function uncomma(str) {
    return str.replace(/[^\d]+/g, '');
}

inpPrice.addEventListener("input", e => {
    e.target.value = comma(uncomma(e.target.value));
});

// 5. api 서버로 데이터 전송 (상품 등록)
async function postData() {
    const imgName = await imgData();
    const itemName = inpName.value;
    const price = parseInt(uncomma(inpPrice.value));
    const link = inpLink.value;
    const token = localStorage.getItem('token');

    const res = await fetch("http://146.56.183.55:5050/product", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "product":{
                "itemName": itemName,
                "price": price,
                "link": link,
                "itemImage": imgName.filename,
            }
        })
    })
    const json = await res.json();
    if(json.product) {
        alert("업로드 성공");
        location.href="/pages/profile.html";
    } else {
        alert("업로드 실패");
    }
}

// 6. 이미지 서버 전달, 새 파일이름 받기
async function imgData() {
  let formData = new FormData();
  formData.append('image', inpImage.files[0]);
  const token = localStorage.getItem('token');
  const res = await fetch("http://146.56.183.55:5050/image/uploadfile", {
      method: "POST",
      headers: {
          'Authorization': `Bearer ${token}`
      },
      body: formData
  })
  const data = await res.json();
  return data;
}

btnSave.addEventListener('click', e => {
    postData();
});