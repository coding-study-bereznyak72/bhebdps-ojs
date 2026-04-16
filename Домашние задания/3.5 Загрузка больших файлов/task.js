document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const form = document.getElementById("form");
    const fileInput = document.getElementById("file");
    const progress = document.getElementById("progress");
    
    if (!fileInput.files.length) {
        return;
    }
    
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener("progress", function(e) {
        if (e.lengthComputable) {
            const percentComplete = e.loaded / e.total;
            progress.value = percentComplete;
        }
    });
    
    xhr.addEventListener("load", function() {
        if (xhr.status === 201 || xhr.status === 200) {
            progress.value = 1.0;
        }
    });
    
    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");
    xhr.send(formData);
});