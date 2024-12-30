/***
 * container: 버블이 속할 부모의 id
 * src	: image 경로
 * sMinX		: 시작점의 최소 x
 * sMaxX		: 시작점의 최대 x
 * sMinY		: 시작점의 최소 y
 * sMaxY		: 시작점의 최대 y

 * eMinX		: 종료점의 최소 x
 * eMaxX		: 종료점의 최대 x

 ***/
function etr_bubble(container,src,sMinX, sMaxX, sMinY, sMaxY, eMinX, eMaxX, eY,
	runTimeMin, runTimeMax,startScale, endScale) {
	this.item = $("<img src='"+src+"' alt='' />");
	this.container = '#'+container;

	this.sX = Math.round(Math.random()*(sMaxX-sMinX))+sMinX;
	this.sY = Math.round(Math.random()*(sMaxY-sMinY))+sMinY;
	this.eX = Math.round(Math.random()*(eMaxX-eMinX))+eMinX;
	this.eY = eY;

	this.runTime = Math.round(Math.random()*(runTimeMax-runTimeMin))+runTimeMin;

	this.startScale=startScale;
	this.endScale=endScale;

	if(startScale != undefined)
		this.startScale = startScale;
	if(endScale!=undefined)
		this.endScale = endScale;

	this.item.css({'position':'absolute','left':this.sX,'top':this.sY,
		'-webkit-transform':'scale('+this.startScale+')','opacity':0.5});
	this.run = function() {
		var bubItem = this.item;
		bubItem.appendTo(this.container);
		bubItem.delay(500).transition({'left':this.eX,'top':this.eY,
			'-webkit-transform':'scale('+this.endScale+')'},this.runTime, function() {
				bubItem.remove();
			});
	};
}