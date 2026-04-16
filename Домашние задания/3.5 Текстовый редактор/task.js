const editor = document.getElementById('editor');

editor.value = localStorage.getItem('editorText') || '';

editor.addEventListener('input', () => {
    localStorage.setItem('editorText', editor.value);
});

const button = document.createElement('button');
button.textContent = 'Очистить содержимое';
button.style.marginBottom = '20px';
document.querySelector('.card').prepend(button);

button.addEventListener('click', () => {
    editor.value = '';
    localStorage.removeItem('editorText');
    editor.focus();
});