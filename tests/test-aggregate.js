var assert = require('assert');
var insert = require('./insert');

insert([{
	t: 242424,
	g: 1,
	online: 1
}, {
	t: 4244,
	g: 1,
	online: 0
},
{
	t: 242425,
	g: 2,
	online: 1
}, {
	t: 4245,
	g: 2,
	online: 1
}], function(db, done) {
	db.a.aggregate({
        $group : {
            _id : '$g',
            total : {
                $sum : '$online'
            }
        }
    }, function(err, totals) {
    console.log(totals);
		assert.ok(!err);
		assert.equal(JSON.stringify(totals), JSON.stringify([{_id: 2, total: 2}, {_id: 1, total: 1}]));
		done();
	});
});
