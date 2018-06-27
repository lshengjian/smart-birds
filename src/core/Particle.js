import { Interval } from './util';
export class Particle {
    constructor(position, velocity, options) { //agent is game sprite with network
        this.position = position;
        this.velocity = velocity;
        this.bestPosition = new Array(this.position.length);
        this.fitness = -Infinity;
        this.bestFitness = -Infinity;
        this._inertiaWeight = options.inertiaWeight;
        this._social = options.social;
        this._personal = options.personal;
    }
    setPosition(pos) {
        this.position = pos.slice(0);
    }
    storePosition() {
        this.bestPosition = this.position.slice(0);
    }

    // Retrieves the particle's current position.
    getPosition() {
        return this.position.slice(0);
    }


    // Retrieves the particle's best saved position.

    getBestPosition() {
        return this.bestPosition.slice(0);
    }
    updateVelocity(globalBest, random) {
        this.position.forEach((component, index) => {
            let inertia = this.velocity[index] * this._inertiaWeight;
            let socialInfluence = (globalBest.position[index] - component) * random() * this._social;
            let personalInfluence = (this.bestPosition[index] - component) * random() * this._personal;
            this.velocity[index] = inertia + socialInfluence + personalInfluence;
        }, this);

    }
    // Applies the velocity
    updatePosition() {
        this.velocity.forEach(function (component, index) {
            this.position[index] += component;
        }, this);
    }

};
export function createRandom(domain, options, random) {
      let position = domain.map(function (interval) {
          return random() * (interval.end - interval.start) + interval.start;
      });
  /*  let position = [
         14.475488229746677, 58.63160272654033, 51.366758160085155,
      -70.67286658878754, -11.526036051599444, -4.892985760561999,
       -11.796180543121386, 25.031926173014348, 5.54942246510434*/
    let velocity = domain.map(function (interval) {
        return (random() * (interval.end - interval.start)) * 0.05;
    });
    return new Particle(position, velocity, options);
};