// 구글 폼 설정
// 구글 폼을 생성한 후, 아래 URL을 업데이트하세요
// 예시: https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse
const GOOGLE_FORM_ACTION_URL = 'YOUR_GOOGLE_FORM_URL_HERE';

// 구글 폼 필드 entry ID
// 구글 폼에서 필드를 확인한 후 아래 값들을 업데이트하세요
// 확인 방법: 구글 폼 미리보기 -> F12 개발자 도구 -> 각 input의 name 속성 확인
const FORM_FIELDS = {
    name: 'entry.YOUR_NAME_ENTRY_ID',
    email: 'entry.YOUR_EMAIL_ENTRY_ID',
    phone: 'entry.YOUR_PHONE_ENTRY_ID',
    message: 'entry.YOUR_MESSAGE_ENTRY_ID'
};

// Smooth scroll for CTA button
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');

    ctaButton.addEventListener('click', function(e) {
        e.preventDefault();
        const contactSection = document.querySelector('#contact');
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // Form submission
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', handleFormSubmit);

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', formatPhoneNumber);
});

// 전화번호 자동 포맷팅 (010-1234-5678)
function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length <= 3) {
        e.target.value = value;
    } else if (value.length <= 7) {
        e.target.value = value.slice(0, 3) + '-' + value.slice(3);
    } else {
        e.target.value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
    }
}

// 폼 제출 처리
async function handleFormSubmit(e) {
    e.preventDefault();

    const submitButton = e.target.querySelector('.submit-button');
    const successMessage = document.getElementById('successMessage');

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    // Validate form
    if (!validateForm(formData)) {
        return;
    }

    // Show loading state
    submitButton.classList.add('loading');
    submitButton.textContent = '전송 중...';

    try {
        // 구글 폼 URL이 설정되어 있는지 확인
        if (GOOGLE_FORM_ACTION_URL === 'YOUR_GOOGLE_FORM_URL_HERE') {
            // 구글 폼이 설정되지 않은 경우, 콘솔에 데이터 출력 (테스트용)
            console.log('구글 폼 URL이 설정되지 않았습니다. 제출된 데이터:', formData);

            // 시뮬레이션을 위한 딜레이
            await new Promise(resolve => setTimeout(resolve, 1000));

            showSuccessMessage(successMessage, submitButton);
            e.target.reset();
        } else {
            // 구글 폼으로 데이터 전송
            await submitToGoogleForm(formData);
            showSuccessMessage(successMessage, submitButton);
            e.target.reset();
        }
    } catch (error) {
        console.error('제출 오류:', error);
        alert('죄송합니다. 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
        submitButton.classList.remove('loading');
        submitButton.textContent = '상담 신청하기';
    }
}

// 구글 폼으로 데이터 전송
async function submitToGoogleForm(formData) {
    const formDataObj = new FormData();

    // 구글 폼 필드에 데이터 매핑
    formDataObj.append(FORM_FIELDS.name, formData.name);
    formDataObj.append(FORM_FIELDS.email, formData.email);
    formDataObj.append(FORM_FIELDS.phone, formData.phone);
    if (formData.message) {
        formDataObj.append(FORM_FIELDS.message, formData.message);
    }

    // CORS 이슈 회피를 위해 no-cors 모드 사용
    await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formDataObj
    });
}

// 폼 유효성 검사
function validateForm(formData) {
    // 이름 검사
    if (formData.name.trim().length < 2) {
        alert('이름을 올바르게 입력해주세요.');
        return false;
    }

    // 이메일 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('올바른 이메일 주소를 입력해주세요.');
        return false;
    }

    // 전화번호 검사 (숫자만 10-11자리)
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
        alert('올바른 전화번호를 입력해주세요.');
        return false;
    }

    return true;
}

// 성공 메시지 표시
function showSuccessMessage(successMessage, submitButton) {
    submitButton.classList.remove('loading');
    submitButton.textContent = '상담 신청하기';

    successMessage.style.display = 'block';
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // 3초 후 메시지 숨기기
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

// 페이지 로드 시 애니메이션
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});
