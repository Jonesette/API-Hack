$(document).ready(function() {
	getTeams();
});

var getTeams = function() {
	$("#teamSelection").html("Loading...");
	$.ajax({
		url: "http://api.espn.com/v1/sports/baseball/mlb/teams?apikey=6xczn8m4pu3se2vj62r9jace",	
		dataType: "jsonp",
		type: 'GET',
		complete: function() {
			$("#teamSelection").html("Select a Team...");
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		},
		success: function(result) {
			$.each(result.sports.leagues.teams, function(i,item) {
				$("#teams").append("<option class=\"team\">"+item.name+"</option>");
			});
		}
	});
};	







