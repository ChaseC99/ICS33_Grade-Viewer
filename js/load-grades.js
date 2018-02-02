var grades_json;

function sendrequest(){
    // THIS CODE LOGS THE JSON OBJECT TO THE CONSOLE
    // Sets xlsm file source as the test file in our GitHub repo
    var url = "https://raw.githubusercontent.com/ChaseC99/ICS33-Grade-Viewer/master/gradesTestFile.xlsm";
    //var url = "https://github.com/ChaseC99/ICS33-Grade-Viewer/blob/master/gradesTestFile.xlsm";
    var grades_json;

    /* set up async GET request */
    var req = new XMLHttpRequest();
    req.open("GET", url, true);


    // Tell request what to do with code once the request loads
    req.onload = function(e) {
        grades_json = loadgrades(req);
        console.log(grades_json);
        load_html_table(grades_json)
        /*
        var data = new Uint8Array(req.response);
        var workbook = XLSX.read(data, {type:"array"});

        // The first sheet is the one with the grades
        // This gets its name
        var grades_sheet_name = workbook.SheetNames[0];

        // Get the grades sheet
        var grades_sheet = workbook.Sheets[grades_sheet_name];

        // Convert sheet to JSON and log it to console
        grades_json = XLSX.utils.sheet_to_json(grades_sheet, {header:1});
        console.log(grades_json);
        */
    }

    // Send request
    req.send();
    req.responseType = "arraybuffer";
    console.log(req);

    return req;
}

function loadgrades(req){
    var data = new Uint8Array(req.response);
    var workbook = XLSX.read(data, {type:"array"});

    /* DO SOMETHING WITH workbook HERE */
    // The first sheet is the one with the grades
    // This gets its name
    var grades_sheet_name = workbook.SheetNames[0];

    // Get the grades sheet
    var grades_sheet = workbook.Sheets[grades_sheet_name];

    // Convert sheet to JSON and log it to console
    grades_json = XLSX.utils.sheet_to_json(grades_sheet, {header:1});
    return grades_json;
}

function load_html_table(grades){
    hash_index = findHashIndex(hashIDinput, grades);
    hash_grades = grades[hash_index];
    console.log(hash_grades);
    generate_table(grades, hash_index)
}
