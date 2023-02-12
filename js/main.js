let leagues = { italian: '', french: '', english: '', spanish: '', german: '' };
let country_names = { italian: 'italy', french: 'france', english: 'england', spanish: 'spain', german: 'germany' };
let league_title = document.querySelector('#league-title');
let league_select = document.querySelector('#league-select');
let league_standings_table = document.querySelector('#league-standings-table');
let table_body = document.createElement('tbody');
league_standings_table.appendChild(table_body);

window.onload = function () {
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            const obj = JSON.parse(this.responseText);
            set_leagues(
                obj.Ccg[2].Stages[0].Scd,
                obj.Ccg[4].Stages[0].Scd,
                obj.Ccg[0].Stages[0].Scd,
                obj.Ccg[1].Stages[0].Scd,
                obj.Ccg[3].Stages[0].Scd,
            );

            league_title.innerHTML = leagues.italian.replaceAll('-', ' ');
            league_table(country_names.italian, leagues.italian);
        }
    });

    xhr.open("GET", "https://livescore6.p.rapidapi.com/leagues/v2/list?Category=soccer");
    xhr.setRequestHeader("X-RapidAPI-Key", "041b815a3bmsh1292e6c3b71a345p1a763ejsn8845c36e7e18");
    xhr.setRequestHeader("X-RapidAPI-Host", "livescore6.p.rapidapi.com");

    xhr.send(data);
}

// Set Leagues
function set_leagues(italy, france, england, spain, germany) {
    leagues.italian = italy;
    leagues.french = france;
    leagues.english = england;
    leagues.spanish = spain;
    leagues.german = germany;
    return leagues;
}

// Select League
league_select.addEventListener('change', function () {
    switch (league_select.value) {
        case '0':
            league_title.innerHTML = leagues.italian.replaceAll('-', ' ');
            league_table(country_names.italian, leagues.italian);
            break;
        case '1':
            league_title.innerHTML = leagues.french.replaceAll('-', ' ');
            league_table(country_names.french, leagues.french);
            break;
        case '2':
            league_title.innerHTML = leagues.english.replaceAll('-', ' ');
            league_table(country_names.english, leagues.english);
            break;
        case '3':
            league_title.innerHTML = leagues.spanish.replaceAll('-', ' ');
            league_table(country_names.spanish, leagues.spanish);
            break;
        case '4':
            league_title.innerHTML = leagues.german.replaceAll('-', ' ');
            league_table(country_names.german, leagues.german);
            break;
        default:
            league_title.innerHTML = leagues.italian.replaceAll('-', ' ');
            league_table(country_names.italian, leagues.italian);
    }
});

// League Table
function league_table(ccd, scd) {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            const obj = JSON.parse(this.responseText);
            let teams_count = obj.LeagueTable.L[0].Tables[0].team.length;
            removeAllChildNodes(table_body)
            for (let i = 1; i < teams_count + 1; i++) {
                
                let table_row = document.createElement('tr');
                let team_rank = document.createElement('td');
                let team_name = document.createElement('td');
                let mp = document.createElement('td');
                let win = document.createElement('td');
                let draw = document.createElement('td');
                let lose = document.createElement('td');
                let gf = document.createElement('td');
                let ga = document.createElement('td');
                let gd = document.createElement('td');
                let pts = document.createElement('td');
                


                team_rank.innerHTML = obj.LeagueTable.L[0].Tables[0].team[i - 1].rnk;
                team_name.innerHTML = obj.LeagueTable.L[0].Tables[0].team[i - 1].Tnm;
                mp.innerHTML = obj.LeagueTable.L[0].Tables[0].team[i - 1].pld;
                win.innerHTML = obj.LeagueTable.L[0].Tables[0].team[i - 1].win;
                draw.innerHTML = obj.LeagueTable.L[0].Tables[0].team[i - 1].drw;
                lose.innerHTML = obj.LeagueTable.L[0].Tables[0].team[i - 1].lst;
                gf.innerHTML = obj.LeagueTable.L[0].Tables[0].team[i - 1].gf;
                ga.innerHTML = obj.LeagueTable.L[0].Tables[0].team[i - 1].ga;
                gd.innerHTML = obj.LeagueTable.L[0].Tables[0].team[i - 1].gd;
                pts.innerHTML = obj.LeagueTable.L[0].Tables[0].team[i - 1].pts;

                table_row.appendChild(team_rank);
                table_row.appendChild(team_name);
                table_row.appendChild(mp);
                table_row.appendChild(win);
                table_row.appendChild(draw);
                table_row.appendChild(lose);
                table_row.appendChild(gf);
                table_row.appendChild(ga);
                table_row.appendChild(gd);
                table_row.appendChild(pts);
                table_body.appendChild(table_row);
                league_standings_table.appendChild(table_body);
            }
        }
    });

    xhr.open("GET", `https://livescore6.p.rapidapi.com/leagues/v2/get-table?Category=soccer&Ccd=${ccd}&Scd=${scd}`);
    xhr.setRequestHeader("X-RapidAPI-Key", "041b815a3bmsh1292e6c3b71a345p1a763ejsn8845c36e7e18");
    xhr.setRequestHeader("X-RapidAPI-Host", "livescore6.p.rapidapi.com");

    xhr.send(data);
}

// Reset Table
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}