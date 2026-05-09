import { execSync } from 'child_process';

try {
    console.log('Début du script');
    const output = execSync('npx bddgen export').toString();
    console.log('Output :', output);
} catch (error) {
    console.error('Erreur :', error);
}
import { writeFileSync, readFileSync, readdirSync } from 'fs';
import * as path from 'path';


const output = execSync('npx bddgen export').toString();
console.log('Output bddgen :', output);
const lines = output.split('\n')
    .filter(line => line.trim().startsWith('*')) // garde uniquement les lignes de steps
    .map(line => line.replace('* ', '').trim()); // supprime le "* " au début

console.log('Lines :', lines);

const steps = lines.map(line => {
    const match = line.match(/^(Given|When|Then)\s+(.+)$/);
    if (!match) return null;
    return { keyword: match[1], pattern: match[2] };
}).filter(Boolean);

console.log('Steps :', steps);

const featuresDir = 'features';
const featureFiles = readdirSync(featuresDir).filter(f => f.endsWith('.feature'));

// Extrait le nom et la description de chaque feature
const featureInfos = featureFiles.map(file => {
    const content = readFileSync(path.join(featuresDir, file), 'utf-8');
    const nameMatch = content.match(/Feature:\s*(.+)/);
    const descriptionMatch = content.match(/Feature:.+\n\s*(.+)/);
    return {
        file,
        name: nameMatch ? nameMatch[1].trim() : file,
        description: descriptionMatch ? descriptionMatch[1].trim() : 'Aucune description'
    };
});

const stepsWithFeatures = steps.map(step => {
    const usedIn = featureFiles.filter(file => {
        const content = readFileSync(path.join(featuresDir, file), 'utf-8');
        return content.includes(step!.pattern.replace('{string}', '"'));
    }).map(file => featureInfos.find(f => f.file === file)!);
    return { ...step, features: usedIn };
});

let markdown = '# Dictionnaire des steps\n\n';

const keywords = ['Given', 'When', 'Then'];
keywords.forEach(keyword => {
    markdown += `## ${keyword}\n\n`;
    stepsWithFeatures
        .filter(s => s.keyword === keyword)
        .forEach(step => {
            markdown += `### ${step.pattern}\n`;
            if (step.features.length > 0) {
                step.features.forEach(feature => {
                    markdown += `- **${feature.name}** : ${feature.description}\n`;
                });
            } else {
                markdown += `- Aucune feature\n`;
            }
            markdown += '\n';
        });
});

console.log('Steps trouvés :', steps);
console.log('Markdown généré :');
console.log(markdown);
writeFileSync('STEPS.md', markdown);
console.log('STEPS.md généré !');