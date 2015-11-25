
// CLASSER = new ZClasser();
CLASSER = new FourPointClasser(WGT_POOL_SIZE, NUM_OBJ_CLASSES);
console.log(CLASSER)

// var DISPLAY = new GameDisplay(el("playDiv"));
window.addEventListener("resize", function() {DISPLAY.redraw();});
// DISPLAY.initialize(COLS, ROWS)
// DISPLAY.redraw()

var DISPLAY = new GameDisplay(el("playDiv"));
DISPLAY.initialize(COLS, ROWS, NUM_OBJ_CLASSES);

var evolver = new Evolution(popsize=15, maxperiodicity=10, COLS, ROWS, NUM_OBJ_CLASSES);
var gens = 3;

for (var g = 0; g < gens; g++) {
	evolver.oneGen();
	console.log(evolver.population[0].score)
}
DISPLAY.setCitizen(evolver.population[0], CLASSER)
console.log(DISPLAY)
DISPLAY.redraw()

el("finishButt").onclick = function() {
	el("surveyDiv").style.display = "block"
}

function finishCode() {
    var result = "";
    var pop = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 8; i++) result += pop.charAt(Math.floor(Math.random() * pop.length));
    return result;
}

el("submitButt").onclick = function() {
	DISPLAY.citizen.evaluation.surveyScore = getCheckedValue("survey");
	DISPLAY.citizen.evaluation.endMs = (new Date()).getTime();
	if (DISPLAY.citizen.evaluation.surveyScore) el("surveyDiv").style.display = "none"

	console.log(DISPLAY.citizen.getSaveData()) // send this to server

	var completionCode = finishCode();
	var postObj = DISPLAY.citizen.getSaveData();
	console.log(DISPLAY.citizen);
	postObj.citizenID = citizenID.toString();
	postObj.generationID = generationID.toString();
	postObj.completionCode = completionCode;
	console.log(postObj["cellData"]);
	postObj = {"data" :  JSON.stringify(postObj)}
	console.log("postobj: ");
	console.log(postObj);

	// $("#overlay").show();
	// $.post("/api/save", postObj, function (data) {
	// 	console.log(data);
	// 	var jsonObj = $.parseJSON(data);

	// 	if(jsonObj["response_code"] != 0) {
	// 		toastr.error("Error: " + jsonObj["error_msg"]);
	// 	} else {
	// 		var tmp = toastr.options;
	// 		toastr.success("Successfully saved response!");
	// 		toastr.options.timeOut = 750000;
	// 		toastr.options.positionClass = "toast-top-center";
	// 		toastr.info("Your completion code is: " + completionCode);
	// 		toastr.options = tmp;
	// 	}
	// 	$("#overlay").delay(500).hide(0);
	// })
	// 	.fail(function () {
	// 		toastr.error("Failed to save response!");
	// 		$("#overlay").delay(500).hide(0);
	// });
}