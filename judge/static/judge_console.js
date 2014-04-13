function updateCommsStatus(status) {
	heading = $('#config-heading');
	heading.removeClass("btn-info");
	heading.removeClass("btn-warning");
	heading.removeClass("btn-danger");
	heading.removeClass("btn-success");
	status_span = $('#config-status');
	status_span.removeClass("label-info");
	status_span.removeClass("label-warning");
	status_span.removeClass("label-danger");
	status_span.removeClass("label-success");
	switch(status) {
		case "COMMS_UP":
			heading.addClass("btn-success")
			status_span.addClass("label-success");
			status_span.text("Connected to Server");
			break;
		case "COMMS_DOWN":
			heading.addClass("btn-warning")
			status_span.addClass("label-warning");
			status_span.text("LCM Communications Offline...")
			break;
		case "INFO_FAILED":
			heading.addClass("btn-danger")
			status_span.addClass("label-danger");
			status_span.text("Can't Connect to Flask Server...")
			break;
		default:
			heading.addClass("btn-danger")
			status_span.addClass("label-danger");
			status_span.text("Unknown Error")
	}
}

function updateGameClock(data) {
	mode = data['stage_name'];
	stage_time = data['stage_time'];
	total_stage_time = data['total_stage_time'];
	// convert input "gametime" into 
	time = total_stage_time - stage_time;

	minutes = Math.floor(time / 60);
	seconds = Math.floor(time % 60);
	disp_seconds = Math.ceil(time % 60);

	if (disp_seconds < 10) {
		hr_seconds = "0" + String(disp_seconds);
	} else {
		hr_seconds = String(disp_seconds);
	}
	hr_time = String(minutes) + ":" + hr_seconds;
	game_clock = $('#game-clock');
	game_clock.text(hr_time);

	clock_bar = $('#clock-bar');
	clock_bar.css("width", String(time / total_stage_time * 100) + "%");
	clock_bar.removeClass("progress-bar-info");
	clock_bar.removeClass("progress-bar-warning");
	clock_bar.removeClass("progress-bar-danger");
	if (time > 30) {
	} else if (time <= 10) {
		clock_bar.addClass("progress-bar-danger");
	} else if (time <= 30) {
		clock_bar.addClass("progress-bar-warning");
	}

	game_mode_div = $('#game-mode');
	switch (mode) {
		case "Setup":
			game_mode_div.text("Setup");
			clock_bar.css("width", "100%");
			break;
		case "Teleop":
			game_mode_div.text("Teleoperated Mode");
			break;
		case "Autonomous":
			game_mode_div.text("Autonomous Mode");
			break;
		case "Paused":
			game_mode_div.text("Match Paused");
			break;
		case "End":
			game_mode_div.text("Match Ended");
			break;
		default:
			game_mode_div.text("Unknown Mode");
			break;
	}
}

function updateScore(data) {
	// update the team names
	team_numbers = data['team_numbers'];
	team_names = data['team_names'];
	var team_strings = new Array();
	for (var i = 0; i < 4; i++) {
		team_strings[i] = String(team_numbers[i]) + " " + team_names[i];
		$('#team' + String(i)).text(team_strings[i]);
	}


	// update the scores
	blue_scores = data['blue_points'];
	gold_scores = data['gold_points'];
	$('#blue-total-score').text(blue_scores[0]);
	$('#gold-total-score').text(gold_scores[0]);
	$('#blue-normal-points').text(blue_scores[1]);
	$('#gold-normal-points').text(gold_scores[1]);
	$('#blue-permanent-points').text(blue_scores[2]);
	$('#gold-permanent-points').text(gold_scores[2]);
	$('#blue-penalties').text(-blue_scores[3]);
	$('#gold-penalties').text(-gold_scores[3]);

}

function updateHeartbeat(data) {
	hb = $('#heartbeat');
	if (data['stored_a']) {
		hb.addClass('btn-info');
	} else {
		hb.removeClass('btn-info');
	}
}

function processInfo(data) {
	updateCommsStatus(data['comms_status']);
	updateGameClock(data);
	updateScore(data);
	updateHeartbeat(data);
}

function failedToGetInfo() {
	updateCommsStatus("INFO_FAILED");
}
		
function updateInterface() {
	// set wall clock
	time = new Date().toLocaleTimeString();
	$('#wall-clock').text(time);

	$.get('/api/v1/all-info', {}, processInfo).fail(failedToGetInfo);
}

function submitAdjustment(e) {
	e.preventDefault();
	$.post('/api/v1/score-delta', $(this).serialize());
	$('#adjust-form')[0].reset();
}

$( document ).ready(function($) {
	window.setInterval(updateInterface, 40);
	$('#heartbeat').tooltip({title: "Press the guide button", placement: 'bottom'});
	$('form').submit(submitAdjustment);
});