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

const changeImportantWords = () => {
  const importantWords = [
    'Хочу разделить с тобой все самые лучшие моменты жизни!',
    'Так и быть, можешь не возвращать мое сердце. Дарю!',
    'Мне так повезло, ведь 50 кг чистого золота на дороге не валяются!',
    'Оказывается, смешанный цвет глаз называется "хейзел". Так вот, когда я тебя увидел, я охейзел по полной программе!',
    'Я могу признаться тебе в любви на всех языках... программирования'
  ];

  const declarations = [
    'Я люблю тебя',
    'Ti amo',
    'I love you',
    'Je t`aime',
    'Te quiero'
  ];

  const importantWordsElements = document.querySelectorAll('.important-words');
  const declarationOfLoveElements = document.querySelectorAll('.declaration-of-love');

  const getValue = (nodeList, values) => {
    const index = Math.floor(Math.random() * values.length);

    if (nodeList.item(0).textContent === values[index])
      return index !== values.length - 1
        ? values[index + 1]
        : values[index - 1];
    else return values[index];
  };

  const getFontSize = ({ length = 0 }) => {
      if (length < 55) {
        return '2.7em'
      } else if(length < 80) {
        return '2.3em'
      } else if(length < 115) {
        return '2.1em'
      }
    };

  const opacityToggle = [
    { opacity: '1' },
    { opacity: '0' },
    { opacity: '0' },
    { opacity: '1' }
  ];

  const animationTiming = {
    delay: 7500,
    duration: 1000,
    iterations: 1
  };

  const phrase = getValue(importantWordsElements, importantWords);
  const declarationOfLove = getValue(declarationOfLoveElements, declarations);

  for (let i = 0; i < importantWordsElements.length; i++) {
    importantWordsElements.item(i).textContent = phrase;
    declarationOfLoveElements.item(i).textContent = declarationOfLove;

    importantWordsElements.item(i).style.fontSize = getFontSize(phrase);

    importantWordsElements.item(i).animate(opacityToggle, animationTiming);
    declarationOfLoveElements.item(i).animate(opacityToggle, animationTiming);
  }

  return setTimeout(changeImportantWords, 8000);
};

const init = () => {
  const mainContainer = document.querySelector('main');
  const cardWrapper = document.querySelector('.card-wrapper');

  const gradient = document.querySelector('#gradient-background');

  const confetti = new Confetti({ target: mainContainer });

  const audio = document.querySelector('#player');

  const motionMatchMedia = window.matchMedia('(prefers-reduced-motion)');

  startGradientBackground();

  changeImportantWords();

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
      return index !== tracks.length - 1
        ? tracks[index + 1]
        : tracks[index - 1];
    else return tracks[index];
  };

  const onHoverHandler = ({ clientX, clientY }) => {
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = cardWrapper;

    const shift = 30;

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

