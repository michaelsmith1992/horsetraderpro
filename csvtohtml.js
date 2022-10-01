const { parse } = require('csv-parse/sync');

exports.convertCsvToHtml = (body, eventType) => {
  const csvData = parse(body.toString('utf8'), {
    columns: true,
    skip_empty_lines: true,
  });
  //do something with csvData
  let htmlData = '';
  switch (eventType) {
    case 'dressage':
      htmlData = dressageMapper(csvData);
      break;
    case 'eventing':
      htmlData = eventingMapper(csvData);
      break;
    case 'jumping':
      htmlData = jumpingMapper(csvData);
      break;
    default:
      break;
  }
  return {
    htmlData,
    eventType
  }
};

const dressageMapper = (csv) => {
  let html = '';
  csv.forEach((item) => {
    html += `<tr>
            <td>${item.ranking}</td>
            <td>${item.name}</td>
            <td>${item.horse}</td>
            <td>${item.con}</td>
            <td>${item.points}</td>
          </tr>`;
  });
  return `<div class='scroll_table scroll_table-bordered'>
        <table class='startlist_table'>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Athlete</th>
              <th>Horse</th>
              <th>NF</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
          ${html}
          </tbody>
          </table>
        </div>`;
};

const eventingMapper = (csv) => {
  let html = '';
  csv.forEach((item) => {
    html += `<tr>
        <td>${item.ranking}</td>
        <td>${item.name}</td>
        <td>${item.con}</td>
        <td>${item.points}</td>
      </tr>`;
  });
  return `<div class='scroll_table scroll_table-bordered'>
    <table class='startlist_table'>
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
};

const jumpingMapper = (csv) => {
  let html = '';
  csv.forEach((item) => {
    html += `<tr>
        <td>${item.ranking}</td>
        <td>${item.name}</td>
        <td>${item.con}</td>
        <td>${item.points}</td>
      </tr>`;
  });
  return `<div class='scroll_table scroll_table-bordered'>
    <table class='startlist_table'>
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
};
