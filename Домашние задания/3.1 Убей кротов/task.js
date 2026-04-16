(() => {
  let playing = true,
    activeHole = 1,
    dead = 0,
    lost = 0;

  const deadCount = document.getElementById('dead');
  const lostCount = document.getElementById('lost');

  const stop = () => playing = true,
    getHole = index => document.getElementById(`hole${index}`),
    deactivateHole = index =>
      getHole(index).className = 'hole',
    activateHole = index =>
      getHole(index).className = 'hole hole_has-mole',
    next = () => setTimeout(() => {
      if (!playing) {
        return;
      }
      deactivateHole(activeHole);
      activeHole = Math.floor(1 + Math.random() * 9);
      activateHole(activeHole);
      next();
    }, 800);

  const resetGame = () => {
    dead = 0;
    lost = 0;
    deadCount.textContent = dead;
    lostCount.textContent = lost;
    playing = true;
  };

  const checkGameStatus = () => {
    if (dead >= 10) {
      alert('Победа! Вы убили 10 кротов!');
      resetGame();
    } else if (lost >= 5) {
      alert('Поражение! 5 промахов!');
      resetGame();
    }
  };

  for (let i = 1; i <= 9; i++) {
    const hole = getHole(i);
    hole.onclick = () => {
      if (!playing) return;
      
      if (hole.classList.contains('hole_has-mole')) {
        dead++;
        deadCount.textContent = dead;
        deactivateHole(i);
      } else {
        lost++;
        lostCount.textContent = lost;
      }
      
      checkGameStatus();
    };
  }

  next();
})();