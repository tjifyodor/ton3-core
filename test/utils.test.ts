import { expect } from 'chai'
import {
    Checksum,
    Helpers,
    Hash,
} from '../src/utils'

describe('Utils', () => {
    const TEST_STRINGS = [ '', '1', 'short test string', Array(1_000_000).fill('a').join('') ]
    const { sha256 } = Hash
    const {
        crc32c,
        crc16
    } = Checksum
    const {
        stringToBytes,
        hexToBytes,
        base64ToBytes,
        bytesCompare
    } = Helpers
    

    describe('#sha256', () => {
        it('should get correct hash', () => {
            const result = TEST_STRINGS.map(el => hexToBytes(sha256(stringToBytes(el))))
            const answers = [
                '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',
                'a4ayc/80/OGda4BO/1o/V0etpOqiLx1JwB5S3beHW0s=',
                'yPMaY7Q8PKPwCsw64UnDD5mhRcituEJgzLZMvr0O8pY=',
                'zcduXJkU+5KBocfihNc+Z/GAmkiklyAOBG05zMcRLNA='
            ].map(el => base64ToBytes(el))

            expect(result.every((el, i) => bytesCompare(el, answers[i]))).to.equal(true)
        })
    })

    describe('#crc32c', () => {
        it('should get correct checksum', () => {
            const result1 = TEST_STRINGS.map(el => crc32c(stringToBytes(el)))
            const result2 = [ crc32c(hexToBytes('b5ee9c72410101010044000084ff0020dda4f260810200d71820d70b1fed44d0d31fd3ffd15112baf2a122f901541044f910f2a2f80001d31f3120d74a96d307d402fb00ded1a4c8cb1fcbffc9ed54')) ]
            const result = result1.concat(result2)
            const answers = [ 0, 2432014819, 1077264849, 1131405888, 2314272065 ]

            result.forEach((el, i) => {
                expect(el).to.equal(answers[i])
            })
        })
    })

    describe('#crc16', () => {
        it('should get correct checksum', () => {
            const result = TEST_STRINGS.map(el => crc16(stringToBytes(el)))
            const answers = [ 0, 9842, 25046, 37023 ]

            result.forEach((el, i) => {
                expect(el).to.equal(answers[i])
            })
        })
    })
})
