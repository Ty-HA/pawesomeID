const { Resolver } = require('did-resolver');
const { getResolver } = require('../../../../packages/resolver');

const xrplResolver = getResolver();

const didResolver = new Resolver({
    ...xrplResolver
    //...you can flatten multiple resolver methods into the Resolver
});

didResolver.resolve('did:xrpl:1:rp5vPZ49XvsqVtuWvaCSgwSbcya1HVpnaZ').then(doc => console.log(doc));

// Using ES7 async/await syntax
(async () => {
    const doc = await didResolver.resolve('did:xrpl:1:rp5vPZ49XvsqVtuWvaCSgwSbcya1HVpnaZ');
    console.log(doc);
})();