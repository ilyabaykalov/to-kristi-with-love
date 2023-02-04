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
}

const init = () => {
  const gradient = document.querySelector('#gradient-background');
  const cardWrapper = document.querySelector('.card-wrapper');
  const audio = document.querySelector('audio');

  startGradientBackground();

  cardWrapper.addEventListener('click', () => {
    const isActive = cardWrapper.classList.contains('active');

    if (isActive) {
      cardWrapper.classList.remove('active');
      audio.pause();
      // confetti.stop();
      gradient.style.opacity = '0';
    } else {
      cardWrapper.classList.add('active');
      audio.play();
      // confetti.start();
      gradient.style.opacity = '1';
    }
  });

  const motionMatchMedia = window.matchMedia("(prefers-reduced-motion)");
  const THRESHOLD = 30;

  const handleHover = ({ clientX, clientY, currentTarget }) => {
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;

    const horizontal = (clientX - offsetLeft) / clientWidth;
    const vertical = (clientY - offsetTop) / clientHeight;
    const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
    const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

    cardWrapper.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
  }

  const resetStyles = ({currentTarget}) => {
    cardWrapper.style.transform = `perspective(${currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
  }

  if (!motionMatchMedia.matches) {
    cardWrapper.addEventListener("mousemove", handleHover);
    cardWrapper.addEventListener("mouseleave", resetStyles);
  }
}
