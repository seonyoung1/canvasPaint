var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var last_mouseX = 0,
	last_mouseY = 0;
var mouseX = 0,
	mouseY = 0;
var mousedown = false;
var toolType = 'draw';
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight - 50;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
ctx.strokeStyle = '#000';

// Mousedown
$(canvas).on('mousedown', function(e) {
	// last_mouseX = mouseX = parseInt(e.clientX - canvasX);
	// last_mouseY = mouseY = parseInt(e.clientY - canvasY);
	last_mouseX = e.offsetX;
	last_mouseY = e.offsetY;
	mouseX = e.offsetX;
	mouseY = e.offsetY;
	mousedown = true;
});

$(canvas).on('touchstart', function(e) {
	last_mouseX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
	last_mouseY = e.touches[0].pageY - e.touches[0].target.offsetTop;
	mouseX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
	mouseY = e.touches[0].pageY - e.touches[0].target.offsetTop;
	mousedown = true;
});

// Mouseup
$(canvas).on('mouseup touchend', function(e) {
	mousedown = false;
});

// Mousemove
$(canvas).on('mousemove', function(e) {
	mouseX = e.offsetX;
	mouseY = e.offsetY;
	painting(mouseX, mouseY);
});

$(canvas).on('touchmove', function(e) {
	mouseX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
	mouseY = e.touches[0].pageY - e.touches[0].target.offsetTop;
	painting(mouseX, mouseY);
});

function painting(mouseX, mouseY){
	if( mousedown ) {
		ctx.beginPath();
		if(toolType === 'draw') {
			ctx.globalCompositeOperation = 'source-over';
			ctx.lineWidth = 3;
		} else {
			ctx.globalCompositeOperation = 'destination-out';
			ctx.lineWidth = 15;
		}
		ctx.moveTo(last_mouseX, last_mouseY);
		ctx.lineTo(mouseX, mouseY);
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';
		ctx.stroke();
	}
	last_mouseX = mouseX;
	last_mouseY = mouseY;
}

function paintDelete(){
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function paintColor(color, button){
	$('#draw').trigger('click');
	ctx.strokeStyle = color;
	$(button).addClass('on').siblings().removeClass('on');
}

//Use draw|erase
function use_tool(tool, button) {
	toolType = tool; //update
	$(button).addClass('on').siblings().removeClass('on');
}

var isResize = false;
var imageData = '';
var image = new Image();
var timer;

$(window).on('resize', function(){
	if( !isResize ){
		imageData = canvas.toDataURL();
		isResize = true;
	}
	canvasWidth = window.innerWidth;
	canvasHeight = window.innerHeight - 50;
	ctx.canvas.width = canvasWidth;
	ctx.canvas.height = canvasHeight;
	ctx.strokeStyle = '#000';
	ctx.drawImage(image, 0, 0);
	image.src = imageData;
	if (timer) {
		clearTimeout(timer);
	}
	timer = setTimeout(function() {
		isResize = false;
	}, 200);
})