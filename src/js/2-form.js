const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');


function saveToLS(key, value) {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
    const data = localStorage.getItem(key);
    try {
        const result = JSON.parse(data);
        return result;
    } catch {
        return data;
    }
}

form.addEventListener('input', (e) => {
    const userEmail = form.elements.email.value.trim();
    const userMessage = form.elements.message.value.trim();

    const data = {
        email: userEmail,
        message: userMessage,
    };
    saveToLS(STORAGE_KEY, data);
});

function restoreData() {
    const data = loadFromLS(STORAGE_KEY);
    if (data) {
    form.elements.email.value = data.email || '';
    form.elements.message.value = data.message || '';  
    }
}
restoreData();

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const userEmail = form.elements.email.value.trim();
    const userMessage = form.elements.message.value.trim();
    
    if (userEmail && userMessage) {
    const data = loadFromLS(STORAGE_KEY) || {};
    localStorage.removeItem(STORAGE_KEY)
    form.reset();  
    
    console.log(data);  
    }  
})