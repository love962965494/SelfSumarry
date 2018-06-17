module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "html"
    ],
    "rules": {
        "linebreak-style": 0,
        "no-mixed-operators": [
            "error",
            {
                "groups": [
                    ["&", "|", "^", "~", "<<", ">>", ">>>"],
                    ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
                    ["&&", "||"],
                    ["in", "instanceof"]
                ],
                "allowSamePrecedence": true
            }
        ],
        "max-len": [
            "error",
            {
                "code": 150
            }
        ]
    },
    env: {
        browser: true,
    },
};