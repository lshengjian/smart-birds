import {randomClamped,activation} from './util';

export class Neuron { //extends Phaser.Scene 
    constructor(nbInputs,weightInitFunc=randomClamped) {
        this.value = 0;
        this.weights = [];
        for (let i = 0; i < nbInputs; i++) {
            this.weights.push(weightInitFunc());
        }
        if (nbInputs>0)
           this.weights.push(weightInitFunc());//w.x+b
    }

    
    debug() {
       // console.log(this.value);
        console.log(this.weights);
    }

};

export  class Layer{ 
    constructor(index) {
		this.id = index || 0;
		this.neurons = [];
    }
    
    populate(nbNeurons, nbInputs) {
		this.neurons = [];
		for (let i = 0; i < nbNeurons; i++) {
			let n = new Neuron(nbInputs);
			this.neurons.push(n);
		}
	}
};

export  class Network {
    constructor(input, hiddens, output) {
        this.layers = [];
        let index = 0;
        let previousNeurons = 0;
        let layer = new Layer(index);
        layer.populate(input, previousNeurons); // Number of Inputs will be set to
        // 0 since it is an input layer.
        previousNeurons = input; // number of input is size of previous layer.
        this.layers.push(layer);
        index++;
        for (let h of hiddens) {
            // Repeat same process as first layer for each hidden layer.
            layer = new Layer(index);
            layer.populate(h, previousNeurons);
            previousNeurons = h;
            this.layers.push(layer);
            index++;
        }
        layer = new Layer(index);
        layer.populate(output, previousNeurons); // Number of input is equal to
        // the size of the last hidden  layer.
        this.layers.push(layer);
        this.activationFunc=activation;
    }
    setActivation(fn){
        this.activationFunc=fn;
    }

    getDataCopy() {
        let data = {
            neurons: [], // Number of Neurons per layer.
            weights: [] // Weights of each Neuron's inputs.
        };

        for (let layer of this.layers) {
            data.neurons.push(layer.neurons.length);
            for (let neuron of layer.neurons) {
                for (let w of neuron.weights) {
                    // push all input weights of each Neuron of each Layer into a flat
                    // array.
                    data.weights.push(w);
                }
            }
        }
        return data;
    }

	/**
	 * Apply network data (neurons and weights).
	 *
	 * @param {save} Copy of network data (neurons and weights).
	 * @return void
	 */
    loadData(save) {
        let previousNeurons = 0;
        let index = 0;
        let indexWeights = 0;
        this.layers = [];
        for (let i in save.neurons) {
            // Create and populate layers.
            let layer = new Layer(index);
            layer.populate(save.neurons[i], previousNeurons);
            for (let neuron of layer.neurons) {
                for (let k in neuron.weights) {
                    // Apply neurons weights to each Neuron.
                    neuron.weights[k] = save.weights[indexWeights];

                    indexWeights++; // Increment index of flat array.
                }
            }
            previousNeurons = save.neurons[i];
            index++;
            this.layers.push(layer);
        }
    }
    compute(inputs) {
        // Set the value of each Neuron in the input layer.
        for (let i in inputs) {
            if (this.layers[0] && this.layers[0].neurons[i]) {
                this.layers[0].neurons[i].value = inputs[i];
            }
        }

        let prevLayer = this.layers[0]; // Previous layer is input layer.
        for (let i = 1; i < this.layers.length; i++) {
            for (let j in this.layers[i].neurons) {
                // For each Neuron in each layer.
                let sum = 0;
                for (let k in prevLayer.neurons) {
                    // Every Neuron in the previous layer is an input to each Neuron in
                    // the next layer.
                    sum += prevLayer.neurons[k].value *
                        this.layers[i].neurons[j].weights[k];
                }
                sum += 1 * this.layers[i].neurons[j].weights[prevLayer.neurons.length];

                // Compute the activation of the Neuron.
                this.layers[i].neurons[j].value = this.activationFunc(sum);
            }
            prevLayer = this.layers[i];
        }

        // All outputs of the Network.
        let out = [];
        let lastLayer = this.layers[this.layers.length - 1];
        for (let i in lastLayer.neurons) {
            out.push(lastLayer.neurons[i].value);
        }
        return out;
    }

};