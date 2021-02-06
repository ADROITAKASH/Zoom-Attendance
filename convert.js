let datas = [];
let newData = [];
let arrName = [];
function Upload() {
  var fileUpload = document.getElementById("fileUpload");
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
    if (typeof FileReader != "undefined") {
      var reader = new FileReader();
      reader.onload = function (e) {
        console.log("Raw File");
        console.log(e.target.result);
        var lines = e.target.result.split("\r");
        for (let i = 0; i < lines.length; i++) {
          lines[i] = lines[i].replace(/\s/, ""); //delete all blanks
        }
        var result = [];

        // var headers = lines[3].split(" ")[0].split(",");
        var headers = lines[3].split(",");
        headers[0] = 'Name';
        headers[1] = 'Email';
        headers[2] = 'Duration';
        headers[3] = 'Guest';
        // headers = headers.forEach(header => { header.split(" ")[0] })

        for (var i = 4; i < lines.length; i++) {
          var obj = {};
          var currentline = lines[i].split(",");

          for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
          }

          result.push(obj);
        }

        //return result; //JavaScript object
        // console.log("After JSON Conversion");

        // console.log(JSON.stringify(result));
        datas = result
        // data = JSON.stringify(result)
        // console.log(datas)

        return JSON.stringify(result); //JSON
      };
      reader.readAsText(fileUpload.files[0]);
    } else {
      alert("This browser does not support HTML5.");
    }
  } else {
    alert("Please upload a valid CSV file.");
  }

  next()
}

// function next() {
//   datas.forEach(data1 => {
//     datas.forEach(data2 => {
//       if (typeof (data1.Duration) != number) {
//         data1.Duration = 0;
//       }
//       if (typeof (data2.Duration) != number) {
//         data2.Duration = 0;
//       }
//       if (data1.Name != data2.Name) {
//         newData.push(data1)
//       } else {
//         data1.Duration += data2.Duration;
//         newData.push(data1)
//       }
//     })
//   })

//   console.log(newData)
// }
var i=0;
function next() {
  datas.forEach(data1 => {
    if (!(arrName.includes(data1.Name))) {
      // if (typeof (data1.Duration) != 'number') {
      //   data1.Duration = parseInt(0);
      // }
      console.log('****************')
      datas.forEach((data2) => {
        // if (typeof (parseInt(data2.Duration)) != 'number') {
        //   data2.Duration = parseInt(0);
        // }
        if (data1.Name == data2.Name) {
          console.log(data1.Duration)
          i++;
          if (i>1) {
            data1.Duration = parseInt(data1.Duration) + parseInt(data2.Duration);
            arrName.push(data1.Name);
          }
        }
      }
      )
      newData.push(data1)
      i=0;
    }
  })
  // newData.push('data1')
  console.log(newData)
}
// function next() {
//   datas.forEach(data1 => {
//     if (!(arrName.includes(data1.Name))) {
//       datas.forEach(data2 => {
//         if (data1.Name == data2.Name) {
//           data1.Duration = parseInt(data1.Duration) + parseInt(data2.Duration);
//           arrName.push(data1.Name);
//         }
//       })
//       newData.push(data1)
//     }
//   })
//   // newData.push('data1')
//   console.log(newData)
// }




// Tablt+++++++++++++


var list = newData;

function constructTable(selector) {
  next()
  // Getting the all column names 
  var cols = Headers(list, selector);

  // Traversing the JSON data 
  for (var i = 0; i < list.length; i++) {
    var row = $('<tr/>');
    for (var colIndex = 0; colIndex < cols.length; colIndex++) {
      var val = list[i][cols[colIndex]];

      // If there is any key, which is matching 
      // with the column name 
      if (val == null) val = "";
      row.append($('<td/>').html(val));
    }

    // Adding each row to the table 
    $(selector).append(row);
  }
}

function Headers(list, selector) {
  var columns = [];
  var header = $('<tr/>');

  for (var i = 0; i < list.length; i++) {
    var row = list[i];

    for (var k in row) {
      if ($.inArray(k, columns) == -1) {
        columns.push(k);

        // Creating the header 
        header.append($('<th/>').html(k));
      }
    }
  }

  // Appending the header to the table 
  $(selector).append(header);
  return columns;
}        