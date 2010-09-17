function pie(data, canvas) {  
  var w = 300,
      h = 300,
      r = w / 2,
      a = pv.Scale.linear(0, pv.sum(data)).range(0, 2 * Math.PI);
  var vis = new pv.Panel()
      .canvas(canvas || 'pie')
      .width(w)
      .height(w);
  vis.add(pv.Wedge)
      .data(data.sort(pv.reverseOrder))
      .bottom(w / 2)
      .left(w / 2)

      .innerRadius(r - 40)
      .outerRadius(r)
      .angle(a)
      .event("mouseover", function() this.innerRadius(0))
      .event("mouseout", function() this.innerRadius(r - 40))
    .anchor("center").add(pv.Label)
      .visible(function(d) d > .15)
      .textAngle(0)
      .text(function(d) d.toFixed(2));
  vis.render();
};

function bar(data, canvas, labels) {
  /* Sizing and scales. */
  var w = 500,
      h = 250,
      x = pv.Scale.linear(0, 200).range(0, w),
      y = pv.Scale.ordinal(pv.range(data.length)).splitBanded(0, h, 4/5);

  /* The root panel. */
  var vis = new pv.Panel()
      .canvas(canvas || 'bar')
      .width(w)
      .height(h)
      .bottom(20)
      .left(50)
      .right(10)
      .top(5);

  /* The bars. */
  var bar = vis.add(pv.Bar)
      .data(data)
      .top(function() y(this.index))
      .height(y.range().band)
      .left(0)
      .width(x);

  /* The value label. */
  bar.anchor("right").add(pv.Label)
      .textStyle("white")
      .text(function(d) d.toFixed(1));

  /* The variable label. */
  bar.anchor("left").add(pv.Label)
      .textMargin(5)
      .textAlign("right")
      .text(function() labels[this.index]);

  /* X-axis ticks. */
  vis.add(pv.Rule)
      .data(x.ticks(5))
      .left(x)
      .strokeStyle(function(d) d ? "rgba(255,255,255,.3)" : "#000")
    .add(pv.Rule)
      .bottom(0)
      .height(5)
      .strokeStyle("#000")
    .anchor("bottom").add(pv.Label)
      .text(x.tickFormat);

  vis.render();
}

function area(data, canvas) {
	/* Sizing and scales. */
	var y_max = 10 * (Math.round(data[data.length - 1].y /10) + 2 );
	
	var w = 400,
	    h = 200,
	    x = pv.Scale.linear(data, function(d) d.x).range(0, w),
	    y = pv.Scale.linear(0, y_max).range(0, h);

	/* The root panel. */
	var vis = new pv.Panel()
    	.canvas(canvas || 'area')
	    .width(w)
	    .height(h)
	    .bottom(20)
	    .left(20)
	    .right(10)
	    .top(5);

	/* Y-axis and ticks. */
	vis.add(pv.Rule)
	    .data(y.ticks(5))
	    .bottom(y)
	    .strokeStyle(function(d) d ? "#eee" : "#000")
	  .anchor("left").add(pv.Label)
	    .text(y.tickFormat);

	/* X-axis and ticks. */
	vis.add(pv.Rule)
	    .data(x.ticks())
	    .visible(function(d) d)
	    .left(x)
	    .bottom(-5)
	    .height(5)
	  .anchor("bottom").add(pv.Label)
	    .text(x.tickFormat);

	/* The area with top line. */
	vis.add(pv.Area)
	    .data(data)
	    .bottom(1)
	    .left(function(d) x(d.x))
	    .height(function(d) y(d.y))
	    .fillStyle("rgb(121,173,210)")
	  .anchor("top").add(pv.Line)
	    .lineWidth(3);

	vis.render();
}