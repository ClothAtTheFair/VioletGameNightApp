const violet = require('violet').script();

var model = {
    pastGameNights: [],
    futureGameNights: []
}

var app = {
    getPastGameNights: (response) => {
        var results = model.pastGameNights;
        if(results.length == 0) {
            response.say('Sorry, I did not have anything scheduled');
        } else {
            var dt = results[0].startTime;
            response.say(`I had a game night scheduled
                on ${utils.getDayAndMonth(dt)}
                at ${utils.getTime(dt)}
                where ${results[0].game} was played`);
        }
    },
    getUpcomingGameNights: (response) => {
        var results = model.futureGameNights;
        if(results.length == 0) {
            response.say('Sorry, I did not have anything scheduled');
        } else {
            var dt = results[0].startTime;
            response.say(`I had a game night scheduled
                on ${utils.getDayAndMonth(dt)}
                at ${utils.getTime(dt)}
                to play ${results[0].game}`);
        }
    }
}

violet.addFlowScript(`
<app>
    <choice id = "launch">
        <expecting>What can you do?</expecting>
        <say>I can help you with planning Game Nights</say>
    </choice>

    <choice id = "list">
        <expecting>What game nights have already been planned?</expecting>
        <say>Let me see.</say>
        <decision>
            <ask>Would you like to hear of game nights that are upcoming or in the past?</ask>
            <choice>
                <expecting>In the past.</expecting>
                <resolve value =" app.getPastGameNights(response)"/>
            </choice>
            <choice>
                <expecting>Upcoming.</expecting>
                <resolve value="app.getUpcomingGameNights(response)"/>
            </choice>
        </decision>
    </choice>

    <choice id = "end">
        <expecting>Thanks for helping</expecting>
        <say>My pleasure!</say>
    </choice>


</app>`, {app});