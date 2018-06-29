import { Particle, createRandom } from './Particle';

export default class Optimizer {
    constructor() {
        this._particles = null;
        this._objectiveFunction = null;
        this._bestPositionEver = null;
        this._bestFitnessEver = -Infinity;
        this._options = {
            inertiaWeight: 0.73,
            social: 2,
            personal: 2,
            pressure: 0.98
        };
        this._async = false;
        this._waiting = false;
        this.rng = {
            random: Math.random,
            setSeed: function () { }
        };
    }
    setOptions(options) {
        // + *inertiaWeight* - is multiplied every frame with the previous velocity;
        if (options.inertiaWeight !== undefined) {
            this._options.inertiaWeight = options.inertiaWeight;
        }
        // + *social* dictates the influence of the best performing particle when updating particle velocities
        if (options.social !== undefined) {
            this._options.social = options.social;
        }

        // + *personal* dictates the influence of a particle's best encountered position
        if (options.personal !== undefined) {
            this._options.personal = options.personal;
        }
        // + *pressure* - bias in selecting the best performing particle in the swarm.
        // Takes values between 0 and 1; 0 meaning that the best is chosen randomly and 1 that
        // the actual best is computed at every iteration
        if (options.pressure !== undefined) {
            this._options.pressure = options.pressure;
        }

    }
    setObjectiveFunction(objectiveFunction) {
        this._objectiveFunction = objectiveFunction;
    }
    init(nParticles, dim, interval) {
        this.dim = dim;
        let ds = [];
        for (let i = 0; i < dim; i++) {
            ds.push(interval);
        }

        this._bestPositionEver = null;
        this._bestFitnessEver = -Infinity;
        this._particles = [];
        for (var i = 0; i < nParticles; i++) {
            this._particles.push(createRandom(ds, this._options, this.rng.random));
        }
    }
    _getRandomBest(except) {
        let ret = Math.floor(this.rng.random() * this._particles.length);
        this._particles.forEach(function (particle, index) {
            if (
                this.rng.random() < this._options.pressure &&
                this._particles[index].fitness > this._particles[ret].fitness &&
                index !== except
            ) {
                ret = index;
            }
        }, this);
        return ret;
    }
    step(setFitness = false) {
        if (setFitness) {
            this._particles.forEach(function (particle) {
                let f = this._objectiveFunction(particle.position);
                particle.fitness = f;
            }, this);
        }

        this._completeStep();

    }

    _completeStep() {
        // Record the best found solutions
        this._particles.forEach(function (particle) {
            if (particle.fitness > particle.bestFitness) {
                particle.bestFitness = particle.fitness;
                particle.storePosition();
                if (particle.fitness > this._bestFitnessEver) {
                    this._bestFitnessEver = particle.fitness;
                    this._bestPositionEver = particle.getPosition();
                }
            }
        }, this);

        // Update velocities
        this._particles.forEach(function (particle, index) {
            let randomBest = this._particles[this._getRandomBest(index)];
            particle.updateVelocity(randomBest, this.rng.random);
        }, this);

        // Update positions
        this._particles.forEach(function (particle) {
            particle.updatePosition();
        });

    }
    getParticles() {
        return this._particles.map(function (particle) {
            return {
                position: particle.getPosition(),
                fitness: particle.fitness,
                bestPosition: particle.getBestPosition(),
                bestFitness: particle.bestFitness
            };
        });
    }

    // Retrieves the best solution ever recorded
    getBestPosition() {
        return this._bestPositionEver;
    }

    // Retrieves the best fitness ever recorded
    getBestFitness() {
        return this._bestFitnessEver;
    }

    // Retrieves the mean fitness of the entire swarm
    getMeanFitness() {
        let sum = this._particles.reduce(function (partialSum, particle) {
            return partialSum + particle.fitness;
        }, 0);
        return sum / this._particles.length;
    }

};


