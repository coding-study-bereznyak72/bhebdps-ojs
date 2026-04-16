function initRotator(rotator) {
  const cases = Array.from(rotator.querySelectorAll('.rotator__case'));
  if (cases.length === 0) return;
  
  let currentIndex = cases.findIndex(c => c.classList.contains('rotator__case_active'));
  if (currentIndex === -1) {
    currentIndex = 0;
    cases[currentIndex].classList.add('rotator__case_active');
  }
  
  let currentDelay = parseInt(cases[currentIndex].dataset.speed) || 1000;
  let currentColor = cases[currentIndex].dataset.color;
  
  if (currentColor) {
    rotator.style.color = currentColor;
  }
  
  let timer;
  
  function rotate() {
    cases[currentIndex].classList.remove('rotator__case_active');
    
    currentIndex = (currentIndex + 1) % cases.length;
    
    cases[currentIndex].classList.add('rotator__case_active');
    
    currentDelay = parseInt(cases[currentIndex].dataset.speed) || 1000;
    currentColor = cases[currentIndex].dataset.color;
    
    if (currentColor) {
      rotator.style.color = currentColor;
    } else {
      rotator.style.color = '';
    }
    
    clearTimeout(timer);
    timer = setTimeout(rotate, currentDelay);
  }
  
  clearTimeout(timer);
  timer = setTimeout(rotate, currentDelay);
}

document.querySelectorAll('.rotator').forEach(initRotator);