// Directory
var directory = {
    
        LineN : ["N-Time Square", "N-34th Street", "N-28th Street", "N-23rd Street", "N-Union Square", "N-8th Avenue"],
        LineL : ["L-8th Avenue", "L-6th Avenue","L-Union Square", "L-3rd Avenue","L-1st Avenue"],
        Line6 : ["6-Grand Central", "6-33rd Street", "6-28th Street", "6-23rd Street", "6-Union Square", "6-Astor Place"]
}

// Setting parameters - move this to below the model when done
var start_station = prompt("Which station do you start at?")
var end_station = prompt("Which station do you end at?")
var start_line = ("Line" + start_station[0])
var end_line = ("Line" + end_station[0])
var start_index = directory[start_line].indexOf(start_station)
var end_index = directory[end_line].indexOf(end_station)
var union_square_index = directory[start_line].indexOf(start_station[0] + start_station[1] + "Union Square")
var union_square_end_index = directory[end_line].indexOf(end_station[0] + end_station[1] + "Union Square")


// Calculating trip details (model)
var tripCalc = {
    same_station : function(start_station, end_station) {
        if (start_station === end_station){
            return true;
        } else if (start_station.indexOf("Union Square")=== 5 && end_station.indexOf("Union Square") === 5) {
            return true;
        }
    },

    same_line : function(start_index, end_index, start_line) {
        if (start_index > end_index) {
            var stations = directory[start_line].slice([end_index],[start_index + 1]).reverse();
        } else {
            var stations = directory[start_line].slice([start_index],[end_index + 1]);
        }
        return stations
    },

    first_leg : function(start_index, union_square_index) {
        if (start_index > union_square_index) {
            var stations = directory[start_line].slice([union_square_index], [start_index + 1]).reverse()
        } else {
            var stations = directory[start_line].slice([
                start_index], [union_square_index + 1])
        }
        return stations
    },

    last_leg : function(end_index, union_square_end_index) {
        if (end_index > union_square_end_index) {
            var stations = directory[end_line].slice([union_square_end_index + 1], [end_index + 1])
        } else {
            var stations = directory[end_line].slice([end_index], [union_square_end_index]).reverse()
        }
        return stations
    },

    stations_travelled : function(start_line, end_line) {
        var leg_one = []
        var leg_two = []

        if (this.same_station(start_station, end_station)  === true) {
            console.log("You have already arrived at your destination")
        } else if (start_line === end_line) {
            leg_one.push(this.same_line(start_index, end_index, start_line))
            return leg_one.join(', ')
        } else {
            leg_one.push(this.first_leg(start_index, union_square_index))
            leg_two.push(this.last_leg(end_index, union_square_end_index))
            return leg_one.concat(leg_two).join(', ')
        }
    }





























}

// Trip controller (controller)