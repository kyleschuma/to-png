const cloneElement = el => {

  // create a copy of the element
  //
  const clone = el.cloneNode(false);
  const children = [ ...el.childNodes ];
  children.forEach(child => {
    clone.appendChild(cloneElement(child));
  });

  if (el.nodeType === Node.ELEMENT_NODE) {

    // apply styles
    //
    const source = window.getComputedStyle(el);
    const target = clone.style;

    [ ...source ].forEach(name =>
      target.setProperty(name,
        source.getPropertyValue(name),
        source.getPropertyPriority(name)
      )
    );
  }

  return clone;
};

const toHack = el => Promise.reject({
  message: `
    Browser does support the foreignObject tag.

    If you see this error, please consult https://github.com/kyleschuma/to-png-foh#readme for a workaround.
  `,
  svg: toSvg(el)
});

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

const toImage = el => new Promise((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = reject;
  image.src = `data:image/svg+xml;charset=utf-8,${toSvg(el)}`;
});

const toSvg = el => `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="${el.offsetWidth}" height="${el.offsetHeight}">
    <foreignObject x="0" y="0" width="100%" height="100%">
      ${new XMLSerializer().serializeToString(cloneElement(el))}
    </foreignObject>
  </svg>
`;

const supportsForeignObjects = () =>
  document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Extensibility', '1.1');

export default (...args) =>
  supportsForeignObjects() ?
    toCanvas(...args).then(canvas => canvas.toDataURL()) :
    toHack(...args);
