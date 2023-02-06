[ton3-core](../README.md) / BOC

# Class: BOC

Bag Of Cells

## Table of contents

### Constructors

- [constructor](BOC.md#constructor)

### Methods

- [[iterator]](BOC.md#[iterator])
- [from](BOC.md#from)
- [toBytes](BOC.md#tobytes)
- [toString](BOC.md#tostring)

### Accessors

- [root](BOC.md#root)

## Constructors

### constructor

• **new BOC**(`cells`)

Creates an instance of [BOC](BOC.md), containing up to 4 root [Cell](Cell.md) list

**`example`**
```ts
import { BOC, Builder } from 'ton3-core'

const cell = new Builder().cell()
const boc = new BOC([ cell ])
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cells` | [`Cell`](Cell.md)[] | BOC root [Cell](Cell.md) list |

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`<[`Cell`](Cell.md)\>

#### Returns

`IterableIterator`<[`Cell`](Cell.md)\>

___

### from

▸ `Static` **from**(`data`, `checkMerkleProofs?`): [`BOC`](BOC.md)

Returns deserialized BOC.

**`static`**

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `data` | `string` \| `Uint8Array` | `undefined` | Bytes, Hex, Base64 or FiftHex of serialized BOC. |
| `checkMerkleProofs` | `boolean` | `false` | - |

#### Returns

[`BOC`](BOC.md)

___

### toBytes

▸ **toBytes**(`options?`): `Uint8Array`

Returns serialized BOC in bytes representation.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`BOCOptions`](../interfaces/BOCOptions.md) |

#### Returns

`Uint8Array`

___

### toString

▸ **toString**(`encoding?`, `options?`): `string`

Returns serialized BOC in Base64, Hex or FiftHex representation.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `encoding` | [`BOCEncoding`](../README.md#bocencoding) | `'hex'` |
| `options?` | [`BOCOptions`](../interfaces/BOCOptions.md) | `undefined` |

#### Returns

`string`

## Accessors

### root

• `get` **root**(): [`Cell`](Cell.md)[]

Returns BOC root [Cell](Cell.md) list

#### Returns

[`Cell`](Cell.md)[]
