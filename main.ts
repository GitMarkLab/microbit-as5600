/**
 * AS5600 magnetic angle sensor for BBC micro:bit MakeCode.
 * Read-only driver: it does not write configuration or OTP registers.
 */
//% color=#4B7BEC icon="\uf1d8" block="AS5600"
namespace AS5600 {
    const ADDRESS = 0x36

    const REG_STATUS = 0x0B
    const REG_RAW_ANGLE_H = 0x0C
    const REG_ANGLE_H = 0x0E
    const REG_AGC = 0x1A
    const REG_MAGNITUDE_H = 0x1B

    const STATUS_MD = 0x20
    const STATUS_ML = 0x10
    const STATUS_MH = 0x08

    let zeroOffset = 0

    function read8(reg: number): number {
        let w = pins.createBuffer(1)
        w[0] = reg
        pins.i2cWriteBuffer(ADDRESS, w, true)
        let r = pins.i2cReadBuffer(ADDRESS, 1, false)
        return r[0]
    }

    function read12(regHigh: number): number {
        let w = pins.createBuffer(1)
        w[0] = regHigh
        pins.i2cWriteBuffer(ADDRESS, w, true)
        let r = pins.i2cReadBuffer(ADDRESS, 2, false)
        return ((r[0] & 0x0F) << 8) | r[1]
    }

    /**
     * Raw, unfiltered angle from 0 to 4095.
     */
    //% block="AS5600 raw angle"
    //% weight=100
    export function rawAngle(): number {
        return read12(REG_RAW_ANGLE_H)
    }

    /**
     * Filtered angle from 0 to 4095.
     */
    //% block="AS5600 angle"
    //% weight=99
    export function angle(): number {
        return read12(REG_ANGLE_H)
    }

    /**
     * Filtered angle in degrees from 0 to less than 360.
     */
    //% block="AS5600 angle degrees"
    //% weight=98
    export function angleDegrees(): number {
        return angle() * 360 / 4096
    }

    /**
     * Set the current position as a software-only zero point.
     * Nothing is programmed into the AS5600.
     */
    //% block="AS5600 set current position as zero"
    //% weight=90
    export function zeroHere(): void {
        zeroOffset = angle()
    }

    /**
     * Clear the software zero point.
     */
    //% block="AS5600 clear software zero"
    //% weight=89
    export function clearZero(): void {
        zeroOffset = 0
    }

    /**
     * Software-zeroed angle from 0 to 4095.
     */
    //% block="AS5600 zeroed angle"
    //% weight=88
    export function angleZeroed(): number {
        return (angle() - zeroOffset + 4096) % 4096
    }

    /**
     * Software-zeroed signed angle, approximately -180 to +180 degrees.
     */
    //% block="AS5600 signed angle degrees"
    //% weight=87
    export function angleSigned(): number {
        let a = angleZeroed()
        if (a >= 2048) {
            a -= 4096
        }
        return a * 360 / 4096
    }

    /**
     * True if the AS5600 reports a magnet.
     */
    //% block="AS5600 magnet detected"
    //% weight=80
    export function magnetDetected(): boolean {
        return (read8(REG_STATUS) & STATUS_MD) != 0
    }

    /**
     * True if the magnetic field is too weak.
     */
    //% block="AS5600 magnet too weak"
    //% weight=79
    export function magnetTooWeak(): boolean {
        return (read8(REG_STATUS) & STATUS_ML) != 0
    }

    /**
     * True if the magnetic field is too strong.
     */
    //% block="AS5600 magnet too strong"
    //% weight=78
    export function magnetTooStrong(): boolean {
        return (read8(REG_STATUS) & STATUS_MH) != 0
    }

    /**
     * True if a magnet is detected and its field is neither too weak nor too strong.
     */
    //% block="AS5600 magnet OK"
    //% weight=77

    export function magnetOK(): boolean {
        return (read8(REG_STATUS) & STATUS_MD) != 0
    }

    /**
     * Automatic gain control value.
     */
    //% block="AS5600 AGC"
    //% weight=70
    export function agc(): number {
        return read8(REG_AGC)
    }

    /**
     * Magnetic magnitude, 12-bit value.
     */
    //% block="AS5600 magnitude"
    //% weight=69
    export function magnitude(): number {
        return read12(REG_MAGNITUDE_H)
    }
}
