/**
 * Модальное окно "Поддержать проект"
 */

function openSupportModal() {
    const modal = document.getElementById('supportModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSupportModal() {
    const modal = document.getElementById('supportModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Копирование номера кошелька
function copyWallet(walletNumber) {
    navigator.clipboard.writeText(walletNumber).then(() => {
        alert('Номер кошелька скопирован в буфер обмена!');
    }).catch(() => {
        // Фоллбэк для старых браузеров
        const textarea = document.createElement('textarea');
        textarea.value = walletNumber;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Номер кошелька скопирован в буфер обмена!');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('supportModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeSupportModal();
            }
        });
    }
});