import { Neuron,Layer, Network } from './Network';
let weightInitFunc = () => {
    return 1;
}
let activationFunc = (n) => n;
test('One Neuron', () => {

    let n = new Neuron(3, weightInitFunc);
    expect(n.weights.length).toBe(4);
    for (let w of n.weights) {
        expect(w).toBe(1);
    }
    n = new Neuron(3);
    expect(n.weights.length).toBe(4);
    //console.log(n.weights);
    for (let w of n.weights) {
        expect(w).toBeLessThan(1);
    }
});

test('One Layer', () => {
    let layer = new Layer(1);
    layer.populate(5, 2)
    expect(layer.id).toBe(1);
    expect(layer.neurons.length).toBe(5);
    for (let n of layer.neurons) {
        expect(n.weights.length).toBe(2 + 1);
        expect(n.value).toBe(0);
    }
});

test('Network', () => {
    let net = new Network(2, [3], 1);
   // net.setActivation(activationFunc);
    let data = net.getDataCopy();
    expect(data.weights.length).toBe((2+1)*3+(3+1)*1);
 
    let a = net.compute([1, 1]);
    expect(a[0]).toBeLessThan(1);
    let net2 = new Network(2, [3], 1);
    net2.loadData(data);
    let b = net2.compute([1, 1]);
    expect(a).toEqual(b);

});