import * as ts from 'typescript';

export default {
    name: 'hello',
    data() {
        return {
            sourceCode: "let x: string  = 'string'",
        };
    },
    computed: {
        msg() {
            return ts.transpileModule(this.sourceCode, {
                compilerOptions: {
                    target: ts.ScriptTarget.ES5,
                },
            }).outputText;
        },
    },
};
