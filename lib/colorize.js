/*
	Terminal coloring for Node.js
	The syntax looks like this:
	
		This word is #red[red].
	
	You can do nesting and all kinds of fun things.
	
		For when #bold[you #blink[really]] want to make a point.
	
	You can transform a string using .ansify(str), or use
	the modified version of console to output colored strings
	automatically.
*/

exports.console = {
	_forward: function(method, args){
		args = Array.prototype.slice.call(args);
		
		// process the first argument for tags
		if (args.length > 0)
			args[0] = exports.ansify(args[0]);

		// route it to the console
		method.apply(console, args);
	},
	log: function(){
		this._forward(console.log, arguments);
	},
	info: function(){
		this._forward(console.info, arguments);
	},
	warn: function(){
		this._forward(console.warn, arguments);
	},
	error: function(){
		this._forward(console.error, arguments);
	}
};

exports.enabled = true;

exports.ansicodes = {
	'reset': '\033[0m',
	'bold': '\033[1m',
	'italic': '\033[3m',
	'underline': '\033[4m',
	'blink': '\033[5m',
	'black': '\033[30m',
	'red': '\033[31m',
	'green': '\033[32m',
	'yellow': '\033[33m',
	'blue': '\033[34m',
	'magenta': '\033[35m',
	'cyan': '\033[36m',
	'white': '\033[37m',
};

exports.ansify = function(str){
	console.log("Forked!")

	var tag = /\[([^\]]+)\](.+)\[\/([\w]+)\]/;
	var cstack = [];
	
	while (tag.test(str))
	{
		var matches = tag.exec(str),
			orig 	= matches[0],
			color   = matches[1],
			newstr 	= matches[2];
		
		if((color = this.ansicodes[color]) == null) continue;

		console.log(matches, orig);
		str = str.replace(orig, this.ansicodes.reset + color + newstr);
	}
	return str;
};

/*
var c = require("colorize")
	c.ansify("aaa [blue][bold][blue][bold] 1231 text[/blue] [red][123123][/red]")
*/
