import { Builder } from './builder'
import { Slice } from './slice'
import { Mask } from './mask'
import {
    Cell,
    CellType,
    CellOptions
} from './cell'
import {
    Hashmap,
    HashmapE
} from './hashmap'
import {
    base64ToBytes,
    bytesToBase64,
    hexToBytes,
    bytesToHex
} from '../utils/helpers'
import {
    serialize,
    deserialize,
    deserializeFift,
    BOCOptions
} from './serializer'

export type BOCEncoding = 'hex' | 'base64' | 'fift'

/**
 * Bag Of Cells
 *
 * @class BOC
 */
class BOC {
    private _root: Cell[]

    private static isHex (data: any): boolean {
        const re = /^[a-fA-F0-9]+$/

        return typeof data === 'string' && re.test(data)
    }

    private static isBase64 (data: any): boolean {
        // eslint-disable-next-line no-useless-escape
        const re = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/

        return typeof data === 'string' && re.test(data)
    }

    private static isFift (data: any): boolean {
        const re = /^x\{/

        return typeof data === 'string' && re.test(data)
    }

    private static isBytes (data: any): boolean {
        return ArrayBuffer.isView(data)
    }


    private static toBase64 (cells: Cell[], options?: BOCOptions): string {
        const bytes = serialize(cells, options)

        return bytesToBase64(bytes)
    }

    private static toFiftHex (cells: Cell[]): string {
        const fift = cells.map(cell => cell.print())

        return fift.join('\n')
    }

    private static toHex (cells: Cell[], options?: BOCOptions): string {
        const bytes = serialize(cells, options)

        return bytesToHex(bytes)
    }

    /**
     * Creates an instance of {@link BOC}, containing up to 4 root {@link Cell} list
     *
     * @param {[Cell]} cells - BOC root {@link Cell} list
     *
     * @example
     * ```ts
     * import { BOC, Builder } from 'ton3-core'
     * 
     * const cell = new Builder().cell()
     * const boc = new BOC([ cell ])
     * ```
     */
    constructor (cells: Cell[]) {
        if (cells.length === 0 || cells.length > 4) {
            throw new Error('BOC: root cells length must be from 1 to 4')
        }

        this._root = cells
    }

    [Symbol.iterator] (): IterableIterator<Cell> {
        return this.root.values()
    }

    /**
     * Returns deserialized BOC.
     *
     * @static
     * @param {(Uint8Array | string)} data - Bytes, Hex, Base64 or FiftHex of serialized BOC.
     * @param {boolean} [checkMerkleProofs=false] - Check if BOC must contain Merkle Proofs
     * @return {BOC}
     */
    public static from (data: Uint8Array | string, checkMerkleProofs: boolean = false): BOC {
        if (BOC.isBytes(data)) {
            return new BOC(deserialize(data as Uint8Array, checkMerkleProofs))
        }

        const value = (data as string).trim()

        if (BOC.isFift(value)) {
            if (checkMerkleProofs) {
                throw new Error('BOC: cheking Merkle Proofs is not currently implemented for fift hex')
            }

            return new BOC(deserializeFift(value))
        }

        if (BOC.isHex(value)) {
            return new BOC(deserialize(hexToBytes(value), checkMerkleProofs))
        }

        if (BOC.isBase64(value)) {
            return new BOC(deserialize(base64ToBytes(value), checkMerkleProofs))
        }

        throw new Error('BOC: can\'t deserialize. Bad data.')
    }

    /**
     * Returns serialized BOC in bytes representation.
     *
     * @param {BOCOptions} [options]
     * @return {Uint8Array}
     */
    public toBytes (options?: BOCOptions): Uint8Array {
        return serialize(this.root, options)
    }

    /**
     * Returns serialized BOC in Base64, Hex or FiftHex representation.
     *
     * @param {string} [encoding] - The encoding to use in the return value. Default 'hex'
     * @param {BOCOptions} [options]
     * @return {string}
     */
    public toString (encoding: BOCEncoding = 'hex', options?: BOCOptions): string {
        if (encoding !== 'base64' && encoding !== 'hex' && encoding !== 'fift') {
            throw new Error('BOC: unknown encoding')
        }

        if (encoding === 'base64') {
            return BOC.toBase64(this.root, options)
        }

        if (encoding === 'hex') {
            return BOC.toHex(this.root, options)
        }

        if (encoding === 'fift') {
            return BOC.toFiftHex(this.root)
        }
    }

    /**
     * Returns BOC root {@link Cell} list
     *
     * @return {[Cell]}
     */
    public get root (): Cell[] {
        return this._root.slice(0, this._root.length)
    }
}

export {
    BOC,
    BOCOptions,
    Mask,
    Cell,
    CellType,
    CellOptions,
    Hashmap,
    HashmapE,
    Slice,
    Builder
}
