# The Things Stack V3 tabs decoder
Decoder in javascript for the family of tabs sensors for the things stack v3

The differnt tabs sensors supported by this javascript decoder:
- Door & Window Sensor ([Link to BROWAN Productpage](https://www.browan.com/product/door-window-sensor/detail))
- Motion Sensor (PIR) ([Link to BROWAN Productpage](https://www.browan.com/product/motion-sensor-pir/detail))
- Healthy Home Sensor IAQ ([Link to BROWAN Productpage](https://www.browan.com/product/healthy-home-sensor-iaq/detail))
- Ambient Light Sensor ([Link to BROWAN Productpage](https://www.browan.com/product/ambient-light-sensor/detail))
- Sound Level Sensor ([Link to BROWAN Productpage](https://www.browan.com/product/sound-level-sensor/detail))
- Water Leak Sensor ([Link to BROWAN Productpage](https://www.browan.com/product/water-leak-sensor/detail))
- Object Locator ([Link to BROWAN Productpage](https://www.browan.com/product/object-locator/detail))

This decoder is slightly different than the decoder used for the old V2 stack!

To integrate the decoder navigate please to [https://eu1.cloud.thethings.network/console/](https://eu1.cloud.thethings.network/console/) and click on "Go to applications" and choose the application for the tabs sensors (or create one). On the left side you find "Payload formatters" and then choose "Uplink". Choose the Formatter type "Javascript", copy and paste the hole code and overwrite the code in die window and click "Save changes". From now on the payload from the tabs sensors gets decoded into readable JSON output.

You can now integrate all the differnt tabs sensors (listed above) and the decoder automaticly decodes the right data.

This decoder is licensed by the AGPL-3.0 License, please have a look at the LICENSE file.