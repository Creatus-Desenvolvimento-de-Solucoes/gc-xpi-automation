module.exports = {
    // Type check TypeScript files
    '**/*.(ts|tsx)': () => {
        return 'yarn tsc --noEmit';
    },

    // Lint then format TypeScript and JavaScript files
    '**/*.(ts|tsx|js)': (filenames) => {
        return [
            `yarn eslint --fix ${filenames.join(' ')}`,
            `yarn prettier --write ${filenames.join(' ')}`,
        ];
    },

    // Format MarkDown and JSON
    '**/*.(md|json)': (filenames) => {
        return `yarn prettier --write ${filenames.join(' ')}`;
    },
};
