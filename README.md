## 💎 ton3-core

[![npm](https://img.shields.io/npm/v/ton3-core)](https://www.npmjs.com/package/ton3-core) 
![GitHub top language](https://img.shields.io/github/languages/top/tonkite/ton3-core) 
[![TON](https://img.shields.io/badge/based%20on-The%20Open%20Network-blue)](https://ton.org/)

ton3-core is a [TON blockchain](https://ton.org) low-level API implementation.\
Visit [documentation](./docs/) to see API reference.

## How to install
```
npm i ton3-core
```

## Primitive example
```typescript
import { BOC, Builder } from 'ton3-core'

const text = 'Hello, World!'
const cell = new Builder()
    .storeString(text)
    .cell()

// Serialize BOC to Uint8Array
const serialized = BOC.toBytes([ cell ])
// Deserialize BOC from Uint8Array and get first root cell
const [ deserialized ] = BOC.from(serialized)
const result = deserialized.slice().loadString()

console.log(text === result) // true
```

## Features
- Bag of Cells (BOC) (de)serialization
- Cell
- Builder
- Slice
- Hashmap (de)serialization
- HashmapE (de)serialization
- Coins (TON, NANOTON, JETTON, etc.)
- Address
- Contracts

## Donations
You can support library author by sending any amount of TON to address below
```
EQDwxdFSZfY-wI0Udq-YQjVgTYJmyACIhNczwQuAWhf0dkUH
```

## License

MIT License
