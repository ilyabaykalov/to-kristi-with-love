class Confetti {
  static SETTINGS = {
    confettiFrequency: 5,
    confettiColors: ['#fce18a', '#ff726d', '#b48def', '#f4306d'],
    confettiSpeed: ['slow', 'medium', 'fast'],
    confettiCount: 0,
    confettiLimit: 10000,
    confettiDestroyTime: 1400,
    confettiRenderTime: 60,
    confettiSizeRange: [10, 20]
  };

  constructor({ target } = {}) {
    if (target) {
      this._confettiContainer = target;
    } else {
      throw `Для создания экземпляра класса ${ this.constructor.name } был использован невалидный DOM-элемент`;
    }
  }

  start() {
    Confetti.SETTINGS.confettiCount = 0;

    const confettiInterval = setInterval(() => {
      Confetti.SETTINGS.confettiCount++;

      if (Confetti.SETTINGS.confettiCount > Confetti.SETTINGS.confettiLimit) {

        clearInterval(confettiInterval);

        return false;
      } else {
        this.#generateConfetti();
      }
    }, Confetti.SETTINGS.confettiRenderTime);
  }

  stop() {
    Confetti.SETTINGS.confettiCount = Confetti.SETTINGS.confettiLimit;
  }

  #generateConfetti() {
    const confettiDOM = document.createElement('div');

    confettiDOM.style.width = confettiDOM.style.height = this.#getSize();
    confettiDOM.style.backgroundColor = this.#getBackgroundColor();
    confettiDOM.style.left = this.#getPosition();

    confettiDOM.classList.add('confetti');
    confettiDOM.classList.add(`confetti-animation-${ this.#getSpeed() }`);

    confettiDOM.removeTimeout = setTimeout(() => {
      confettiDOM.parentNode.removeChild(confettiDOM);
    }, Confetti.SETTINGS.confettiDestroyTime);

    this._confettiContainer.appendChild(confettiDOM);
  }

  #getSize() {
    return Math.floor(Math.random() * Confetti.SETTINGS.confettiSizeRange[0]) + Confetti.SETTINGS.confettiSizeRange[1] + 'px';
  }

  #getBackgroundColor() {
    return Confetti.SETTINGS.confettiColors[Math.floor(Math.random() * Confetti.SETTINGS.confettiColors.length)];
  }

  #getPosition() {
    return Math.floor(Math.random() * (this._confettiContainer.offsetWidth * 0.9)) + 'px';
  }

  #getSpeed() {
    return Confetti.SETTINGS.confettiSpeed[Math.floor(Math.random() * Confetti.SETTINGS.confettiSpeed.length)];
  }
}
