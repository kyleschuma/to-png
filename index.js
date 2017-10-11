
const getDefaultStyle = el => {

  const dummy = document.createElement(el.tagName);
  document.body.appendChild(dummy);

  const source = window.getComputedStyle(dummy);
  const style = [ ...source ].reduce((res, name) => {
    res[name] = source.getPropertyValue(name);
    return res;
  }, {});

  document.body.removeChild(dummy);

  return style;
};

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
    const def    = getDefaultStyle(el);
    const source = window.getComputedStyle(el);
    const target = clone.style;

    [ ...source ].forEach(name => {

      const value    = source.getPropertyValue(name);
      const priority = source.getPropertyPriority(name);
      if (def[name] === value)
        return; // exclude the defaults
      target.setProperty(name, value, priority);
    });
  }

  return clone;
};

const toWorkAround = el => Promise.reject({
  foreignObjectsRequired: true,
  message: `
    Browser does support the foreignObject tag.

    If you see this error, please consult https://github.com/kyleschuma/to-png#readme for a possible workaround.
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
