const fs = require('fs');
let text = fs.readFileSync('index.html', 'utf-8');
let lines = text.split('\n');
let firstBodyIdx = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === 'body {') {
        firstBodyIdx = i;
        break;
    }
}
let secondBodyIdx = -1;
if (firstBodyIdx !== -1) {
    for (let i = firstBodyIdx + 1; i < lines.length; i++) {
        if (lines[i].trim() === 'body {') {
            secondBodyIdx = i;
            break;
        }
    }
}
if (firstBodyIdx !== -1 && secondBodyIdx !== -1) {
    let deleteCount = secondBodyIdx - firstBodyIdx;
    lines.splice(firstBodyIdx, deleteCount);
    fs.writeFileSync('index.html', lines.join('\n'));
    console.log('Successfully repaired index.html by removing ' + deleteCount + ' lines.');
} else {
    console.log('Error: Could not find two body declarations: ' + firstBodyIdx + ', ' + secondBodyIdx);
}
