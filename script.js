document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 隨機科學家名言 ---
    const quotes = [
        "The important thing is not to stop questioning. Curiosity has its own reason for existing. - Albert Einstein",
        "The good thing about science is that it's true whether or not you believe in it. - Neil deGrasse Tyson",
        "Science and everyday life cannot and should not be separated. - Rosalind Franklin",
        "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less. - Marie Curie",
        "We are all connected; To each other, biologically. To the earth, chemically. To the rest of the universe atomically. - Neil deGrasse Tyson",
        "The art and science of asking questions is the source of all knowledge. - Thomas Berger",
        "Equipped with his five senses, man explores the universe around him and calls the adventure Science. - Edwin Powell Hubble",
        "Shall I refuse my dinner because I do not fully understand the process of digestion? - Oliver Heaviside",
        "Science is a way of thinking much more than it is a body of knowledge. - Carl Sagan",
        "I have not failed. I've just found 10,000 ways that won't work. - Thomas A. Edison"
    ];
    const quoteElement = document.getElementById('scientist-quote');
    if (quoteElement) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteElement.textContent = `"${randomQuote}"`;
    }

    // --- 2. 圖片上傳預覽 ---
    function setupImagePreview(inputId, previewId) {
        const input = document.getElementById(inputId);
        const preview = document.getElementById(previewId);
        if (input && preview) {
            input.addEventListener('change', function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        preview.src = e.target.result;
                        preview.style.display = 'block';
                    }
                    reader.readAsDataURL(file);
                }
            });
        }
    }
    setupImagePreview('user-photo', 'user-photo-preview');
    setupImagePreview('style-photo', 'style-photo-preview');

    // --- 3. 教學卡片展開/收合 ---
    const cardHeaders = document.querySelectorAll('.card-header');
    cardHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            header.classList.toggle('active');

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.padding = "0 20px";
            } else {
                content.style.padding = "20px";
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- 4. 語音朗讀功能 ---
    const speakButtons = document.querySelectorAll('.speak-btn');
    speakButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // 防止觸發卡片收合事件
            const card = button.closest('.card');
            const textToSpeak = card.querySelector('.card-content p').textContent;

            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(textToSpeak);
                utterance.lang = 'zh-TW'; // 可選，設定語言
                window.speechSynthesis.cancel(); // 取消上一次的朗讀
                window.speechSynthesis.speak(utterance);
            } else {
                alert('您的瀏覽器不支援語音朗讀功能。');
            }
        });
    });

    // --- 5. 模擬 AI 生成流程 ---
    const generateBtn = document.getElementById('generate-btn');
    const resultContainer = document.getElementById('result-image-container');
    const userPhotoInput = document.getElementById('user-photo');
    const stylePhotoInput = document.getElementById('style-photo');

    if (generateBtn && resultContainer) {
        generateBtn.addEventListener('click', () => {
            if (!userPhotoInput.files[0] || !stylePhotoInput.files[0]) {
                alert('請先上傳您的自拍照和髮型來源照。');
                return;
            }

            // 顯示處理中訊息
            resultContainer.innerHTML = '<p>AI 處理中，請稍候...</p>';

            // 模擬 2 秒的 AI 處理時間
            setTimeout(() => {
                resultContainer.innerHTML = ''; // 清空訊息
                const resultImage = document.createElement('img');
                // 使用 placehold.co 作為範例結果圖
                resultImage.src = 'https://placehold.co/400x400/007bff/FFFFFF/png?text=變裝完成！';
                resultImage.alt = 'AI Hairstyle Result';
                resultContainer.appendChild(resultImage);
            }, 2000);
        });
    }
});
