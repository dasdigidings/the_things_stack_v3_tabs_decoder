/* Decoder in javascript for the family of tabs sensors from BROWAN for The Things Stack V3
 *
 * GNU Affero General Public License v3.0 - look into the LICENSE file please
 *
 * Created by Caspar Armster (dasdigidings e.V. / The Things Network Rhein-Sieg) - www.dasdigidings.de
 * This function is based on the work from Cameron Sharp at Sensational Systems - cameron@sensational.systems
 */

function decodeUplink(input) {
    // create the object to collect the data for returning the decoded payload
    var data = {
        "bytes": input.bytes, // original payload
        "port" : input.fPort  // lorawan port
    };

    // Every device transmits the battery status and the temperature
    // Battery measurement
    battery = input.bytes[1] & 0x0f;
    battery = (25 + battery) / 10;
    capacity = input.bytes[1] >> 4;
    capacity = (capacity / 15) * 100;

    // Temperature measurement
    temperature = input.bytes[2] & 0x7f;
    temperature = temperature - 32;

    data.battery = battery;
    data.capacity = capacity;
    data.temperature = temperature;

    // depending on the lorawan port we know which tabs sensor is delivering the data
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
    } else if (input.fPort === 102) { // Motion Sensor (PIR)
        // Time measurement
        roomStatusTime = (input.bytes[4] << 8) | input.bytes[3];
    
        // Count measurement
        roomStatusCount = ((input.bytes[7] << 16) | (input.bytes[6] << 8)) | input.bytes[5];
    
        // Status measurement
        roomStatus = input.bytes[0] & 0x1;
        if (roomStatus === 1) {
            roomStatusOccupied = true;
        } else {
            roomStatusOccupied = false;
        }
    
        data.roomStatusTime = roomStatusTime;
        data.roomStatusCount = roomStatusCount;
        data.roomStatusOccupied = roomStatusOccupied;
    } else if (input.fPort === 103) { // Healthy Home Sensor IAQ & Temperature & Humidity Sensor
        if (input.bytes.length > 8) { // Healthy Home Sensor IAQ
            // VOC Measurement
            voc = (input.bytes[7] << 8) | input.bytes[6];
            if (voc === 65535) {
                vocError = true;
            } else {
                vocError = false;
            }

            // CO2 Measurement
            co2 = (input.bytes[5] << 8) | input.bytes[4];
            if (co2 === 65535) {
                co2Error = true;
            } else {
                co2Error = false;
            }

            // IAQ Measurement
            iaq = (input.bytes[9] << 9) | input.bytes[8];

            // Environment temperature measurement
            temperatureEnvironment = input.bytes[10] & 0x7f;
            temperatureEnvironment = temperatureEnvironment - 32;
            
            data.voc = voc;
            data.vocError = vocError;
            data.co2 = co2;
            data.co2Error = co2Error;
            data.iaq = iaq;
            data.temperatureEnvironment = temperatureEnvironment;
        }

        // Humidity Measurement
        humidity = input.bytes[3] &= 0x7f;
        if (humidity === 127) {
            humidityError = true;
        } else {
            humidityError = false;
        }

        data.humidity = humidity;
        data.humidityError = humidityError;
    } else if (input.fPort === 104) { // Ambient Light Sensor
        // Lux measurement
        lux = ((input.bytes[5] << 16) | (input.bytes[4] << 8)) | input.bytes[3];
        lux = lux / 100;

        data.lux = lux;
    } else if (input.fPort === 105) { // Sound Level Sensor
        // Sound Level measurement
        soundLevel = input.bytes[3] & 0xff;
        if (soundLevel === 255) {
            soundLevelError = true;
        } else {
            soundLevelError = false;
        }

        data.soundLevel = soundLevel;
        data.soundLevelError = soundLevelError;
    } else if (input.fPort === 106) { // Water Leak Sensor
        // Environment temperature measurement
        temperatureEnvironment = input.bytes[4] & 0x7f;
        temperatureEnvironment = temperatureEnvironment - 32;

        // Humidity Measurement
        humidity = input.bytes[3] &= 0x7f;
        if (humidity === 127) {
            humidityError = true;
        } else {
            humidityError = false;
        }

        data.temperatureEnvironment = temperatureEnvironment;
        data.humidity = humidity;
        data.humidityError = humidityError;
    } else if (input.fPort === 136) { // Object Locator
        // GNSS Fix?
        if ((input.bytes[0] & 0x8) === 0) {
            positionGnssFix = true;
        } else {
            positionGnssFix = false;
        }

        // Accuracy Measurement
        positionAccuracy = input.bytes[10] >> 5;
        positionAccuracy = Math.pow(2, parseInt(acc) + 2);

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

        data.positionGnssFix = positionGnssFix;
        data.positionLatitude = positionLatitude;
        data.positionLongitude = positionLongitude;
        data.positionAccuracy = positionAccuracy;
    }

    return {
        data: data,
        warnings: [],
        errors: []
    };
}