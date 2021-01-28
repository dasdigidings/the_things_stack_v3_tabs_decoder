# The Things Stack V3 tabs decoder
Decoder in javascript for the family of tabs sensors for the things stack v3

### The differnt tabs sensors supported by this javascript decoder:
- Door & Window Sensor (TBDW - [Link to BROWAN Productpage](https://www.browan.com/product/door-window-sensor/detail))
- Motion Sensor (PIR) (TBMS - [Link to BROWAN Productpage](https://www.browan.com/product/motion-sensor-pir/detail))
- Healthy Home Sensor IAQ (TBHV - [Link to BROWAN Productpage](https://www.browan.com/product/healthy-home-sensor-iaq/detail))
- Temperature & Humidity Sensor (TBHH - [Link to BROWAN Productpage](https://www.browan.com/product/temperature-humidity-sensor/detail))
- Ambient Light Sensor (TBAM - [Link to BROWAN Productpage](https://www.browan.com/product/ambient-light-sensor/detail))
- Sound Level Sensor (TBSL - [Link to BROWAN Productpage](https://www.browan.com/product/sound-level-sensor/detail))
- Water Leak Sensor (TBWL - [Link to BROWAN Productpage](https://www.browan.com/product/water-leak-sensor/detail))
- Object Locator (TBOL - [Link to BROWAN Productpage](https://www.browan.com/product/object-locator/detail))

### This decoder is slightly different than the decoder used for the old V2 stack!
To integrate the decoder navigate please to [https://eu1.cloud.thethings.network/console/](https://eu1.cloud.thethings.network/console/) and click on "Go to applications" and choose the application for the tabs sensors (or create one). On the left side you find "Payload formatters" and then choose "Uplink". Choose the Formatter type "Javascript", copy and paste the hole code and overwrite the code in die window and click "Save changes". From now on the payload from the tabs sensors gets decoded into readable JSON output.

You can now integrate all the differnt tabs sensors (listed above) and the decoder automaticly decodes the right data.

### Things to know
- Sound Level Sensor (TBSL): The sensor has a range from 40dBA to 100dBA and if your sound level in your environment is outside of this range it will give you a error message by transmitting 255 - depending on the environment you may see strange spikes on your graphical representation because of this. For example if you are in a quiet office space and you are around the lower 40dBA limit you get thsi spikes to 255 everytime you fall below. Best practice is to filter these spikes, or if you know that you break the lower limit and not the upper one, convert the 255 to 0 and your spikes are at least shown in the right direction.
- Healthy Home Sensor IAQ (TBHV), Sound Level Sensor (TBSL), Temperature & Humidity Sensor (TBHH) and Water Leak Sensor (TBWL): These sensors provide you with a error status if the sensors can not measure data inside their limits, so beware that there maybe strange spikes resulting because of this in your graphical representation.

This decoder is licensed by the AGPL-3.0 License, please have a look at the LICENSE file.