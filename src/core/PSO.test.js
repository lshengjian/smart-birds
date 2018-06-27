
import Optimizer from './PSO';

let optimizer = new Optimizer();

// print the best found fitness value and position in the search space


test('PSO optimizer', () => {
    optimizer.setObjectiveFunction(function (x) {
        return -(x[0] * x[0] + x[1] * x[1]);
    });

    // define the solution space and initialize 20 particles in it
    let domain = { start: -10, end: 10 };
    optimizer.init(20, 2, domain);
    // run the optimizer 40 iterations
    for (let i = 0; i < 200; i++) {
        optimizer.step();
    }
    console.log('Best solution found', optimizer.getBestFitness());
    console.log('at', optimizer.getBestPosition());
});