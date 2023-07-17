const { createClient } = require("redis")

const client = createClient();
client.on('error', err => console.log('Redis error', err))

try {
    console.log('Connecting to redis cluster')
    client.connect().then(() => {
        console.log('connected')
    }).catch(err => {
        console.log('failed to connect')
        console.log(err)
    })
} catch {
    console.log('ermmm')
}


exports.setValue = async ({
    key,
    value
}) => {
    /*
    So we could do this in two ways
    the first is to create the key with:
    client.set(key, value)
    And then immediately set an expiry on it
    client.expiry(key, timeout)

    The other approach is to do it all in one go with this absolutely amazing syntax.
    Full details of what these 2 letter codes mean: 22937
    */
    await client.set(key, value, {
        EX: 10,
        NX: true
    })
}

exports.readValue = async ({
    key
}) => {
    return await client.get(key)
}
