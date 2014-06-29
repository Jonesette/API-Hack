$(document).ready(function() {
	getTeams();

	$("#teams").change(function() {
		$("#teamInfo").html('');
		selectedTeam = this.value;
		teamNumber = +selectedTeam.replace(/[^0-9]/g, '');
		//console.log(selectedTeam);
		//console.log(teamNumber);
		getInfo();
		
	});

	$("#submit").click(function() {
		$("#results").append("<tr><td class=\"result\">"+name+"</td><td class=\"result\">"+teamLocation+"</td><td class=\"result\">"+abbreviation+"</td></tr>");
	});
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
			$.each(result.sports, function(i, sport) {
				$.each(sport.leagues, function(i, league) {
					$.each(league.teams, function(i, item) {
						$("#teams").append("<option class=\"team\">"+item.id+". "+item.location+ " " +item.name+"</option>");
					});
				});
			});
		}
	});
};	

var getInfo = function() {
	$.ajax({
		url: "http://api.espn.com/v1/sports/baseball/mlb/teams/"+teamNumber+"?apikey=6xczn8m4pu3se2vj62r9jace",	
		dataType: "jsonp",
		type: 'GET',
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		},
		success: function(teamResult) {
			$.each(teamResult.sports, function(i, sport) {
				$.each(sport.leagues, function(i, league) {
					$.each(league.teams, function(i, item) {
						name = item.name;
						teamLocation = item.location;
						abbreviation = item.abbreviation;
						teamColor = item.color;
						$("#teamInfo").append("<p>Name: "+name+"</p><p>Location: "+teamLocation+"</p><p>Abbreviation: "+abbreviation+"</p>");					
					});
				});
			});
		}
	});
};	









