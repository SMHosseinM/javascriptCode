/*! lil-uuid - v0.1 - MIT License - https://github.com/lil-js/uuid */
(function(e, i) {
	if (typeof define === 'function' && define.amd) {
		define([ 'exports' ], i);
	} else if (typeof exports === 'object') {
		i(exports);
		if (typeof module === 'object' && module !== null) {
			module.exports = exports.uuid;
		}
	} else {
		i((e.lil = e.lil || {}));
	}
})(this, function(e) {
	var i = '0.1.0';
	var t = {
		3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
		4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
		5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
		all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
	};
	function A() {
		var e = '',
			i,
			t;
		for (i = 0; i < 32; i++) {
			t = (Math.random() * 16) | 0;
			if (i === 8 || i === 12 || i === 16 || i === 20) e += '-';
			e += (i === 12 ? 4 : i === 16 ? (t & 3) | 8 : t).toString(16);
		}
		return e;
	}
	function o(e, i) {
		var A = t[i || 'all'];
		return (A && A.test(e)) || false;
	}
	A.isUUID = o;
	A.VERSION = i;
	e.uuid = A;
	e.isUUID = o;
});
//# sourceMappingURL=uuid.min.js.map
