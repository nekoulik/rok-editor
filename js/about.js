/**
 * Модальное окно "О проекте"
 */

// Открыть модальное окно
function openAboutModal() {
    const modal = document.getElementById('aboutModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Закрыть модальное окно
function closeAboutModal() {
    const modal = document.getElementById('aboutModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Закрытие по клику на оверлей и Escape
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('aboutModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAboutModal();
            }
        });
    }
});