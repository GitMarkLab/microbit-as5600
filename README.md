# AS5600 for BBC micro:bit MakeCode

A small read-only MakeCode extension for the **ams OSRAM AS5600** magnetic angle sensor.

It is intended for the BBC micro:bit and uses I²C address `0x36`.

## Functions

In MakeCode Python:

```python
AS5600.raw_angle()
AS5600.angle()
AS5600.angle_degrees()

AS5600.zero_here()
AS5600.clear_zero()
AS5600.angle_zeroed()
AS5600.angle_signed()

AS5600.magnet_detected()
AS5600.magnet_too_weak()
AS5600.magnet_too_strong()
AS5600.magnet_ok()

AS5600.agc()
AS5600.magnitude()
```

MakeCode converts the exported TypeScript names automatically to Python snake_case.

## Simple test

```python
AS5600.zero_here()

def on_forever():
    serial.write_value("angle", AS5600.angle_signed())
    basic.pause(100)

basic.forever(on_forever)
```

## Wiring

Typical I²C connection:

- AS5600 VCC -> 3.3 V
- AS5600 GND -> GND
- AS5600 SDA -> micro:bit SDA
- AS5600 SCL -> micro:bit SCL

If the AS5600 is connected through an expansion board, use that board's I²C connector.

## Important for multiple AS5600 sensors

The normal AS5600 uses I²C address `0x36`. Multiple AS5600 devices therefore cannot simply share the same I²C bus unless they are separated with an I²C multiplexer such as a TCA9548A.

## Safety

This extension only reads the sensor. `zero_here()` is a software zero and does **not** write the AS5600's configuration or burn OTP memory.

## Creator
Mark with the help of OPEN AI ChatGPT

## Electrical wirering
micro:bit 
AS5600 3.3V ------> VCC 
ND ------> GND 
SDA ------> SDA 
SCL ------> SCL

## Microsoft Makecode Integration
### create a project

![[Pasted image 20260812120121.png]]

### Extensions

![[Pasted image 20260812120213.png]]

### add URL to the search bar
https://github.com/GitMarkLab/microbit-as5600

![[Pasted image 20260812120256.png]]

### copy python example

![[Pasted image 20260812120638.png]]

### switch to Blocks to see the example

![[Pasted image 20260812120503.png]]

### use Arduino IDE 2.0 to view serial 

![[Pasted image 20260812121003.png]]