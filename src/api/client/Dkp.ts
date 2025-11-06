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

import type { CadastralMunicipality, CadastralParcel } from "./data-contracts";
import { ContentType, HttpClient, type RequestParams } from "./http-client";

export class Dkp<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description List all cadastral municipalities. Public access. Supports pagination with limit and offset parameters.
   *
   * @tags Cadastral Municipalities
   * @name CadastralMunicipalityList
   * @request GET:/dkp/municipalities/
   * @secure
   * @response `200` `(CadastralMunicipality)[]`
   */
  cadastralMunicipalityList = (params: RequestParams = {}) =>
    this.request<CadastralMunicipality[], any>({
      path: `/dkp/municipalities/`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Create a new cadastral municipality. Requires authentication.
   *
   * @tags Cadastral Municipalities
   * @name CadastralMunicipalityCreate
   * @request POST:/dkp/municipalities/
   * @secure
   * @response `201` `CadastralMunicipality`
   * @response `400` `void` Bad Request
   * @response `401` `void` Unauthorized
   */
  cadastralMunicipalityCreate = (
    data: CadastralMunicipality,
    params: RequestParams = {},
  ) =>
    this.request<CadastralMunicipality, void>({
      path: `/dkp/municipalities/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieve a cadastral municipality by municipality number. Public access.
   *
   * @tags Cadastral Municipalities
   * @name CadastralMunicipalityDetail
   * @request GET:/dkp/municipalities/{municipality_number}/
   * @secure
   * @response `200` `CadastralMunicipality`
   * @response `404` `void` Not Found
   */
  cadastralMunicipalityDetail = (
    municipalityNumber: string,
    params: RequestParams = {},
  ) =>
    this.request<CadastralMunicipality, void>({
      path: `/dkp/municipalities/${municipalityNumber}/`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Update a cadastral municipality. Requires authentication.
   *
   * @tags Cadastral Municipalities
   * @name CadastralMunicipalityUpdate
   * @request PUT:/dkp/municipalities/{municipality_number}/
   * @secure
   * @response `200` `CadastralMunicipality`
   * @response `400` `void` Bad Request
   * @response `401` `void` Unauthorized
   * @response `404` `void` Not Found
   */
  cadastralMunicipalityUpdate = (
    municipalityNumber: string,
    data: CadastralMunicipality,
    params: RequestParams = {},
  ) =>
    this.request<CadastralMunicipality, void>({
      path: `/dkp/municipalities/${municipalityNumber}/`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Partially update a cadastral municipality. Requires authentication.
   *
   * @tags Cadastral Municipalities
   * @name CadastralMunicipalityPartialUpdate
   * @request PATCH:/dkp/municipalities/{municipality_number}/
   * @secure
   * @response `200` `CadastralMunicipality`
   * @response `400` `void` Bad Request
   * @response `401` `void` Unauthorized
   * @response `404` `void` Not Found
   */
  cadastralMunicipalityPartialUpdate = (
    municipalityNumber: string,
    data: CadastralMunicipality,
    params: RequestParams = {},
  ) =>
    this.request<CadastralMunicipality, void>({
      path: `/dkp/municipalities/${municipalityNumber}/`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Delete a cadastral municipality. Requires authentication.
   *
   * @tags Cadastral Municipalities
   * @name CadastralMunicipalityDelete
   * @request DELETE:/dkp/municipalities/{municipality_number}/
   * @secure
   * @response `204` `void` No Content
   * @response `401` `void` Unauthorized
   * @response `404` `void` Not Found
   */
  cadastralMunicipalityDelete = (
    municipalityNumber: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/dkp/municipalities/${municipalityNumber}/`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description List all cadastral parcels. Public access. Supports pagination with limit and offset parameters.
   *
   * @tags Cadastral Parcels
   * @name CadastralParcelList
   * @request GET:/dkp/parcels/
   * @secure
   * @response `200` `(CadastralParcel)[]`
   */
  cadastralParcelList = (params: RequestParams = {}) =>
    this.request<CadastralParcel[], any>({
      path: `/dkp/parcels/`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Create a new cadastral parcel. Requires authentication.
   *
   * @tags Cadastral Parcels
   * @name CadastralParcelCreate
   * @request POST:/dkp/parcels/
   * @secure
   * @response `201` `CadastralParcel`
   * @response `400` `void` Bad Request
   * @response `401` `void` Unauthorized
   */
  cadastralParcelCreate = (data: CadastralParcel, params: RequestParams = {}) =>
    this.request<CadastralParcel, void>({
      path: `/dkp/parcels/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieve a cadastral parcel by ID. Public access.
   *
   * @tags Cadastral Parcels
   * @name CadastralParcelDetail
   * @request GET:/dkp/parcels/{id}/
   * @secure
   * @response `200` `CadastralParcel`
   * @response `404` `void` Not Found
   */
  cadastralParcelDetail = (id: string, params: RequestParams = {}) =>
    this.request<CadastralParcel, void>({
      path: `/dkp/parcels/${id}/`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Update a cadastral parcel. Requires authentication.
   *
   * @tags Cadastral Parcels
   * @name CadastralParcelUpdate
   * @request PUT:/dkp/parcels/{id}/
   * @secure
   * @response `200` `CadastralParcel`
   * @response `400` `void` Bad Request
   * @response `401` `void` Unauthorized
   * @response `404` `void` Not Found
   */
  cadastralParcelUpdate = (
    id: string,
    data: CadastralParcel,
    params: RequestParams = {},
  ) =>
    this.request<CadastralParcel, void>({
      path: `/dkp/parcels/${id}/`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Partially update a cadastral parcel. Requires authentication.
   *
   * @tags Cadastral Parcels
   * @name CadastralParcelPartialUpdate
   * @request PATCH:/dkp/parcels/{id}/
   * @secure
   * @response `200` `CadastralParcel`
   * @response `400` `void` Bad Request
   * @response `401` `void` Unauthorized
   * @response `404` `void` Not Found
   */
  cadastralParcelPartialUpdate = (
    id: string,
    data: CadastralParcel,
    params: RequestParams = {},
  ) =>
    this.request<CadastralParcel, void>({
      path: `/dkp/parcels/${id}/`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Delete a cadastral parcel. Requires authentication.
   *
   * @tags Cadastral Parcels
   * @name CadastralParcelDelete
   * @request DELETE:/dkp/parcels/{id}/
   * @secure
   * @response `204` `void` No Content
   * @response `401` `void` Unauthorized
   * @response `404` `void` Not Found
   */
  cadastralParcelDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/dkp/parcels/${id}/`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
