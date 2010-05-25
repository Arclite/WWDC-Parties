var partySelected = false;

function pollBackButton() {
	if (partySelected === true && window.location.hash == "") {
		document.getElementById('content').removeChild(document.getElementById('partyInfo'));
		loadParties();
	}
	
	else if (partySelected === false && window.location.hash != "") {
		document.getElementById('content').removeChild(document.getElementById('cells'));
		loadParty(window.location.hash.substring(7));
	}

	setTimeout("pollBackButton()", 10);
}

function cellUp(event) {
	var target
	if (!event)
		var event = window.event
	if (event.target)
		target = event.target
	else if (event.srcElement)
		target = event.srcElement
	if (target.nodeType == 3) // defeat Safari bug
		target = target.parentNode

	if (target.tagName == "P")
		target = target.parentNode

	target.className = "cell";
}

function cellDown(event) {
	var target
	if (!event)
		var event = window.event
	if (event.target)
		target = event.target
	else if (event.srcElement)
		target = event.srcElement
	if (target.nodeType == 3) // defeat Safari bug
		target = target.parentNode
	
	if (target.tagName == "P")
		target = target.parentNode

	target.className = "cell clicked";
}

function loadParties() {
	partySelected = false;

	if (window.location.hash != "") {
		loadParty(window.location.hash.substring(7));
		return;
	}

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "../parties", false);
	xhr.send("");

	var parties = eval('(' + xhr.responseText + ')').content;
	var i;

	var cellsElement = document.createElement('div');
	cellsElement.setAttribute("id", "cells");
	document.getElementById('content').appendChild(cellsElement);

	for (i = (parties.length - 1); i >= 0; i--) {
		addPartyCell(parties[i].name, parties[i].guid);
	}
}

function loadParty(guid) {
	partySelected = true;

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "../parties/" + guid, false);
	xhr.send("");
	
	var party = eval('(' + xhr.responseText + ')').content;
	
	var partyInfoElement = document.createElement('div');
	partyInfoElement.setAttribute("id", "partyInfo");
	
	//Party Name
	var partyNameElement = document.createElement('div');
	partyNameElement.setAttribute("id", "partyName");
	
	var partyNameTextElement = document.createElement('p');
	partyNameTextElement.appendChild(document.createTextNode(party.name));
	partyNameElement.appendChild(partyNameTextElement);
	
	partyInfoElement.appendChild(partyNameElement); //end Party Name
	
	//Party Setting
	var partySettingElement = document.createElement('div');
	partySettingElement.setAttribute("id", "partySetting");
	
	var partyLocationElement = document.createElement('p');
	partyLocationElement.appendChild(document.createTextNode(party.location));
	partySettingElement.appendChild(partyLocationElement);
	
	var partyTimeElement = document.createElement('p');
	var partyTime = parseTime(party.startTime);
	partyTimeElement.appendChild(document.createTextNode(dateToString(partyTime)));
	partySettingElement.appendChild(partyTimeElement);
	
	partyInfoElement.appendChild(partySettingElement); //end Party Setting
	
	//Party Map Location
	var partyMapElement = document.createElement('div');
	partyMapElement.setAttribute("id", "partyMap");
	var partyAddressLink = "http://maps.google.com/maps?q=" + escape(party.location + " " + party.streetAddress + " " + party.city);
	
	var partyAddressElement = document.createElement('p');
	var partyAddressLinkElement = document.createElement('a');
	partyAddressLinkElement.setAttribute("href", partyAddressLink);
	partyAddressLinkElement.appendChild(document.createTextNode(party.streetAddress));
	partyAddressElement.appendChild(partyAddressLinkElement);
	partyMapElement.appendChild(partyAddressElement);
	
	var partyCityElement = document.createElement('p');
	var partyCityLinkElement = document.createElement('a');
	partyCityLinkElement.setAttribute("href", partyAddressLink);
	partyCityLinkElement.appendChild(document.createTextNode(party.city));
	partyCityElement.appendChild(partyCityLinkElement);
	partyMapElement.appendChild(partyCityElement);
	
	partyInfoElement.appendChild(partyMapElement); //end Party Map Location
	
	//Party Button
	var partyButtonElement = document.createElement('div');
	partyButtonElement.setAttribute("id", "partyButton");

	var moreInfoButton = document.createElement('a');
	moreInfoButton.className = "button";
	moreInfoButton.setAttribute("onmousedown", "buttonDown(event)");
	moreInfoButton.setAttribute("onmouseup", "buttonUp(event)");
	moreInfoButton.setAttribute("href", party.moreInfo);
	moreInfoButton.appendChild(document.createTextNode("More Info"));
	partyButtonElement.appendChild(moreInfoButton);
	
	partyInfoElement.appendChild(partyButtonElement); //end Party Button
	
	document.getElementById('content').appendChild(partyInfoElement);
}

function addPartyCell(partyName, guid) {
	var partyCell = document.createElement('div');
	partyCell.className = "cell";
	partyCell.setAttribute("onmouseup", "cellUp(event)");
	partyCell.setAttribute("onmousedown", "cellDown(event)");
	partyCell.setAttribute("ontouchend", "cellUp(event)");
	partyCell.setAttribute("ontouchstart", "cellDown(event)");
	partyCell.setAttribute("onclick", "visitParty(" + guid + ")");

	var partyNameElement = document.createElement('p');
	var partyNameText = document.createTextNode(partyName);
	partyNameElement.appendChild(partyNameText);

	partyCell.appendChild(partyNameElement);
	document.getElementById('cells').appendChild(partyCell);
}

function visitParty(guid) {
	window.location = window.location + "#party-" + guid;
	document.getElementById('content').removeChild(document.getElementById('cells'));
	loadParty(guid);
}

function resetParties() {
	window.location = "http://wwdcparties.com";
	document.getElementById('content').removeChild(document.getElementById('partyInfo'));
	loadParties();
}

function parseTime(timeString) {
	var stringParts = timeString.split(" ");
	var dateParts = stringParts[0].split("-");
	var timeParts = stringParts[1].split(":");
	
	var returnTime = new Date(dateParts[0], (dateParts[1] - 1), dateParts[2], timeParts[0], timeParts[1], timeParts[2], 0);
	return returnTime;
}

function dateToString(stringDate) {
	var dateString = "";
	
	//get day of week
	switch (stringDate.getDay()) {
		case 0:
			dateString += "Sunday";
			break;
		case 1:
			dateString += "Monday";
			break;
		case 2:
			dateString += "Tuesday";
			break;
		case 3:
			dateString += "Wednesday";
			break;
		case 4:
			dateString += "Thursday";
			break;
		case 5:
			dateString += "Friday";
			break;
		case 6:
			dateString += "Saturday";
			break;
	}
	
	//get month
	dateString += ", June ";
	
	//get date
	dateString += stringDate.getDate();
	
	//get year
	dateString += ", 2010";
	
	//if time exists
	if (stringDate.getHours() != 0) {
		dateString += " at ";
		if (stringDate.getHours() < 13)
			dateString += stringDate.getHours() + ":" + zeroFill(stringDate.getMinutes(), 2) + " AM";
		else
			dateString += (stringDate.getHours() - 12) + ":" + zeroFill(stringDate.getMinutes(), 2) + " PM";
	}
	
	return dateString;
}

function zeroFill(number, width) {
	width -= number.toString().length;
	if (width > 0) {
		return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
	}

	return number;
}