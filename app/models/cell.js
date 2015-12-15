import Ember from 'ember';

export default Ember.Object.extend({
	x: 0,
	y: 0,
	hasBomb: false,
	cleared: false,
	text: Ember.computed('cleared', 'count', function() {
		if (this.get('cleared') ) {
			return this.get('count');
		} else {
			return " ";
		}
	}),
	neighbors: [],
	count: Ember.computed('neighbors', function() {
		let count = 0;

		for (var x = 0; x < this.get('neighbors').length; x++) {
			if (this.get('neighbors')[x].get('hasBomb')) {
				count++;
			}
		}
		return count;
	})
});