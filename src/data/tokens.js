const tokens = [
    {
        name: "Casper",
        id: "casper",
        validator: /^[0-9a-f]{66}$/,
        example: "01edb0ffb268e6ddc27404a45124e98420dfea1dbf60a8a45c679fd1117820e99e"
    },
    {
        name: "Bitcoin",
        id: "bitcoin",
        validator: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/,
        example: "3EM2iHvy4ccC4thBhKuxqW5hYZzxCQcWSD"
    },
    {
        name: "Ethereum",
        id: "ethereum",
        validator: /^0x[a-fA-F0-9]{40}$/,
        example: "0x5790bf1b1a1549cf89655f314350e9854a4e6ddf"
    },
    {
        name: "Litecoin",
        id: "litecoin",
        validator: /^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/,
        example: "LQL9pVH1LsMfKwt82Y2wGhNGkrjF8vwUst"
    },
    {
        name: "Bitcoin cash",
        id: "bitcoincash",
        validator: /(?:^(?:[13][a-km-zA-HJ-NP-Z1-9]{33})|(?:((bitcoincash|bchreg|bchtest):)?(q|p)[a-z0-9]{41})$)/,
        example: "19hZx234vNtLazfx5J2bxHsiWEmeYE8a7k"
    }
]

const defaultToken = tokens[0];

export {
    tokens,
    defaultToken
}