function buttonUp(event) {
	var target
	if (!event)
		var event = window.event
	if (event.target)
		target = event.target
	else if (event.srcElement)
		target = event.srcElement
	if (target.nodeType == 3) // defeat Safari bug
		target = target.parentNode
		
	target.className = "button";
}

function buttonDown(event) {
	var target
	if (!event)
		var event = window.event
	if (event.target)
		target = event.target
	else if (event.srcElement)
		target = event.srcElement
	if (target.nodeType == 3) // defeat Safari bug
		target = target.parentNode
		
	target.className = "button clicked";
}