import Ember from 'ember';
import Cell from '../models/cell';

var GameMap = Ember.Object.extend({
  rows: []
});

var MapRow = Ember.Object.extend({
  cells: []
});



export default Ember.Controller.extend({
	bombs: 10,
	bombTotal: 10,
	mapWidth: 10,
  mapHeight: 10,
	won: false,
	youLoose: false,


  map: Ember.computed('mapWidth', 'mapHeight', function() {
   var w = this.get('mapWidth');
   var h = this.get('mapHeight');
   return GameMap.create({rows: buildMapRows(w, h)});
  }),

	actions: {
		cleared: function(cell){
			if(cell.hasBomb){
				//this.set('youLoose', true);
				cell.set('text', 'B');
				alert('YOU LOOSE! HIT OK TO RESTART....');

			}else{
				cell.set('cleared', true);
			}
		},

		reset: function(){
			this.set('bombCount', 10);
			var map = GameMap.create({rows: buildMapRows(10, 10)});
			this.set('map', map);
		}
	}
});

var addBombs = function(rows, bombCount){
	let i = 0;
	while(i < bombCount){
		var x = Math.floor(Math.random() * 10);
		var y = Math.floor(Math.random() * 10);

		if(rows[x].cells[y].get('hasBomb')){
			//skip already a bomb here!!!!
		}else{
			rows[x].cells[y].set('hasBomb', true);
			i++;
		}
	}
	return rows;
};

var addNeighbors = function(rows){

	for (let x = 0; x < 10; x++) {
		for (let y = 0; y < 10; y++) {
			let cell = rows[x].cells[y]; //cell that you are computing neighbores for.

			for (let i = x-1; i <= x+1; i++) {
				for (let j = y-1; j <= y+1; j++) {
					if ( !(i === x && j === y) && (i >= 0 && i < 10) && (j >= 0 && j < 10)) {
						cell.get('neighbors').push(rows[i].cells[j]);
					}
				}//end j
			}//end i

		}//end y
	}//end x
	return rows;
};
var buildMapRows = function(width, height){
	var rows  = [];
	for(let x = 0; x < width; x++){
		var cells = [];
		for(let y = 0; y < height; y++){
			var cell = Cell.create({
					hasBomb: false,
					cleared: false,
					x: x,
					y: y,
			});
			cells.push(cell);
		}
		var row = MapRow.create({cells: cells});
		rows.push(row);
	}
	rows = addBombs(rows, 10);
	//rows = addNeighbors(rows);
	return rows;
};
