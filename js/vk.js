/**
 * Модальное окно "ВКонтакте"
 */

function openVkModal() {
    const modal = document.getElementById('vkModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeVkModal() {
    const modal = document.getElementById('vkModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('vkModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeVkModal();
            }
        });
    }
});