/* Decoder in javascript for the family of tabs sensors from BROWAN for The Things Stack V3
 *
 * GNU Affero General Public License v3.0 - look into the LICENSE file please
 *
 * Created by Caspar Armster (dasdigidings e.V. / The Things Network Rhein-Sieg) - www.dasdigidings.de
 * This function is based on the work from Cameron Sharp at Sensational Systems - cameron@sensational.systems
 * This Edit ist based on the PR from https://github.com/mfalkvidd in https://github.com/dasdigidings/the_things_stack_v3_tabs_decoder
 */

function decodeUplink(input) {
    // create the object to collect the data for returning the decoded payload
    var data = {
        "bytes": input.bytes, // original payload
        "port" : input.fPort  // lorawan port
    };
    var batteryStatus = input.bytes[1];

    // Every device transmits the battery status and the temperature
    // Battery measurement
    switch(batteryStatus){
        case 0:
            // Device is charging or line powered.
            data.charging = true;
            data.batteryFault = false;
            break;
        case 255:
            // Device could not measure battery — possible Fault
            data.batteryFault = true;
            break;
        default:
            data.charging = false;
            data.batteryFault = false;
            battery = input.bytes[1] & 0x0f;
            battery = (25 + battery) / 10;
            data.battery = battery;
            capacity = input.bytes[1] >> 4;
            capacity = (capacity / 15) * 100;
            data.capacity = capacity;
    }

    // Temperature measurement
    temperature = input.bytes[2] & 0x7f;
    temperature = temperature - 32;
    data.temperature = temperature;
if (input.fPort === 100) { // Door & Window Sensor
        // Time measurement
        openingStatusTime = (input.bytes[4] << 8) | input.bytes[3];

        // Count measurement
        openingStatusCount = ((input.bytes[7] << 16) | (input.bytes[6] << 8)) | input.bytes[5];
    
        // Status measurement
        openingStatus = input.bytes[0] & 0x1;
        if (openingStatus === 1) {
            openingStatusOpen = true;
        } else {
            openingStatusOpen = false;
        }
    
        data.openingStatusTime = openingStatusTime;
        data.openingStatusCount = openingStatusCount;
        data.openingStatusOpen = openingStatusOpen;
    }
     else if (input.fPort === 136) { // Object Locator
        // GNSS Fix?
        if ((input.bytes[0] & 0x8) === 0) {
            positionGnssFix = true;
        } else {
            positionGnssFix = false;
        }
        // Accuracy Measurement
        positionAccuracy = input.bytes[10] >> 5;
        positionAccuracy = Math.pow(2, parseInt(positionAccuracy) + 2);

        // Mask off end of accuracy byte, so longitude doesn't get affected
        input.bytes[10] &= 0x1f;

        if ((input.bytes[10] & (1 << 4)) !== 0) {
          input.bytes[10] |= 0xe0;
        }

        // Mask off end of latitude byte, RFU
        input.bytes[6] &= 0x0f;

        // Latitude and Longitude Measurement
        positionLatitude = ((input.bytes[6] << 24 | input.bytes[5] << 16) | input.bytes[4] << 8 ) | input.bytes[3];
        positionLongitude = ((input.bytes[10] << 24 | input.bytes[9] << 16) | input.bytes[8] << 8 ) | input.bytes[7];
        positionLatitude = positionLatitude / 1000000;
        positionLongitude = positionLongitude / 1000000;

        // removed "position" after "data." to let TTN understand the Location and make it usable for TTN-Mapper.org
        data.gnssfix = positionGnssFix;
        data.latitude = positionLatitude;
        data.longitude = positionLongitude;
        data.accuracy = positionAccuracy;
    }

    return {
        data: data,
        warnings: [],
        errors: []
    };
}
