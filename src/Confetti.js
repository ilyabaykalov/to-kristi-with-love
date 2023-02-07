class Confetti {
  static SETTINGS = {
    confettiFrequency: 5,
    confettiColors: ['#fce18a', '#ff726d', '#b48def', '#f4306d'],
    confettiSpeed: ['slow', 'medium', 'fast'],
    confettiCount: 0,
    confettiLimit: 1000,
    confettiDestroyTime: 30000,
    confettiRenderTime: 60,
    confettiSizeRange: [10, 20]
  };

  constructor(contentContainer = {}) {
    this.init(contentContainer);
  }

  init({target}) {
    if (target) {
      this.confettiContainer = target

      const containerDOM = document.createElement('div');

      this.confettiContainer.appendChild(containerDOM);

    } else {
      throw `Для создания экземпляра класса ${this.constructor.name} был использован невалидный DOM-элемент`;
    }
  }

  getContainerSize(){
    return Math.floor(Math.random() * Confetti.SETTINGS.confettiSizeRange[0]) + Confetti.SETTINGS.confettiSizeRange[1] + 'px';
  }

  getConfettiColor(){
    return Confetti.SETTINGS.confettiColors[Math.floor(Math.random() * Confetti.SETTINGS.confettiColors.length)];
  }

  getConfettiSpeed(){
    return Confetti.SETTINGS.confettiSpeed[Math.floor(Math.random() * Confetti.SETTINGS.confettiSpeed.length)];
  }

  getConfettiPosition(){
    return Math.floor(Math.random() * this.confettiContainer.offsetWidth) + 'px';
  }

  generateConfetti(){
    const confettiDOM = document.createElement('div'),
      confettiSize = this.getContainerSize(),
      confettiBackground = this.getConfettiColor(),
      confettiLeft = this.getConfettiPosition(),
      confettiSpeed = this.getConfettiSpeed();
    let _confettiDOM$classLis, _confettiDOM$classLis2;

    confettiDOM === null || confettiDOM === void 0 ? void 0 : (_confettiDOM$classLis = confettiDOM.classList) === null || _confettiDOM$classLis === void 0 ? void 0 : _confettiDOM$classLis.add('confetti');
    confettiDOM === null || confettiDOM === void 0 ? void 0 : (_confettiDOM$classLis2 = confettiDOM.classList) === null || _confettiDOM$classLis2 === void 0 ? void 0 : _confettiDOM$classLis2.add('confetti-animation-' + confettiSpeed);
    confettiDOM.style.left = confettiLeft;
    confettiDOM.style.width = confettiSize;
    confettiDOM.style.height = confettiSize;
    confettiDOM.style.backgroundColor = confettiBackground;

    confettiDOM.removeTimeout = setTimeout(function () {
      confettiDOM.parentNode.removeChild(confettiDOM);
    }, Confetti.SETTINGS.confettiDestroyTime);

    this.confettiContainer.appendChild(confettiDOM);
  }

  renderConfetti(){
    this.confettiInterval = setInterval(() => {
      Confetti.SETTINGS.confettiCount++;

      if (Confetti.SETTINGS.confettiCount > Confetti.SETTINGS.confettiLimit) {

        clearInterval(this.confettiInterval);

        return false;
      } else {
        this.generateConfetti();
      }
    }, Confetti.SETTINGS.confettiRenderTime);
  }

  start(){
    Confetti.SETTINGS.confettiCount = 0;

    this.renderConfetti();
  }

  stop(){
    Confetti.SETTINGS.confettiCount = Confetti.SETTINGS.confettiLimit;
  }
}
