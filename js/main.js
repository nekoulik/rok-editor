/**
 * Основная логика редактора RoK
 * Версия с автоматическим пробелом после символов
 */

// ===== СИНХРОНИЗАЦИЯ ЦВЕТОВ =====
function syncColor(colorId, textId) {
    const color = document.getElementById(colorId);
    const text = document.getElementById(textId);
    if (!color || !text) return;
    color.addEventListener('input', () => { text.value = color.value; });
    text.addEventListener('input', () => { 
        if (/^#[0-9a-fA-F]{6}$/.test(text.value)) color.value = text.value; 
    });
}

// ===== ОТСЛЕЖИВАНИЕ АКТИВНОГО ПОЛЯ =====
let activeField = null;
document.addEventListener('focusin', (e) => {
    if (e.target.tagName === 'INPUT' && e.target.type !== 'color' && e.target.type !== 'number') {
        activeField = e.target;
    }
});

// ===== ПАНЕЛЬ СИМВОЛОВ =====
function buildSymbolPanel() {
    const panel = document.getElementById('symbolPanel');
    if (!panel) return;
    let html = '';
    for (const [category, symbols] of Object.entries(SYMBOL_SETS)) {
        html += `<div class="symbol-category">${category}</div><div class="symbol-grid">`;
        symbols.forEach(s => {
            const escaped = s.replace(/'/g, "\\'");
            html += `<button class="symbol-btn" onclick="insertSymbol('${escaped}')" title="${s}">${s}</button>`;
        });
        html += `</div>`;
    }
    panel.innerHTML = html;
}

/**
 * Вставка символа в активное поле
 * ВАЖНО: после символа автоматически добавляется пробел,
 * чтобы RoK корректно парсил теги
 */
function insertSymbol(sym) {
    if (activeField) {
        const pos = activeField.selectionStart;
        const val = activeField.value;
        // Добавляем символ + пробел (защита от ошибки в RoK)
        const insert = sym + ' ';
        activeField.value = val.slice(0, pos) + insert + val.slice(pos);
        activeField.focus();
        activeField.selectionStart = activeField.selectionEnd = pos + insert.length;
    } else {
        alert('Сначала кликни на поле ввода, куда хочешь вставить символ!');
    }
}

// ===== ЧАСТИ НАЗВАНИЯ =====
function addNamePart(text='', color='#ff1900') {
    const container = document.getElementById('namePartsContainer');
    if (!container) return;
    const row = document.createElement('div');
    row.className = 'name-part';
    row.innerHTML = `
        <input type="text" value="${text}" placeholder="Текст части">
        <input type="color" value="${color}">
        <input type="text" value="${color}" class="part-color-text" style="font-size:11px">
        <button class="btn-remove" onclick="this.parentElement.remove()">×</button>
    `;
    const colorInput = row.querySelector('input[type="color"]');
    const textInput = row.querySelector('.part-color-text');
    colorInput.addEventListener('input', () => { textInput.value = colorInput.value; });
    textInput.addEventListener('input', () => { 
        if (/^#[0-9a-fA-F]{6}$/.test(textInput.value)) colorInput.value = textInput.value; 
    });
    container.appendChild(row);
}

// ===== РОЛИ =====
function addRole(icon='', name='', value='') {
    const container = document.getElementById('rolesContainer');
    if (!container) return;
    const row = document.createElement('div');
    row.className = 'role-row';
    row.innerHTML = `
        <input type="text" value="${icon || '✼'}" placeholder="" title="Иконка">
        <input type="text" value="${name}" placeholder="Название">
        <input type="text" value="${value}" placeholder="Значение">
        <button class="btn-remove" onclick="this.parentElement.remove()">×</button>
    `;
    container.appendChild(row);
}

// ===== ГЕНЕРАЦИЯ КОДА =====
function generate() {
    const titleSize = document.getElementById('titleSize').value;
    const titleIconLeft = document.getElementById('titleIconLeft').value;
    const titleIconRight = document.getElementById('titleIconRight').value;
    
    const roleColor = document.getElementById('roleColorText').value;
    const valueColor = document.getElementById('valueColorText').value;
    const roleSize = document.getElementById('roleSize').value;
    
    const footerText = document.getElementById('footerText').value;
    const footerColor = document.getElementById('footerColorText').value;
    const footerSize = document.getElementById('footerSize').value;

    // Собираем части названия
    const nameParts = [];
    document.querySelectorAll('.name-part').forEach(row => {
        const inputs = row.querySelectorAll('input');
        const text = inputs[0].value;
        const color = inputs[1].value;
        if (text) nameParts.push({ text, color });
    });

    // Собираем роли
    const roles = [];
    document.querySelectorAll('.role-row').forEach(row => {
        const inputs = row.querySelectorAll('input');
        roles.push({ icon: inputs[0].value, name: inputs[1].value, value: inputs[2].value });
    });

    // === КОД ===
    let code = '';
    
    // Заголовок с пробелами вокруг иконок
    if (nameParts.length > 0) {
        let titleInner = '';
        nameParts.forEach(p => {
            titleInner += `<color=${p.color}>${p.text}</color>`;
        });
        // Добавляем пробелы после/перед иконками, если они есть
        const leftIcon = titleIconLeft ? titleIconLeft + ' ' : '';
        const rightIcon = titleIconRight ? ' ' + titleIconRight : '';
        code += `<size=${titleSize}><b>${leftIcon}${titleInner}${rightIcon}</b></size>\n\n`;
    }
    
    // Роли с пробелом после иконки
    roles.forEach(r => {
        if (r.name || r.value) {
            // Добавляем пробел после иконки, если она есть
            const iconWithSpace = r.icon ? r.icon + ' ' : '';
            code += `<size=${roleSize}><b>${iconWithSpace}<color=${roleColor}>${r.name}</color>:</b><color=${valueColor}> <b><i>${r.value}</i></b></color></size>\n`;
        }
    });
    
    // Футер
    if (footerText) {
        code += `\n<size=${footerSize}><color=${footerColor}><b>${footerText}</b></color></size>`;
    }

    document.getElementById('code-output').innerText = code;

    // === ПРЕВЬЮ ===
    let preview = code;
    preview = preview.replace(/<size=(\d+)>/g, '<span style="font-size:$1px; line-height:1.4">');
    preview = preview.replace(/<\/size>/g, '</span>');
    preview = preview.replace(/<color=([^>]+)>/g, '<span style="color:$1">');
    preview = preview.replace(/<\/color>/g, '</span>');
    preview = preview.replace(/\n/g, '<br>');
    
    document.getElementById('preview').innerHTML = preview;
}

// ===== КОПИРОВАНИЕ =====
function copyCode() {
    const code = document.getElementById('code-output').innerText;
    navigator.clipboard.writeText(code).then(() => {
        const msg = document.getElementById('successMsg');
        msg.style.display = 'block';
        setTimeout(() => msg.style.display = 'none', 2500);
    }).catch(err => {
        // Фоллбэк для старых браузеров
        const textarea = document.createElement('textarea');
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        const msg = document.getElementById('successMsg');
        msg.style.display = 'block';
        setTimeout(() => msg.style.display = 'none', 2500);
    });
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
function init() {
    // Синхронизация цветов
    syncColor('roleColor', 'roleColorText');
    syncColor('valueColor', 'valueColorText');
    syncColor('footerColor', 'footerColorText');

    // Добавляем части названия по умолчанию
    addNamePart('Black', '#00aaff');
    addNamePart(' PieCe', '#ff1900');

    // Добавляем роли по умолчанию
    const defaultRoles = [
        { icon: '', name: 'Семья', value: 'текст' },
        { icon: '✼', name: 'Советник', value: 'текст' },
        { icon: '✼', name: 'Военачальник', value: 'текст' },
        { icon: '✼', name: 'Посланник', value: 'текст' },
        { icon: '✼', name: 'Святой', value: 'текст' },
        { icon: '✼', name: 'Приём', value: '100кк' },
    ];
    defaultRoles.forEach(r => addRole(r.icon, r.name, r.value));

    // Строим панель символов
    buildSymbolPanel();

    // Генерируем код при загрузке
    generate();
}

// Запуск при загрузке страницы
window.addEventListener('DOMContentLoaded', init);