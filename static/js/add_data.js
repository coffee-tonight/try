// Service Account: mv-soadu@mv-soadu-345819.iam.gserviceaccount.com
// Client Id: 477935952803-eokqhhu7sv5cpjdvvc5p6h0t4abk7dnf.apps.googleusercontent.com
// API Key: AIzaSyAPEZM-uh2f57W9BaQ4p4mWCb2-_LyL55g

// Your API KEY AIzaSyA2t3evClUKvKsgbXOBrAaqfLuIHjiJC3k
const sheetId = '1_WKqPRuOArfiQ0JeUuiooz67vjCsoLDYA7xuT2izycg';

sheets = {
  "OD-2342-22": "Sheet1",
  "OD-0234-22": "Sheet2",
}

function read_data() {
  var params = {
    // The ID of the spreadsheet to retrieve data from. 1_WKqPRuOArfiQ0JeUuiooz67vjCsoLDYA7xuT2izycg
    spreadsheetId: '1_WKqPRuOArfiQ0JeUuiooz67vjCsoLDYA7xuT2izycg', // TODO: Update placeholder value.

    // The A1 notation of the values to retrieve.
    range: 'Sheet1', // TODO: Update placeholder value.

    // How values should be represented in the output.
    // The default render option is ValueRenderOption.FORMATTED_VALUE.
    //valueRenderOption: '',  // TODO: Update placeholder value.

    // How dates, times, and durations should be represented in the output.
    // This is ignored if value_render_option is
    // FORMATTED_VALUE.
    // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
    //dateTimeRenderOption: '',  // TODO: Update placeholder value.
  };

  // var res = "";

  var request = gapi.client.sheets.spreadsheets.values.get(params);
  request.then(function(response) {
    // TODO: Change code below to process the `response` object:
    console.log(response.result);
    // populateSheet(response.result);
    // res = response.result;
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });
  // return res;
}

function read_data_for_len() {
  let vehicle_no = document.getElementById("vehicle_no").value;
  var params = {
    spreadsheetId: '1_WKqPRuOArfiQ0JeUuiooz67vjCsoLDYA7xuT2izycg', // TODO: Update placeholder value.
    range: sheets[vehicle_no],
  };
  var request = gapi.client.sheets.spreadsheets.values.get(params);
  request.then(function(response) {
    console.log(response.result);
    submit_sheet_data(response.result);
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });
}


function submit_sheet_data(all_data) {
  let vehicle_no = document.getElementById("vehicle_no").value;
  let issue = document.getElementById("issue").value;
  let oiling = document.getElementById("oiling").value;

  console.log("Vehicle_no: ", vehicle_no);
  console.log("Issue: ", issue);
  console.log("Oiling: ", oiling);

  row = [[vehicle_no, issue, oiling],];
  // let all_data = read_data();
  console.log("All Data: ", all_data);
  let last_row = all_data.values.length;
  console.log("Last row: ", last_row);
  let range = `${sheets[vehicle_no]}!A${last_row+1}:C${last_row+1}`;
  let values = {values: row};
  console.log("Range: ", range, "Values: ", values);
  write_data(values, range);
}

function write_data(values, range) {
  gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: range,
    valueInputOption: "USER_ENTERED",
    resource: values
  }).then((response) => {
   var result = response.result;
    console.log(`${result.updatedCells} cells updated.`);
    document.getElementById("vehicle_no").value = "";
    document.getElementById("issue").value = "";
    document.getElementById("oiling").value = "";

    alert("Cool! Added the data, anything else?");
  });
}

function populateSheet(result) {
  let array_rows = result.values.length;
  console.log("Arrays_rows: ", array_rows);
  var par_table = document.getElementById("parent_table");

  var table = document.createElement("TABLE");
  table.setAttribute("id", "data_table");
  table.border = 1;

  var tableBody = document.createElement("TBODY");
  table.appendChild(tableBody);

  console.log("Values: ", result.values); 
  for(var row=0; row<array_rows; row++) {
    var tr = document.createElement("TR");
    tableBody.appendChild(tr);

    console.log("Row: ", result.values[row]);

    result.values[row].forEach(el => {
      var td = document.createElement("TD");
      var val = document.createElement("INPUT");
      val.setAttribute("type", "text");
      val.setAttribute("value", el);
      td.appendChild(val);
      tr.appendChild(td);
    });

    par_table.appendChild(table);
  }
}





































// const API_KEY = "AIzaSyA2t3evClUKvKsgbXOBrAaqfLuIHjiJC3k";

// function displayResult2(response) {
//   let tableHead = "";
//   let tableBody = "";
//   response.result.values.forEach((row, index) => {
//     if (index === 0) {
//       tableHead += "<tr>";
//       row.forEach((val) => (tableHead += "<th>" + val + "</th>"));
//       tableHead += "</tr>";
//     } else {
//       tableBody += "<tr>";
//       row.forEach((val) => (tableBody += "<td>" + val + "</td>"));
//       tableBody += "</tr>";
//     }
//   });
//   document.getElementById("table-head").innerHTML = tableHead;
//   document.getElementById("table-body").innerHTML = tableBody;
// }

// function loadData() {
//   // Spreadsheet ID 1MjMoMbuRJqnrfhxjetvdny-dnsFfmLJX24OWiSFUYvk
//   const spreadsheetId = "1MjMoMbuRJqnrfhxjetvdny-dnsFfmLJX24OWiSFUYvk";
//   const range = "A:Z";
//   getPublicValues({ spreadsheetId, range }, displayResult2);
// }

// window.addEventListener("load", (e) => {
//   initOAuthClient({ apiKey: API_KEY });
//   // gapi.client.init({
//   //   'apiKey': API_KEY,
//   //   // 'clientId': 'YOUR_CLIENT_ID',
//   //   'scope': 'https://www.googleapis.com/auth/youtube.force-ssl',
//   //   'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
//   // }).then(function () {
//   //     GoogleAuth = gapi.auth2.getAuthInstance();

//   //     // Listen for sign-in state changes.
//   //     GoogleAuth.isSignedIn.listen(updateSigninStatus);
//   // });
// });

// document.addEventListener("gapi-loaded", (e) => {
//   loadData();
// });