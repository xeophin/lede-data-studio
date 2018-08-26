// Let's see if we can work with Illustrator!

//region Polyfills

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {
  Array.prototype.map = function(callback /*, thisArg*/) {
    var T, A, k;

    if (this == null) {
      throw new TypeError("this is null or not defined");
    }

    // 1. Let O be the result of calling ToObject passing the |this|
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = arguments[1];
    }

    // 6. Let A be a new array created as if by the expression new Array(len)
    //    where Array is the standard built-in constructor with that name and
    //    len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {
      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {
        // i. Let kValue be the result of calling the Get internal
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal
        //     method of callback with T as the this value and argument
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}

//endregion

//region Data Handling

// This is taken over from d3-dsv
var EOL = {},
  EOF = {},
  QUOTE = 34,
  NEWLINE = 10,
  RETURN = 13;

function objectConverter(columns) {
  return new Function(
    "d",
    "return {" +
      columns
        .map(function(name, i) {
          return JSON.stringify(name) + ": d[" + i + "]";
        })
        .join(",") +
      "}"
  );
}

function customConverter(columns, f) {
  var object = objectConverter(columns);
  return function(row, i) {
    return f(object(row), i, columns);
  };
}

// Compute unique columns in order of discovery.
function inferColumns(rows) {
  var columnSet = Object.create(null),
    columns = [];

  rows.forEach(function(row) {
    for (var column in row) {
      if (!(column in columnSet)) {
        columns.push((columnSet[column] = column));
      }
    }
  });

  return columns;
}

function dsv(delimiter) {
  var reFormat = new RegExp('["' + delimiter + "\n\r]"),
    DELIMITER = delimiter.charCodeAt(0);

  function parse(text, f) {
    var convert,
      columns,
      rows = parseRows(text, function(row, i) {
        if (convert) return convert(row, i - 1);
        (columns = row),
          (convert = f ? customConverter(row, f) : objectConverter(row));
      });
    rows.columns = columns || [];
    return rows;
  }

  function parseRows(text, f) {
    var rows = [], // output rows
      N = text.length,
      I = 0, // current character index
      n = 0, // current line number
      t, // current token
      eof = N <= 0, // current token followed by EOF?
      eol = false; // current token followed by EOL?

    // Strip the trailing newline.
    if (text.charCodeAt(N - 1) === NEWLINE) --N;
    if (text.charCodeAt(N - 1) === RETURN) --N;

    function token() {
      if (eof) return EOF;
      if (eol) return (eol = false), EOL;

      // Unescape quotes.
      var i,
        j = I,
        c;
      if (text.charCodeAt(j) === QUOTE) {
        while (
          (I++ < N && text.charCodeAt(I) !== QUOTE) ||
          text.charCodeAt(++I) === QUOTE
        );
        if ((i = I) >= N) eof = true;
        else if ((c = text.charCodeAt(I++)) === NEWLINE) eol = true;
        else if (c === RETURN) {
          eol = true;
          if (text.charCodeAt(I) === NEWLINE) ++I;
        }
        return text.slice(j + 1, i - 1).replace(/""/g, '"');
      }

      // Find next delimiter or newline.
      while (I < N) {
        if ((c = text.charCodeAt((i = I++))) === NEWLINE) eol = true;
        else if (c === RETURN) {
          eol = true;
          if (text.charCodeAt(I) === NEWLINE) ++I;
        } else if (c !== DELIMITER) continue;
        return text.slice(j, i);
      }

      // Return last token before EOF.
      return (eof = true), text.slice(j, N);
    }

    while ((t = token()) !== EOF) {
      var row = [];
      while (t !== EOL && t !== EOF) row.push(t), (t = token());
      if (f && (row = f(row, n++)) == null) continue;
      rows.push(row);
    }

    return rows;
  }

  return {
    parse: parse,
    parseRows: parseRows
  };
}

//endregion

// region Drawing functions
function drawAReallyLongLine(anchors, layer) {
  layer = layer || artLayer;
  var ARBITRARY_LIMIT = 999;
  var loopsNeeded = (anchors.length % ARBITRARY_LIMIT) + 1;
  var group = artLayer.groupItems.add();

  for (var i = 0; i <= loopsNeeded; i++) {
    var line = group.pathItems.add();

    // Get the first ARBITRARY_LIMIT items
    var a = anchors;

    if (anchors.length > ARBITRARY_LIMIT) {
      a = anchors.splice(0, ARBITRARY_LIMIT);
      a.push(anchors[0]);
    }

    line.setEntirePath(a);
    line.stroked = true;
    line.filled = false;
  }
}
// endregion

/**
 * The current document
 */
var doc = app.activeDocument;

var dataItem = doc.textFrames.getByName("data");

var data = dsv("\t").parse(dataItem.contents);

console.log(data.columns);

var artLayer = doc.layers.add();
artLayer.name = "values";

// Everything is in points
var ELEMENT_WIDTH = 3;
var MAX_HEIGHT = 200;

// Information about data
var MAX = {
  ozon: 177,
  feinstaub: 100,
  kohlenmonoxid: 1.25,
  schwefeldioxid: 17,
  stickstoffdioxid: 91,
  lufttemperatur: 31,
  regendauer: 1410
};

var monthTranslation = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

doc.defaultFilled = true;
doc.defaultStroked = false;

// Set up the temperature line
var temperatureReadings = [];

// loop through all the data
for (var i = 0; i < data.length; i++) {
  dataPoint = data[i];

  // temperatur line

  temperatureReadings.push([
    i * ELEMENT_WIDTH + ELEMENT_WIDTH / 2,
    isNaN(parseFloat(dataPoint.lufttemperatur))
      ? 0
      : parseFloat(dataPoint.lufttemperatur) * 5.0
  ]);

  // Air Quality Handling
  var rect = artLayer.pathItems.rectangle(
    MAX_HEIGHT,
    ELEMENT_WIDTH * i,
    ELEMENT_WIDTH,
    MAX_HEIGHT
  );

  var someColor = new CMYKColor();
  someColor.black = isNaN(dataPoint.feinstaub)
    ? 0
    : Math.ceil((parseFloat(dataPoint.feinstaub) / MAX.feinstaub) * 100);
  someColor.magenta = isNaN(dataPoint.ozon)
    ? 0
    : Math.ceil((parseFloat(dataPoint.ozon) / MAX.ozon) * 100);
  someColor.yellow = isNaN(dataPoint.schwefeldioxid)
    ? 0
    : Math.ceil(
        (parseFloat(dataPoint.schwefeldioxid) / MAX.schwefeldioxid) * 100
      );
  someColor.cyan = isNaN(dataPoint.stickstoffdioxid)
    ? 0
    : Math.ceil(
        (parseFloat(dataPoint.stickstoffdioxid) / MAX.stickstoffdioxid) * 100
      );

  rect.fillColor = someColor;

  // Date Handling
  var dateElements = dataPoint.datum.split("-");

  if (dateElements[2] === "01") {
    var descr = artLayer.textFrames.pointText([i * ELEMENT_WIDTH, -10]);
    descr.contents =
      monthTranslation[parseInt(dateElements[1])] + " " + dateElements[0];
  }
}

drawAReallyLongLine(temperatureReadings, artLayer);
