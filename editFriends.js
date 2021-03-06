document.addEventListener('DOMContentLoaded', function () {
	initPage();
	fillNameOfUserInInputFieldAtStart();
}, false)

function initPage() {
	chrome.storage.local.get({ profiles: [] }, function (data) {
		var br = document.createElement("br");

		var headline = document.createElement("h1");
		var headlineText = document.createTextNode("Settings");
		headline.appendChild(headlineText);
		document.body.appendChild(headline);

		var description = document.createElement("p");
		var descriptionText = document.createTextNode("Here you can change your Friends.");
		description.appendChild(descriptionText);
		document.body.appendChild(description);
		document.body.appendChild(br.cloneNode());

		var form = document.createElement("form");
		form.setAttribute("id", "form");

		var inputProfilLabel = document.createElement("label");
		var inputProfilLabelText = document.createTextNode("Your Profil: ");
		inputProfilLabel.appendChild(inputProfilLabelText);
		inputProfilLabel.setAttribute("class" , "faceitFriendsLabel");
		form.appendChild(inputProfilLabel);

		var inputProfil = document.createElement("input");
		inputProfil.setAttribute("type", "text");
		inputProfil.setAttribute("id", "yourProfilInput");
		inputProfil.setAttribute("name", "Your Profile");
		inputProfil.setAttribute("placeholder", "Your Faceit name");
		inputProfil.setAttribute("class", "faceitFriendsInput");
		form.appendChild(inputProfil);

		var plusButton = document.createElement("input");
		plusButton.setAttribute("id", "addFriend");
		plusButton.setAttribute("type", "button");
		plusButton.setAttribute("value", "add");
		plusButton.setAttribute("class", "faceitFriendsDefaultButton");
		plusButton.addEventListener("click", addClick);
		form.appendChild(plusButton);

		document.body.appendChild(form);

		document.body.appendChild(br.cloneNode());
		for (let index = 0; index < data.profiles.length; index++) {
			if (index !== 0) {
				var form = document.getElementById("form");
				var br = document.createElement("br");
				form.appendChild(br);

				form.appendChild(createFaceitFriendLabel(index));
				form.appendChild(createFaceitFriendInput(index));

				var deleteButton = document.createElement("input");
				deleteButton.setAttribute('id', 'deleteButtonID: ' + index);
				deleteButton.setAttribute("type", "button");
				deleteButton.setAttribute("value", "-");
				deleteButton.setAttribute("class", "faceitFriendsDeleteButton");
				form.appendChild(deleteButton);
				
				document.getElementById("deleteButtonID: "+ index).onclick = function () {
					document.getElementById('faceitFriendLabel: ' + index).remove();
					document.getElementById("faceitFriend" + index + "Input").remove();
					document.getElementById("deleteButtonID: "+ index).remove();
				}
			}
		}
		var button = document.createElement("input");
		button.setAttribute("id", "submit");
		button.setAttribute("type", "submit");
		button.setAttribute("value", "Done");
		button.setAttribute("class", "faceitFriendsSubmitButton");

		document.body.appendChild(button);

		document.getElementById("submit").onclick = function () {
			var form = document.getElementById("form");
			var childs = Array.prototype.slice.call(form);
			var profiles = new Array();
			for (let index = 0; index < childs.length; index++) {
				profiles[index] = childs[index].value;
			}
			var cleanProfiles = profiles.filter(function (value, index, arr) {
				return value != "add" && value != "" && value != "-";
			})
			profiles = cleanProfiles;
			chrome.storage.local.set({ profiles });
			window.location.assign("popup.html");
		}
	})
}

function createFaceitFriendInput(index) {
	var faceitFriendInput = document.createElement("input");
	faceitFriendInput.setAttribute("type", "text");
	var inputId = "faceitFriend" + index + "Input";
	faceitFriendInput.setAttribute("id", inputId);
	var faceitFriendName = "faceitFriendName" + index;
	faceitFriendInput.setAttribute("name", faceitFriendName);
	faceitFriendInput.setAttribute("placeholder", "Faceit name");
	faceitFriendInput.setAttribute("class", "faceitFriendsInput");
	return faceitFriendInput;
}

function createFaceitFriendLabel(index) {
	var faceitFriendLabel = document.createElement("label");
	faceitFriendLabel.setAttribute('id', 'faceitFriendLabel: ' + index);
	var faceitFriendLabelText = document.createTextNode("Faceit Friend " + index + ": ");
	faceitFriendLabel.setAttribute("class", "faceitFriendsLabel");
	faceitFriendLabel.appendChild(faceitFriendLabelText);
	return faceitFriendLabel;
}

function addClick() {
	var form = document.getElementById("form");
	var br = document.createElement("br");
	form.appendChild(br);
	
	var faceitFriendLabel = document.createElement("label");
	var text = "Faceit Friend: ";
	faceitFriendLabel.setAttribute("id", "faceitFriendLabelAdd")
	var faceitFriendLabelText = document.createTextNode(text);
	faceitFriendLabel.setAttribute("class", "faceitFriendsLabel");
	faceitFriendLabel.appendChild(faceitFriendLabelText);
	form.appendChild(faceitFriendLabel);

	var faceitFriendInput = document.createElement("input");
	faceitFriendInput.setAttribute("type", "text");
	faceitFriendInput.setAttribute("id", "faceitFriendInputAdd");
	faceitFriendInput.setAttribute("placeholder", "Faceit name");
	faceitFriendInput.setAttribute("class", "faceitFriendsInput");
	form.appendChild(faceitFriendInput);

	var deleteButton = document.createElement("input");
	deleteButton.setAttribute('id', 'deleteButtonIDAdd');
	deleteButton.setAttribute("type", "button");
	deleteButton.setAttribute("value", "-");
	deleteButton.setAttribute("class", "faceitFriendsDeleteButton");
	form.appendChild(deleteButton);
	
	document.getElementById("deleteButtonIDAdd").onclick = function () {
		document.getElementById('faceitFriendLabelAdd').remove();
		document.getElementById("faceitFriendInputAdd").remove();
		document.getElementById("deleteButtonIDAdd").remove();
	}
}

function fillNameOfUserInInputFieldAtStart() {
	chrome.storage.local.get({ profiles: [] }, function (data) {
		var form = document.getElementById("form");
		var childs = Array.prototype.slice.call(form);
		var profileNumber = 0;
		for (let index = 0; index < childs.length; index++) {
			if (index === 0) {
				childs[index].value = data.profiles[profileNumber];
				profileNumber++;
			} else if (index === 1 || index % 2 == 1) {
				continue;
			} else {
				childs[index].value = data.profiles[profileNumber];
				profileNumber++;
			}
		}
	})
}