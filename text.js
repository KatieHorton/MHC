/* Program finds longest, shortest, and a middle length word from an array of strings. Then, prints words to the console in a pyramid shape:
1
two
three
*/

const words = ['cats', 'computers', 'you', 'dogs', 'love', 'secret', 'I', 'programming', 'pyramid', 'love'];

let min = '';
let middle = [];
let max = '';

function findMax(words) {
    for (let word of words) {
        if (word.length > max.length) {
            max = word;
        }
    }
    return max
}
// console.log(findMax(words));

function findMin(words) {
    for (let word of words) {
        if (word.length <= [min].length) {
            min = word;
        }
    }
    return min
}
// console.log(findMin(words));

function findMiddle(words) {
    for (let word of words) {
        if (word.length >= [min].length && word.length < max.length) {
            middle.push(word);
        }
    }
    return middle
}
// console.log(findMiddle(words));

function decodeText(words) {
    findMin(words);
    findMax(words);
    findMiddle(words);
    let newMiddle = middle[Math.floor(middle.length / 2)];

    return `${min} \n${newMiddle} \n${max} `
}
console.log(decodeText(words));