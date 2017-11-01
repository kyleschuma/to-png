
const cloneElement = el => {

  const clone = el.cloneNode(false);
  const cloneChildren = () => Promise.all(
    [ ...el.childNodes ].map(child => cloneElement(child))
  );
  const copyCSS = () => new Promise(accept => {

    setTimeout(() => {
      // using timeout is a hack to prevent blocking of ui interaction for more
      // information about timeout and blocking see:
      // https://johnresig.com/blog/how-javascript-timers-work/#postcomment
      //
      if (el.nodeType === Node.ELEMENT_NODE) {

        // apply styles
        //
        const source = window.getComputedStyle(el);
        const target = clone.style;
        const styles = [ ...source ];
        styles.forEach(name =>
          target.setProperty(name, source.getPropertyValue(name))
        );
      }
      accept();
    }, 10);
  });

  return Promise.resolve()
    .then(copyCSS)
    .then(cloneChildren)
    .then(children => {
      children.forEach(child => clone.appendChild(child));
      return clone;
    });
};

const toWorkAround = el => new Promise((accept, reject) =>
  toSvg(el).then(svg =>
    reject({
      foreignObjectsRequired: true,
      message: `
        Browser does support the foreignObject tag.

        If you see this error, please consult https://github.com/kyleschuma/to-png#readme for a possible workaround.
      `,
      svg,
    })
  )
);

const toCanvas = (el, scale=1) =>
  toImage(el).then(image => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = el.offsetWidth * scale;
    canvas.height = el.offsetHeight * scale;
    context.scale(scale, scale);
    context.drawImage(image, 0, 0);

    return canvas;
  });

const toImage = el => toSvg(el).then(svg => new Promise((resolve, reject) => {

  const src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = err => reject(err);
  image.src = src;
}));

const toSvg = el => cloneElement(el).then(clone => `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="${el.offsetWidth}" height="${el.offsetHeight}">
    <foreignObject x="0" y="0" width="100%" height="100%">
      ${new XMLSerializer().serializeToString(clone)}
    </foreignObject>
  </svg>
`);

const supportsForeignObjects = () =>
  document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Extensibility', '1.1');

const toResponse = canvas =>
  new Promise(resolve => canvas.toBlob(blob =>
    resolve({
      blob,
      dataUrl: canvas.toDataURL(),
    })
  ));

export default (...args) => supportsForeignObjects() ?
  toCanvas(...args).then(toResponse) :
  toWorkAround(...args);
