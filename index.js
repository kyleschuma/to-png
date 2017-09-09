const cloneElement = el => {

  // create a copy of the element
  //
  const clone = el.cloneNode(false);
  if (el.children === undefined || el.children.length === 0) {
    clone.innerHTML = el.innerHTML;
  } else {
    [ ...el.children ].forEach(child => {
      clone.appendChild(cloneElement(child));
    });
  }

  // apply styles
  //
  const source = window.getComputedStyle(el);
  const target = clone.style;

  if (source.cssText)
    target.cssText = source.cssText;
  else {
    [ ...source ].forEach(name =>
      target.setProperty(name,
        source.getPropertyValue(name),
        source.getPropertyPriority(name)
      )
    );
  }
  return clone;
};

const toCanvas = (el, { scale=1 }) =>
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
  const html = new XMLSerializer()
    .serializeToString(cloneElement(el))
    .replace(/#/g, '%23')
    .replace(/\n/g, '%0A');
  const uri = `
    data:image/svg+xml;charset=utf-8,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${el.offsetWidth}" height="${el.offsetHeight}">

      <foreignObject x="0" y="0" width="100%" height="100%">
        ${html}
      </foreignObject>
    </svg>
  `;
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = reject;
  image.src = uri;
});

export default (el, opts={ scale: 1}) =>
  toCanvas(el, opts)
    .then(canvas => canvas.toDataURL());
