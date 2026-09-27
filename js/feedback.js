/**
 * Модальное окно "Обратная связь"
 */

function openFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Обработка формы обратной связи
function submitFeedback(event) {
    event.preventDefault();
    
    const name = document.getElementById('feedbackName').value;
    const email = document.getElementById('feedbackEmail').value;
    const message = document.getElementById('feedbackMessage').value;
    
    // Здесь можно добавить отправку на сервер
    // Пока просто показываем уведомление
    alert(`Спасибо, ${name}! Ваше сообщение отправлено. Мы ответим на ${email} в ближайшее время.`);
    
    // Очищаем форму
    document.getElementById('feedbackName').value = '';
    document.getElementById('feedbackEmail').value = '';
    document.getElementById('feedbackMessage').value = '';
    
    closeFeedbackModal();
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeFeedbackModal();
            }
        });
    }
});