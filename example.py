# MakeCode Python example

AS5600.zero_here()

def on_forever():
    if AS5600.magnet_ok():
        serial.write_value("deg", AS5600.angle_degrees())
        serial.write_value("signed", AS5600.angle_signed())
    else:
        serial.write_line("Magnet nicht OK")
    basic.pause(100)

basic.forever(on_forever)
