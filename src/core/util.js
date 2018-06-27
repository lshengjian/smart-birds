export function randomClamped() {
    return Math.random() * 2 - 1;
}
export function Interval(start, end) {
    this.start = start;
    this.end = end;
}
export function activation(a) {
    let ap = (-a) / 1;
    return (1 / (1 + Math.exp(ap)))
}