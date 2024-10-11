import * as fs from 'fs';

// Function to read JSON files
function readJsonFile(filePath: string): any {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

// Followers
const followersData = readJsonFile('./data/followers_1.json');
let followers: string[] = [];

for (let i of followersData) {
    for (let j of i["string_list_data"]) {
        followers.push(j["value"]);
    }
}

// Following
const followingData = readJsonFile('./data/following.json');
let following: string[] = [];

for (let i of followingData["relationships_following"]) {
    for (let j of i["string_list_data"]) {
        following.push(j["value"]);
    }
}

// Main Logic to find "good people" (people you follow who also follow you)
let goodPeople: string[] = following.filter(followingUser => followers.includes(followingUser));

// Write to hasil.txt file the accounts you're following but are not "good people"
const resultFilePath = './output/hasil.txt';
const writeStream = fs.createWriteStream(resultFilePath);

following.forEach(followingUser => {
    if (!goodPeople.includes(followingUser)) {
        writeStream.write(`https://www.instagram.com/${followingUser}\n`);
    }
});

writeStream.end();

console.log('File hasil.txt berhasil dibuat');
