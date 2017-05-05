/* 
* mbed Cloud JavaScript SDK
* Copyright ARM Limited 2017
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { CallbackFn, ListOptions, ComparisonObject } from "../common/interfaces";

export type ConnectedDeviceStateEnum = "active" | "stale";

export interface NotificationObject {
    /**
     * Notifications
     */
    notifications?: any[];
    /**
     * New device registration notifications
     */
    registrations?: any[];
    /**
     * Device registration update notifications
     */
    "reg-updates"?: any[];
    /**
     * Device deregistration notifications
     */
    "de-registrations"?: any[];
    /**
     * Device registration expiry notifications
     */
    "registrations-expired"?: any[];
    /**
     * Asynchronous resoonse notifications
     */
    "async-responses"?: any[];
}

export interface DeviceEvent<T> {
    /**
     * The ID of the device
     */
    id?: string;
    /**
     * The type of the device
     */
    type?: string;
    /**
     * The queue mode of the device
     */
    queueMode?: boolean;
    /**
     * The resources of the device
     */
    resources?: Array<T>;
}

export interface AsyncResponse {
    /**
     * Asynchronous response unique ID.
     */
    id?: string;
    /**
     * HTTP status code, for example 200 for OK.
     */
    status?: number;
    /**
     * Content type
     */
    ct?: string;
    /**
     * Requested data, base64 encoded.
     */
    payload?: string;
    /**
     * Determines how long this value will be valid in cache, in seconds. 0 means that value is not stored in cache.
     */
    "max-age"?: string;
    /**
     * Optional error message, describing the error.
     */
    error?: string;
}

export interface NotificationOptions {
    /**
     * A polling interval in milliseconds
     */
    interval?: number;
    /**
     * A function that is passed any asynchronous responses
     */
    requestCallback?: CallbackFn<Array<AsyncResponse>>;
}

export interface PresubscriptionObject {
    /**
     * The device id (optionally having an * character at the end)
     */
    deviceId?: string;
    /**
     * The device type
     */
    deviceType?: string;
    /**
     * A list of resources to subscribe to. Allows wildcards to subscribe to multiple resources at once
     */
    resourcePaths?: string[];
}

export type MechanismEnum = "connector" | "direct";
export type DeviceStateEnum = "unenrolled" | "cloud_enrolling" | "bootstrapped" | "registered" | "deregistered";
export type DeviceDeploymentEnum = "development" | "production";

export interface DeviceObject {
    /**
     * ID of the issuer of the certificate
     */
    certificateIssuerId?: string;
    /**
     * Fingerprint of the device certificate
     */
    certificateFingerprint?: string;
    /**
     * The name of the device
     */
    name?: string;
    /**
     * The alias of the device
     */
    alias?: string;
    /**
     * The description of the device
     */
    description?: string;
    /**
     * Mark this device for auto firmware update
     */
    autoUpdate?: boolean;
    /**
     * Up to 5 custom JSON attributes
     */
    customAttributes?: { [key: string]: string; };
}

export interface AddDeviceObject extends DeviceObject {
    /**
     * ID of the issuer of the certificate
     */
    certificateIssuerId: string;
    /**
     * Fingerprint of the device certificate
     */
    certificateFingerprint: string;
    /**
     * The current state of the device
     */
    state?: DeviceStateEnum;
    /**
     * The state of the device's deployment
     */
    deployedState?: DeviceDeploymentEnum;
    /**
     * The device class
     */
    deviceClass?: string;
    /**
     * The device class
     */
    deviceExecutionMode?: number;
    /**
     * The serial number of the device
     */
    serialNumber?: string;
    /**
     * The device vendor ID
     */
    vendorId?: string;
    /**
     * Expiration date of the certificate used to connect to connector server
     */
    connectorCertificateExpiration?: Date;
    /**
     * Expiration date of the certificate used to connect to bootstrap server
     */
    bootstrapCertificateExpiration?: Date;
    /**
     * The time the device was bootstrapped
     */
    bootstrappedTimestamp?: Date;
    /**
     * The ID of the channel used to communicate with the device
     */
    mechanism?: MechanismEnum;
    /**
     * The address of the connector to use
     */
    mechanismUrl?: string;
    /**
     * URL for the current device manifest
     */
    manifestUrl?: string;
    /**
     * The SHA256 checksum of the current firmware image
     */
    firmwareChecksum?: string;
    /**
     * The last deployment used on the device
     */
    lastDeployment?: string;
    /**
     * The device trust level
     */
    trustLevel?: number;
}

export interface UpdateDeviceObject extends DeviceObject {
    /**
     * The ID of the device
     */
    id: string;
}

export interface QueryObject {
    /**
     * The name of the query
     */
    name?: string;
    /**
     * The device filter
     *
     * Constructed like so:
     *  ```JavaScript
     *  filter: {
     *    state: { $eq: "bootstrapped" },
     *    createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *    updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *    customAttributes: {
     *      <custom_name_1>: { $eq: "custom_value_1" },
     *      <custom_name_2>: { $ne: "custom_value_2" }
     *    }
     *  }
     *  ```
     */
    filter?: {
        accountId?: ComparisonObject<string>;
        autoUpdate?: ComparisonObject<boolean>;
        bootstrapCertificateExpiration?: ComparisonObject<Date>;
        bootstrappedTimestamp?: ComparisonObject<Date>;
        certificateIssuerId?: ComparisonObject<string>;
        connectorCertificateExpiration?: ComparisonObject<Date>;
        createdAt?: ComparisonObject<Date>;
        deployedState?: ComparisonObject<string>;
        lastDeployment?: ComparisonObject<Date>;
        description?: ComparisonObject<string>;
        deviceClass?: ComparisonObject<string>;
        certificateFingerprint?: ComparisonObject<string>;
        alias?: ComparisonObject<string>;
        firmwareChecksum?: ComparisonObject<string>;
        manifestUrl?: ComparisonObject<string>;
        manifestTimestamp?: ComparisonObject<Date>;
        mechanism?: ComparisonObject<string>;
        mechanismUrl?: ComparisonObject<string>;
        name?: ComparisonObject<string>;
        serialNumber?: ComparisonObject<string>;
        state?: ComparisonObject<string>;
        trustLevel?: ComparisonObject<string>;
        updatedAt?: ComparisonObject<Date>;
        vendorId?: ComparisonObject<string>;
        customAttributes?: { [key: string]: ComparisonObject<string> };
    }
}

export interface UpdateQueryObject extends QueryObject {
    /**
     * The ID of the query
     */
    id: string;
}

export interface AddQueryObject extends QueryObject {
    /**
     * The name of the query
     */
    name: string;
    /**
     * The description of the query
     */
    description: string;
}

/**
 * Options to use when listing devices
 */
export interface DeviceListOptions extends ListOptions {
    /**
     * The device filter
     *
     * Constructed like so:
     *  ```JavaScript
     *  filter: {
     *    state: { $eq: "bootstrapped" },
     *    createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *    updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *    customAttributes: {
     *      <custom_name_1>: { $eq: "custom_value_1" },
     *      <custom_name_2>: { $ne: "custom_value_2" }
     *    }
     *  }
     *  ```
     */
    filter?: {
        accountId?: ComparisonObject<string>;
        autoUpdate?: ComparisonObject<boolean>;
        bootstrapCertificateExpiration?: ComparisonObject<Date>;
        bootstrappedTimestamp?: ComparisonObject<Date>;
        certificateIssuerId?: ComparisonObject<string>;
        connectorCertificateExpiration?: ComparisonObject<Date>;
        createdAt?: ComparisonObject<Date>;
        deployedState?: ComparisonObject<string>;
        lastDeployment?: ComparisonObject<Date>;
        description?: ComparisonObject<string>;
        deviceClass?: ComparisonObject<string>;
        certificateFingerprint?: ComparisonObject<string>;
        alias?: ComparisonObject<string>;
        firmwareChecksum?: ComparisonObject<string>;
        manifestUrl?: ComparisonObject<string>;
        manifestTimestamp?: ComparisonObject<Date>;
        mechanism?: ComparisonObject<string>;
        mechanismUrl?: ComparisonObject<string>;
        name?: ComparisonObject<string>;
        serialNumber?: ComparisonObject<string>;
        state?: ComparisonObject<string>;
        trustLevel?: ComparisonObject<string>;
        updatedAt?: ComparisonObject<Date>;
        vendorId?: ComparisonObject<string>;
        customAttributes?: { [key: string]: ComparisonObject<string> };
    }
}

/**
 * Options to use when listing queries
 */
export interface QueryListOptions extends ListOptions {
    /**
     * The query filter
     *
     * Constructed like so:
     *  ```JavaScript
     *  filter: {
     *    name: { $eq: "test" },
     *    createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *    updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *  }
     *  ```
     */
    filter?: {
        name?: ComparisonObject<string>;
        createdAt?: ComparisonObject<Date>;
        updatedAt?: ComparisonObject<Date>;
    }
}

/**
 * Options to use when listing device logs
 */
export interface DeviceLogListOptions extends ListOptions {
    /**
     * The device log filter
     *
     * Constructed like so:
     *  ```JavaScript
     *  filter: {
     *    deviceId: { $eq: "1" },
     *    eventDate: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *  }
     *  ```
     */
    filter?: {
        type?: ComparisonObject<string>;
        deviceId?: ComparisonObject<string>;
        eventDate?: ComparisonObject<Date>;
    }
}
