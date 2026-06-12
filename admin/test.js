const fs = require('fs');
const html = fs.readFileSync('c:/Users/MobeenShaikh/Downloads/DelphiShowroom/admin/index.html', 'utf8');

function findParents(id) {
    let index = html.indexOf('id="' + id + '"');
    if (index === -1) {
        console.log(id + ' not found');
        return;
    }
    let prefix = html.substring(0, index);
    
    // We'll count open and close tags for <section> and <div>
    let tags = [];
    let regex = /<\/?(section|div)(?:\s[^>]*)?>/gi;
    let match;
    while ((match = regex.exec(prefix)) !== null) {
        let tag = match[0].toLowerCase();
        if (tag.startsWith('</')) {
            tags.pop();
        } else {
            tags.push(match[0]);
        }
    }
    console.log('Parents of ' + id + ':');
    tags.forEach(t => console.log('  ' + t));
}

findParents('screen-datamodels');
findParents('screen-engines');
findParents('screen-manufacturing');
