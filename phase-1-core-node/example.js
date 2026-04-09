setTimeout(() => {
  console.log('Timer done');
}, 2000);

console.log('Start');

let sum = 0;
for (let i = 0; i < 10; i++) {
  sum += i;
}
console.log('Sum:', sum);


sum = 0;
for (let i = 0; i < 10; i++) {
  if (i % 2 == 0) {
    console.log(i)
    sum += i
  }
  continue
}
console.log('Sum:', sum);