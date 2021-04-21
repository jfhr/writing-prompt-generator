class WritingPromptGenerator {
    getTokens() {
        return {
            template: [
                'Write about the !relationship between !character and !character',
                'Write a !genre about the !relationship between !character and !character',
                'Write about the !relationship between !character and their !attribute companion',
                'Write a !genre about the !relationship between !character and their !attribute companion',
                'Write about !character in !setting',
                'Write a !genre about !character in !setting',
                'Write about !character and !character in !setting',
                'Write a !genre about !character and !character in !setting',
                'Write about !character and !character in !setting',
                'Write a !genre about !character and !character in !setting',
                'Write a !genre set in !setting',
            ],
            character: [
                'a !attribute !characterType',
                'a !characterType',
            ],
            attribute: [
                'bold',
                'timid',
                'kind',
                'lazy',
                'intelligent',
                'clueless',
                'uncharismatic',
                'wise',
                'stupid',
                'dexterous',
                'clumsy',
                'strong',
                'weak',
                'flexible',
                'stiff',
                'creative',
                'careless',
                'enthusiastic',
                'apathetic',
                'bubbly',
                'monotone',
                'cheerful',
                'melancholic',
                'optimistic',
                'pessimistic',
                'calm',
                'hot-headed',
                'brave',
                'cowardly',
                'patient',
                'cautious',
                'spineless',
                'playful',
                'serious',
                'mature',
                'immature',
                'introverted',
                'extroverted',
                'naive',
            ],
            characterType: [
                'artist',
                'architect',
                'dancer',
                'musician',
                'photographer',
                'writer',
                'blacksmith',
                'engineer',
                'mechanic',
                'construction worker',
                'CEO',
                'scientist',
                'doctor',
                'veterinarian',
                'astronaut',
                'historian',
            ],
            genre: [
                'fantasy story',
                'sci-fi story',
                'comedy',
                'romantic story',
                'romcom',
                'historical drama',
                'YA story',
                'thriller',
                'horror story',
            ],
            relationship: [
                'friendship',
                'relationship',
                'rivalship',
            ],
            setting: [
                'the middle ages',
                'the renaissance',
                'prehistoric times',
                'the ming dynasty',
                'the 1920s',
                'the 1960s',
                'the 1970s',
                'east berlin',
                'brazil',
                'russia',
                'china',
                'the andromeda galaxy',
                'virtual reality',
                'a nuclear bunker',
                'highschool',
                'university',
            ]
        };
    }

    generate() {
        const subTokens = this.getTokens();
        return this.substituteTokens('!template', subTokens);
    }

    substituteTokens(value, subTokens) {
        const output = [];
        let pushA = false;

        for (const token of value.split(' ')) {
            if (token.startsWith('!')) {
                const tokenType = token.substr(1);
                const subToken = this.randomChoiceAndRemove(subTokens[tokenType]);
                const subValue = this.substituteTokens(subToken, subTokens);
                if (pushA) {
                    output.push(this.getAOrAn(subValue));
                    pushA = false;
                }
                output.push(subValue);
            } else if (token === 'a') {
                pushA = true;
            } else {
                if (pushA) {
                    output.push(this.getAOrAn(token));
                    pushA = false;
                }
                output.push(token);
            }
        }

        return output.join(' ');
    }

    getAOrAn(followingWord) {
        return this.startsWithVowel(followingWord) ? 'an' : 'a';
    }

    startsWithVowel(value) {
        return value.startsWith('a')
            || value.startsWith('e')
            || value.startsWith('i')
            || value.startsWith('o')
            || value.startsWith('u');
    }

    randomChoiceAndRemove(values) {
        const index = Math.floor(Math.random() * values.length);
        const value = values[index];
        values.splice(index, 1);
        return value
    }
}

window.addEventListener('load', () => {
    const promptElement = document.getElementById('promptElement');
    const promptButton = document.getElementById('promptButton');
    const generator = new WritingPromptGenerator();

    promptButton.addEventListener('click', () => {
        promptElement.innerText = generator.generate();
    });

    promptElement.innerText = generator.generate();
});
