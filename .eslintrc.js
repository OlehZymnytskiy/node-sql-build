module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "mocha": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            2,
            {
                "SwitchCase": 1
            }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single",
            {
                "avoidEscape": true
            }
        ],
        "semi": [
            "error",
            "always"
        ],
        "camelcase": [
            "error"
        ],
        "no-underscore-dangle": [
          "error"
        ]
    }
};
