# to-png
An easy way of creating PNG images from given DOM element.

## Usage 

```javascript
import toPng from 'to-png';

const element = document.getElementById('source')
toPng(el)
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
