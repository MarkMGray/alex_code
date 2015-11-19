

// function determineClass(cell, ann) {
// 	ann.feedForward([cell.x / COLS, cell.y / ROWS]);
// 	var maxOut = -666666;
// 	var bestI = 0;

// 	for (var i = 0; i < ann.outputs.length; i++) {
// 		var output = ann.outputs[i].activation;
// 		if (output > maxOut) {
// 			maxOut = output;
// 			bestI = i;
// 		}
// 	}
// 	return bestI;
// }

window.ZClasser = function(numClasses) {}
ZClasser.prototype.getClass = function(cell) {
	return cell.z;
}



window.FourPointClasser = function(numClasses, numLevels) {
	this.n = Math.random();
	this.s = Math.random();
	this.e = Math.random();
	this.w = Math.random();
	if (this.s < this.n) {
		var z = this.s;
		this.s = this.n;
		this.n = z;
	}
	if (this.e < this.w) {
		var z = this.e;
		this.e = this.w;
		this.w = z;
	}
	this.classes = []
	for (var i = 0; i < 9 * numLevels; i++) this.classes.push(randInt(numClasses));
}
FourPointClasser.prototype.getClass = function(cell) {
	var x = cell.x / COLS
	var y = cell.y / ROWS
	var z = cell.z * 9;
	if (x < this.e) {
		if (y < this.n) return this.classes[0 + z];
		else if (y > this.s) return this.classes[1 + z];
		else return this.classes[2 + z];
	} else if (x > this.w) {
		if (y < this.n) return this.classes[3 + z];
		else if (y > this.s) return this.classes[4 + z];
		else return this.classes[5 + z];
	} else {
		if (y < this.n) return this.classes[6 + z];
		else if (y > this.s) return this.classes[7 + z];
		else return this.classes[8 + z];
	}
}



function randInt(n) {
	return Math.floor(Math.random() * n);
}