input.onButtonPressed(Button.A, function () {
    M1_targAngle = M1_targAngle + 10
    M2_targAngle = M2_targAngle + 10
    M3_targAngle = M3_targAngle + 10
    basic.showIcon(IconNames.No)
})
input.onButtonPressed(Button.B, function () {
    M1_targAngle = M1_targAngle - 10
    M2_targAngle = M2_targAngle - 10
    M3_targAngle = M3_targAngle - 10
    basic.showIcon(IconNames.Duck)
})
let M3_power = 0
let M2_power = 0
let M1_power = 0
let M3_curAngle = 0
let M2_curAngle = 0
let M1_curAngle = 0
let M3_targAngle = 0
let M2_targAngle = 0
let M1_targAngle = 0
basic.showIcon(IconNames.Heart)
M1_targAngle = 120
M2_targAngle = 200
M3_targAngle = 74
Controller.singleMotorStop(Controller.Motor.M1)
Controller.singleMotorStop(Controller.Motor.M2)
Controller.singleMotorStop(Controller.Motor.M3)
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 0, 64)
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, 0, 64)
PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 0, 64)
PCA9685.setServoPosition(PCA9685.ServoNum.Servo1, 0, 64)
PCA9685.setServoPosition(PCA9685.ServoNum.Servo2, 0, 64)
PCA9685.setServoPosition(PCA9685.ServoNum.Servo3, 0, 64)
basic.forever(function () {
    TCA9548A.selectChannel(0)
    M1_curAngle = AS5600.multiTurnAngle()
    TCA9548A.selectChannel(1)
    M2_curAngle = AS5600.multiTurnAngle()
    TCA9548A.selectChannel(7)
    M3_curAngle = AS5600.multiTurnAngle()
    serial.writeLine("" + M1_curAngle + " " + ("" + M2_curAngle) + " " + ("" + M3_curAngle))
    if (true) {
        M1_power = Functions.pid(
        0,
        M1_targAngle,
        M1_curAngle,
        10,
        5,
        0,
        0,
        -100,
        100
        )
        Controller.motorPower(Controller.Motor.M1, M1_power)
        M2_power = Functions.pid(
        1,
        M2_targAngle,
        M2_curAngle,
        10,
        5,
        0,
        0,
        -100,
        100
        )
        Controller.motorPower(Controller.Motor.M2, M2_power)
        M3_power = Functions.pid(
        2,
        M3_targAngle,
        M3_curAngle,
        10,
        5,
        0,
        0,
        -100,
        100
        )
        Controller.motorPower(Controller.Motor.M3, M3_power)
    }
})

