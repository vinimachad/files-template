export default function (inputString: string) {
    return inputString.split('').map((character, index) => {
        if (character === character.toUpperCase() && index !== 0) {
            return '_' + character.toLowerCase();
        } else {
            return character.toLowerCase();
        }
    })
    .join('');
}