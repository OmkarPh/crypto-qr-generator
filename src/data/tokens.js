const tokens = [
    {
        name: "Casper",
        id: "casper",
        validator: /^[0-9a-f]{66}$/
    },
    {
        name: "Bitcoin",
        id: "bitcoin",
        validator: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/
    },
    {
        name: "Ethereum",
        id: "ethereum",
        validator: /^0x[a-fA-F0-9]{40}$/
    },
    {
        name: "Litecoin",
        id: "litecoin",
        validator: /^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/
    },
    {
        name: "Bitcoin cash",
        id: "bitcoincash",
        validator: /(?:^(?:[13][a-km-zA-HJ-NP-Z1-9]{33})|(?:((bitcoincash|bchreg|bchtest):)?(q|p)[a-z0-9]{41})$)/
    }
]

const defaultToken = tokens[0];

export {
    tokens,
    defaultToken
}