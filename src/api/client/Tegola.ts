/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { HttpClient, type RequestParams } from "./http-client";

export class Tegola<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags tegola
   * @name TegolaTegolaCapabilitiesList
   * @request GET:/tegola/tegola-capabilities
   * @secure
   * @response `200` `void`
   */
  tegolaTegolaCapabilitiesList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/tegola/tegola-capabilities`,
      method: "GET",
      secure: true,
      ...params,
    });
}
