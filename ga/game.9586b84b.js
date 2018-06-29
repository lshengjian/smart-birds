parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({6:[function(require,module,exports) {
module.exports="/smart-birds/ga/bird.7a10f1b2.png";
},{}],8:[function(require,module,exports) {
module.exports="/smart-birds/ga/background.15aab603.png";
},{}],10:[function(require,module,exports) {
module.exports="/smart-birds/ga/pipetop.94361ab1.png";
},{}],14:[function(require,module,exports) {
module.exports="/smart-birds/ga/pipebottom.619e2fe6.png";
},{}],12:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var n=exports.Neuroevolution=function(n){var e=this;e.options={activation:function(n){var e=-n/1;return 1/(1+Math.exp(e))},randomClamped:function(){return 2*Math.random()-1},network:[1,[1],1],population:50,elitism:.2,randomBehaviour:.2,mutationRate:.1,mutationRange:.5,historic:0,lowHistoric:!1,scoreSort:-1,nbChild:1},e.set=function(n){for(var t in n)null!=this.options[t]&&(e.options[t]=n[t])},e.set(n);var t=function(){this.value=0,this.weights=[]};t.prototype.populate=function(n){this.weights=[];for(var t=0;t<n;t++)this.weights.push(e.options.randomClamped())};var o=function(n){this.id=n||0,this.neurons=[]};o.prototype.populate=function(n,e){this.neurons=[];for(var o=0;o<n;o++){var r=new t;r.populate(e),this.neurons.push(r)}};var r=function(){this.layers=[]};r.prototype.perceptronGeneration=function(n,e,t){var r=0,s=0,i=new o(r);for(var a in i.populate(n,s),s=n,this.layers.push(i),r++,e){(i=new o(r)).populate(e[a],s),s=e[a],this.layers.push(i),r++}(i=new o(r)).populate(t,s),this.layers.push(i)},r.prototype.getSave=function(){var n={neurons:[],weights:[]};for(var e in this.layers)for(var t in n.neurons.push(this.layers[e].neurons.length),this.layers[e].neurons)for(var o in this.layers[e].neurons[t].weights)n.weights.push(this.layers[e].neurons[t].weights[o]);return n},r.prototype.setSave=function(n){var e=0,t=0,r=0;for(var s in this.layers=[],n.neurons){var i=new o(t);for(var a in i.populate(n.neurons[s],e),i.neurons)for(var h in i.neurons[a].weights)i.neurons[a].weights[h]=n.weights[r],r++;e=n.neurons[s],t++,this.layers.push(i)}},r.prototype.compute=function(n){for(var t in n)this.layers[0]&&this.layers[0].neurons[t]&&(this.layers[0].neurons[t].value=n[t]);var o=this.layers[0];for(t=1;t<this.layers.length;t++){for(var r in this.layers[t].neurons){var s=0;for(var i in o.neurons)s+=o.neurons[i].value*this.layers[t].neurons[r].weights[i];this.layers[t].neurons[r].value=e.options.activation(s)}o=this.layers[t]}var a=[],h=this.layers[this.layers.length-1];for(var t in h.neurons)a.push(h.neurons[t].value);return a};var s=function(n,e){this.score=n||0,this.network=e||null},i=function(){this.genomes=[]};i.prototype.addGenome=function(n){for(var t=0;t<this.genomes.length;t++)if(e.options.scoreSort<0){if(n.score>this.genomes[t].score)break}else if(n.score<this.genomes[t].score)break;this.genomes.splice(t,0,n)},i.prototype.breed=function(n,t,o){for(var r=[],s=0;s<o;s++){var i=JSON.parse(JSON.stringify(n));for(var a in t.network.weights)Math.random()<=.5&&(i.network.weights[a]=t.network.weights[a]);for(var a in i.network.weights)Math.random()<=e.options.mutationRate&&(i.network.weights[a]+=Math.random()*e.options.mutationRange*2-e.options.mutationRange);r.push(i)}return r},i.prototype.generateNextGeneration=function(){for(var n=[],t=0;t<Math.round(e.options.elitism*e.options.population);t++)n.length<e.options.population&&n.push(JSON.parse(JSON.stringify(this.genomes[t].network)));for(t=0;t<Math.round(e.options.randomBehaviour*e.options.population);t++){var o=JSON.parse(JSON.stringify(this.genomes[0].network));for(var r in o.weights)o.weights[r]=e.options.randomClamped();n.length<e.options.population&&n.push(o)}for(var s=0;;){for(t=0;t<s;t++){var i=this.breed(this.genomes[t],this.genomes[s],e.options.nbChild>0?e.options.nbChild:1);for(var a in i)if(n.push(i[a].network),n.length>=e.options.population)return n}++s>=this.genomes.length-1&&(s=0)}};var a=function(){this.generations=[];new i};a.prototype.firstGeneration=function(n,t,o){for(var s=[],a=0;a<e.options.population;a++){var h=new r;h.perceptronGeneration(e.options.network[0],e.options.network[1],e.options.network[2]),s.push(h.getSave())}return this.generations.push(new i),s},a.prototype.nextGeneration=function(){if(0==this.generations.length)return!1;var n=this.generations[this.generations.length-1].generateNextGeneration();return this.generations.push(new i),n},a.prototype.addGenome=function(n){return 0!=this.generations.length&&this.generations[this.generations.length-1].addGenome(n)},e.generations=new a,e.restart=function(){e.generations=new a},e.nextGeneration=function(){var n=[];n=0==e.generations.generations.length?e.generations.firstGeneration():e.generations.nextGeneration();var t=[];for(var o in n){var s=new r;s.setSave(n[o]),t.push(s)}if(e.options.lowHistoric&&e.generations.generations.length>=2){var i=e.generations.generations[e.generations.generations.length-2].genomes;for(var o in i)delete i[o].network}return-1!=e.options.historic&&e.generations.generations.length>e.options.historic+1&&e.generations.generations.splice(0,e.generations.generations.length-(e.options.historic+1)),t},e.networkScore=function(n,t){e.generations.addGenome(new s(t,n.getSave()))}};
},{}],16:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={NETWORK:{hideNodes:2},SCREEN:{height:512,width:576},BIRD:{width:40,height:30,x:80,y:250,alive:!0,gravity:.3,velocity:0,jump:-6},HOLE:{width:50,height:100,speed:3}};
},{}],4:[function(require,module,exports) {
"use strict";var t=require("./img/bird.png"),i=c(t),s=require("./img/background.png"),e=c(s),h=require("./img/pipetop.png"),r=c(h),n=require("./img/pipebottom.png"),o=c(n),a=require("./Neuroevolution"),p=require("./config"),d=c(p);function c(t){return t&&t.__esModule?t:{default:t}}!function(){var t=[],i="zero-timeout-message";window.addEventListener("message",function(s){s.source==window&&s.data==i&&(s.stopPropagation(),t.length>0&&t.shift()())},!0),window.setZeroTimeout=function(s){t.push(s),window.postMessage(i,"*")}}();var u=void 0,g=void 0,l=60,f=0,v={},x=function(t){l=parseInt(t)},w=function(t){var i=t.target.id;l=parseInt(i.split("s")[1])},y=function(t,i){var s=0,e=0,h={};for(var r in t)s++,h[r]=new Image,h[r].src=t[r],h[r].onload=function(){++e==s&&i(h)}},b=function(t){this.x=80,this.y=250,this.width=40,this.height=30,this.alive=!0,this.gravity=0,this.velocity=.3,this.jump=-6,this.init(t)};b.prototype.init=function(t){for(var i in t)this[i]=t[i]},b.prototype.flap=function(){this.gravity=this.jump},b.prototype.update=function(){this.gravity+=this.velocity,this.y+=this.gravity},b.prototype.isDead=function(t,i){if(this.y>=t||this.y+this.height<=0)return!0;for(var s in i)if(!(this.x>i[s].x+i[s].width||this.x+this.width<i[s].x||this.y>i[s].y+i[s].height||this.y+this.height<i[s].y))return!0};var m=function(t){this.x=0,this.y=0,this.width=50,this.height=40,this.speed=3,this.init(t)};m.prototype.init=function(t){for(var i in t)this[i]=t[i]},m.prototype.update=function(){this.x-=this.speed},m.prototype.isOut=function(){if(this.x+this.width<0)return!0};var k=function(){this.pipes=[],this.birds=[],this.score=0,this.canvas=document.querySelector("#flappy"),this.ctx=this.canvas.getContext("2d"),this.width=this.canvas.width=d.default.SCREEN.width,this.height=this.canvas.height=d.default.SCREEN.height,this.spawnInterval=90,this.interval=0,this.gen=[],this.alives=0,this.generation=0,this.backgroundSpeed=.5,this.backgroundx=0,this.maxScore=0,document.getElementById("s0").onclick=w,document.getElementById("s60").onclick=w,document.getElementById("s120").onclick=w,document.getElementById("s180").onclick=w,document.getElementById("s300").onclick=w};k.prototype.start=function(){for(var t in this.interval=0,this.score=0,this.pipes=[],this.birds=[],this.gen=u.nextGeneration(),this.gen){var i=new b;this.birds.push(i)}this.generation++,this.alives=this.birds.length},k.prototype.update=function(){this.backgroundx+=this.backgroundSpeed;var t=0,i=0;if(this.birds.length>0)for(var s=0;s<this.pipes.length;s+=2)if(this.pipes[s].x+this.pipes[s].width>this.birds[0].x){t=this.pipes[s].height/this.height,i=this.pipes[s].x;break}for(var e in this.birds)if(this.birds[e].alive){i=(i-this.birds[e].x)/this.width;var h=[t-this.birds[e].y/this.height,i];this.gen[e].compute(h)>.5&&this.birds[e].flap(),this.birds[e].update(),this.birds[e].isDead(this.height,this.pipes)&&(this.birds[e].alive=!1,this.alives--,u.networkScore(this.gen[e],this.score),this.isItEnd()&&this.start())}for(var r=0;r<this.pipes.length;r++)this.pipes[r].update(),this.pipes[r].isOut()&&(this.pipes.splice(r,1),r--);if(0==this.interval){var n=Math.round(Math.random()*(this.height-100-120))+50;this.pipes.push(new m({x:this.width,y:0,height:n})),this.pipes.push(new m({x:this.width,y:n+120,height:this.height}))}this.interval++,this.interval==this.spawnInterval&&(this.interval=0),this.score++,this.maxScore=this.score>this.maxScore?this.score:this.maxScore;var o=this;0==l?setZeroTimeout(function(){o.update()}):setTimeout(function(){o.update()},1e3/l)},k.prototype.isItEnd=function(){for(var t in this.birds)if(this.birds[t].alive)return!1;return!0},k.prototype.display=function(){this.ctx.clearRect(0,0,this.width,this.height);for(var t=0;t<Math.ceil(this.width/v.background.width)+1;t++)this.ctx.drawImage(v.background,t*v.background.width-Math.floor(this.backgroundx%v.background.width),0);for(var i in this.pipes)i%2==0?this.ctx.drawImage(v.pipetop,this.pipes[i].x,this.pipes[i].y+this.pipes[i].height-v.pipetop.height,this.pipes[i].width,v.pipetop.height):this.ctx.drawImage(v.pipebottom,this.pipes[i].x,this.pipes[i].y,this.pipes[i].width,v.pipetop.height);for(var s in this.ctx.fillStyle="#FFC600",this.ctx.strokeStyle="#CE9E00",this.birds)this.birds[s].alive&&(this.ctx.save(),this.ctx.translate(this.birds[s].x+this.birds[s].width/2,this.birds[s].y+this.birds[s].height/2),this.ctx.rotate(Math.PI/2*this.birds[s].gravity/20),this.ctx.drawImage(v.bird,-this.birds[s].width/2,-this.birds[s].height/2,this.birds[s].width,this.birds[s].height),this.ctx.restore());this.ctx.fillStyle="white",this.ctx.font="20px Oswald, sans-serif",this.ctx.fillText("Score : "+this.score,10,25),this.ctx.fillText("Max Score : "+this.maxScore,10,50),this.ctx.fillText("Generation : "+this.generation,10,75),this.ctx.fillText("Alive : "+this.alives+" / "+u.options.population,10,100);var e=this;requestAnimationFrame(function(){e.display()})},window.onload=function(){var t={bird:i.default,background:e.default,pipetop:r.default,pipebottom:o.default};y(t,function(t){v=t,u=new a.Neuroevolution({population:30,network:[2,[2],1]}),(g=new k).start(),g.update(),g.display()})};
},{"./img/bird.png":6,"./img/background.png":8,"./img/pipetop.png":10,"./img/pipebottom.png":14,"./Neuroevolution":12,"./config":16}]},{},[4], null)