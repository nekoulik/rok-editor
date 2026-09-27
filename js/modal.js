/**
 * Модальное окно "Возможности"
 */

// Открыть модальное окно
function openModal() {
    const modal = document.getElementById('featuresModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
    }
}

// Закрыть модальное окно
function closeModal() {
    const modal = document.getElementById('featuresModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Возвращаем скролл
    }
}

// Закрытие по клику на оверлей
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('featuresModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            // Закрываем только если клик был по оверлею, а не по контенту
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});