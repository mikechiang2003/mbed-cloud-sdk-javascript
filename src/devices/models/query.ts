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

import { CallbackFn } from "../../common/interfaces";
import { asyncStyle } from "../../common/functions";
import { AddQueryObject } from "../types";
import { DevicesApi } from "../index";

/**
 * Query
 */
export class Query {

    /**
     * The ID of the query
     */
    readonly id: string;
    /**
     * The time the query was created
     */
    readonly createdAt?: Date;
    /**
     * The time the query was updated
     */
    readonly updatedAt?: Date;

    constructor(init?: Partial<Query>, private _api?: DevicesApi) {
        for(var key in init) {
            this[key] = init[key];
        }
    }

    /**
     * Update the query
     * @returns Promise of query
     */
    public update(): Promise<Query>;
    /**
     * Update the query
     * @param callback A function that is passed the arguments (error, query)
     */
    public update(callback: CallbackFn<Query>);
    public update(callback?: CallbackFn<Query>): Promise<Query> {
        return asyncStyle(done => {
            this._api.updateQuery(this, done);
        }, callback);
    }

    /**
     * Delete the query
     * @returns Promise containing any error
     */
    public delete(): Promise<void>;
    /**
     * Delete the query
     * @param callback A function that is passed any error
     */
    public delete(callback: CallbackFn<void>);
    public delete(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteQuery(this.id, done);
        }, callback);
    }
}
export interface Query extends AddQueryObject {}
