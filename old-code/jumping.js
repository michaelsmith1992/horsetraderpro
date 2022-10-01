var fs = require("fs");
var parse = require("csv-parser");

var csvData = [];
fs.createReadStream("jumping.csv")
  .pipe(parse({ delimiter: ":" }))
  .on("data", function (csvrow) {
    //do something with csvrow
    csvData.push(csvrow);
  })
  .on("end", function () {
    //do something with csvData
    let html = "";
    csvData.forEach((item) => {
      html += `<tr>
          <td>${item.ranking}</td>
          <td>${item.name}</td>
          <td>${item.con}</td>
          <td>${item.points}</td>
        </tr>`;
    });
    const finalHtml = `<div class="scroll_table scroll_table-bordered">
      <table class="startlist_table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Athlete</th>
            <th>NF</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
        ${html}
        </tbody>
        </table>
      </div>`;
      fs.writeFile('jumping-results.html', finalHtml, function (err) {
        if (err) return console.log(err);
        console.log('File is written!');
      });  });
