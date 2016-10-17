var openVidu;
var session;

window.addEventListener('load', function () {
	generateParticipantInfo();
});

window.onbeforeunload = function () {
	openVidu.close();
};

function generateParticipantInfo() {
	document.getElementById("sessionId").value = "SessionA";
	document.getElementById("participantId").value = "Participant" + Math.floor(Math.random() * 100);
}

function addVideoTag(stream) {

	var elementId = "video-" + stream.getId();
	var div = document.createElement('div');
	div.setAttribute("id", elementId);
	document.getElementById("participants").appendChild(div);

	stream.playThumbnail(elementId);
}

function removeVideoTag(stream) {

	var elementId = "video-" + stream.getId();
	var element = document.getElementById(elementId);
	if (element) {
		element.parentNode.removeChild(element);
	}
}

function joinSession() {

	openVidu = new OpenVidu("wss://127.0.0.1:8443/");

	openVidu.connect(function (error, openVidu) {

		if (error)
			return console.log(error);

		var camera = openVidu.getCamera();

		camera.requestCameraAccess(function (error, camera) {

			if (error)
				return console.log(error);

      var sessionId = document.getElementById("sessionId").value;
      var participantId = document.getElementById("participantId").value;

			var sessionOptions = {
				sessionId: sessionId,
				participantId: participantId
			}

			openVidu.joinSession(sessionOptions, function (error, session) {

				if (error)
					return console.log(error);

				document.getElementById('session-header').innerText = sessionId;
				document.getElementById('join').style.display = 'none';
				document.getElementById('session').style.display = 'block';

				addVideoTag(camera);

				camera.publish();

				session.addEventListener("stream-added", function (streamEvent) {
					addVideoTag(streamEvent.stream);
				});

				session.addEventListener("stream-removed", function (streamEvent) {
					removeVideoTag(streamEvent.stream);
				});

			});
		});
	});

  return false;
}

function leaveSession() {

	document.getElementById('join').style.display = 'block';
	document.getElementById('session').style.display = 'none';

	openVidu.close();
}


