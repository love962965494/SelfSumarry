((document) => {
  const oHeader = document.querySelector('header');
  const oCube = document.querySelector('.cube');
  const oWrap = document.querySelector('#wrap');
  document.addEventListener('DOMContentLoaded', () => {
    const headerAnchors = () => {
      let pageDirection = '';
      let timeout;

      oHeader.querySelector('nav').addEventListener('click', (event) => {
        const eTarget = event.target;
        if (eTarget.localName.toLowerCase() !== 'a') return;

        Array.from(document.querySelectorAll('nav li')).forEach(oLi => oLi.classList.remove('active'));
        Array.from(document.querySelectorAll('.cube section')).forEach(oSection => oSection.classList.remove('active'));

        event.preventDefault();
        oCube.classList.remove(`reverse-${pageDirection}`);
        pageDirection = eTarget.getAttribute('data-direction');

        eTarget.parentElement.classList.add('active');
        document.querySelector(`.cube section.${pageDirection}`).classList.add('active');
        oCube.classList.add(`reverse-${pageDirection}`);
        oHeader.classList.add('go-out');
        oWrap.classList.add('active');

        clearTimeout(timeout);
        timeout = setTimeout(() => {
          oHeader.classList.remove('go-out');
          oWrap.classList.remove('active');
        }, 1000);
      });
    };

    headerAnchors();
  });
})(document);
