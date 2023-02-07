const startGradientBackground = () => {
  new Granim({
    element: '#gradient-background',
    direction: 'radial',
    isPausedWhenNotInView: true,
    states: {
      'default-state': {
        gradients: [
          ['#ff8faf', '#ffe5ed'],
          ['#f38fff', '#ffe5ed'],
          ['#ff8f8f', '#ffe5ed']]
      }
    }
  });
};

const init = () => {
  const mainContainer = document.querySelector('main');
  const cardWrapper = document.querySelector('.card-wrapper');

  const gradient = document.querySelector('#gradient-background');

  const confetti = new Confetti({ target: mainContainer });

  const audio = document.querySelector('#player');

  startGradientBackground();

  const motionMatchMedia = window.matchMedia('(prefers-reduced-motion)');

  const onClickHandler = () => {
    const isActive = cardWrapper.classList.contains('active');

    if (isActive) {
      cardWrapper.classList.remove('active');

      audio.pause();

      confetti.stop();

      gradient.style.opacity = '0';
    } else {
      cardWrapper.classList.add('active');

      audio.src = getRandomTrack();
      audio.play();

      confetti.start();

      gradient.style.opacity = '1';
    }
  };

  const getRandomTrack = () => {
    const tracks = [
      'audio/sugar.mp3',
      'audio/we-are-together.mp3',
      'audio/love-you-like-a-love-song.mp3',
      'audio/i-just-called.mp3',
      'audio/this-love.mp3'
    ];

    const index = Math.floor(Math.random() * tracks.length);

    if (audio.src.endsWith(tracks[index]))
      return index !== tracks.length
        ? `../${tracks[index + 1]}`
        : `../${tracks[index - 1]}`;
    else return `../${tracks[index]}`;
  };

  const onHoverHandler = ({ clientX, clientY }) => {
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = cardWrapper;

    const shift = 50;

    const horizontal = (clientX - offsetLeft) / clientWidth;
    const vertical = (clientY - offsetTop) / clientHeight;
    const rotateX = (vertical * shift - shift / 2).toFixed(2);
    const rotateY = (shift / 2 - horizontal * shift).toFixed(2);

    cardWrapper.style.transition = `transform 0s`;
    cardWrapper.style.transform = `perspective(${ clientWidth }px) rotateX(${ rotateX }deg) rotateY(${ rotateY }deg) scale3d(1, 1, 1)`;
  };

  const onResetPerspectiveHandler = ({ currentTarget }) => {
    cardWrapper.style.transition = `transform 1s`;
    cardWrapper.style.transform = `perspective(${ currentTarget.clientWidth }px) rotateX(0deg) rotateY(0deg)`;
  };

  cardWrapper.addEventListener('click', onClickHandler);

  if (!motionMatchMedia.matches) {
    cardWrapper.addEventListener('mousemove', onHoverHandler);
    cardWrapper.removeEventListener('mouseleave', onHoverHandler);

    cardWrapper.addEventListener('mouseleave', onResetPerspectiveHandler);
    cardWrapper.removeEventListener('mousemove', onResetPerspectiveHandler);
  }
};
