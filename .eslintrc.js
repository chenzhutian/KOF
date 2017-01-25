module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    extends: 'airbnb-base',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // check if imports actually resolve
    'settings': {
        'import/resolver': {
            'webpack': {
                'config': 'build/webpack.base.conf.js'
            }
        }
    },
    // add your custom rules here
    'rules': {
        "indent": [
            2,
            4,
            {
                "SwitchCase": 1
            }
        ],
        "no-restricted-syntax": [
            'error',
            'ForInStatement',
            'LabeledStatement',
            'WithStatement',
        ],
        "no-plusplus": ["error", {
            "allowForLoopAfterthoughts": true
        }],
        "import/no-extraneous-dependencies": [2, {
            devDependencies: true
        }],
        // don't require .vue extension when importing
        'import/extensions': ['error', 'always', {
            'js': 'never',
            'vue': 'never'
        }],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
