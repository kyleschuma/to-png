# to-png
An easy way of creating PNG image from given DOM element.

## Usage

```javascript
import toPng from 'to-png';

const element = document.getElementById('source')
toPng(element)
  .then(image => {
    // do something with the image
    console.log(image);
  })
  .catch(err => {
    // do something with the error
    console.error(err);
  });
```

## API

### toPng(el, scale=1)

*el* - The DOM element to convert to PNG.

*scale* - A Number greater than 0 and less than 10 that scales the size of the image.     

### Known Issues

This library does not work with Internet Explorer or Edge browsers.  

If you must support Internet Explorer or Edge browsers, consult https://github.com/kyleschuma/to-png-foh#readme for a workaround for these browsers. 
