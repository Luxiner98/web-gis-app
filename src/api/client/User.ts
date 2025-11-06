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

import type {
  CustomCookieTokenRefresh,
  CustomTokenObtainPair,
  PasswordChange,
  PasswordReset,
  PasswordResetConfirm,
  TokenVerify,
  User,
  UserDetail,
  UserDetailUpdate,
} from "./data-contracts";
import { ContentType, HttpClient, type RequestParams } from "./http-client";

export class User<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Activate user account via email confirmation link.
   *
   * @tags user
   * @name UserActivateRead
   * @request GET:/user/activate/{uidb64}/{token}/
   * @secure
   * @response `200` `void`
   */
  userActivateRead = (
    uidb64: string,
    token: string,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/user/activate/${uidb64}/${token}/`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Create a new user in the system.
   *
   * @tags user
   * @name UserCreateCreate
   * @request POST:/user/create/
   * @secure
   * @response `201` `User`
   */
  userCreateCreate = (data: User, params: RequestParams = {}) =>
    this.request<User, any>({
      path: `/user/create/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get details for request user
   *
   * @tags user
   * @name UserDetail
   * @request GET:/user/me/
   * @secure
   * @response `200` `void` OK
   * @response `400` `void` Bad Request
   */
  userDetail = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/user/me/`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Update details for request user
   *
   * @tags user
   * @name UserDetailUpdate
   * @request PUT:/user/me/
   * @secure
   * @response `200` `void` OK
   * @response `400` `void` Bad Request
   */
  userDetailUpdate = (data: UserDetailUpdate, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/user/me/`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name UserMeChangePasswordUpdate
   * @request PUT:/user/me/change-password/
   * @secure
   * @response `200` `PasswordChange`
   */
  userMeChangePasswordUpdate = (
    data: PasswordChange,
    params: RequestParams = {},
  ) =>
    this.request<PasswordChange, any>({
      path: `/user/me/change-password/`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name UserMeChangePasswordPartialUpdate
   * @request PATCH:/user/me/change-password/
   * @secure
   * @response `200` `PasswordChange`
   */
  userMeChangePasswordPartialUpdate = (
    data: PasswordChange,
    params: RequestParams = {},
  ) =>
    this.request<PasswordChange, any>({
      path: `/user/me/change-password/`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
 * @description Lists users that belong to an organization, restricted by admin role. Regular users cannot access this view.
 *
 * @tags user
 * @name UserOrganizationUsersList
 * @request GET:/user/organization/{id}/users/
 * @secure
 * @response `200` `{
    count: number,
  \** @format uri *\
    next?: string | null,
  \** @format uri *\
    previous?: string | null,
    results: (UserDetail)[],

}`
 */
  userOrganizationUsersList = (
    id: string,
    query?: {
      /** Which field to use when ordering the results. */
      ordering?: string;
      /** A page number within the paginated result set. */
      page?: number;
      /** Number of results to return per page. */
      page_size?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        count: number;
        /** @format uri */
        next?: string | null;
        /** @format uri */
        previous?: string | null;
        results: UserDetail[];
      },
      any
    >({
      path: `/user/organization/${id}/users/`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Use this endpoint to send email to user with password reset key.
   *
   * @tags user
   * @name UserPasswordResetCreate
   * @request POST:/user/password-reset/
   * @secure
   * @response `201` `PasswordReset`
   */
  userPasswordResetCreate = (data: PasswordReset, params: RequestParams = {}) =>
    this.request<PasswordReset, any>({
      path: `/user/password-reset/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Use this endpoint to finish reset password process.
   *
   * @tags user
   * @name UserPasswordResetConfirmCreate
   * @request POST:/user/password-reset/{uid}/confirm/
   * @secure
   * @response `201` `PasswordResetConfirm`
   */
  userPasswordResetConfirmCreate = (
    uid: string,
    data: PasswordResetConfirm,
    params: RequestParams = {},
  ) =>
    this.request<PasswordResetConfirm, any>({
      path: `/user/password-reset/${uid}/confirm/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name UserTokenCreate
   * @request POST:/user/token/
   * @secure
   * @response `201` `CustomTokenObtainPair`
   */
  userTokenCreate = (data: CustomTokenObtainPair, params: RequestParams = {}) =>
    this.request<CustomTokenObtainPair, any>({
      path: `/user/token/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Logout user and  clean cookies
   *
   * @tags user
   * @name LogoutUser
   * @request POST:/user/token/logout/
   * @secure
   * @response `200` `void` OK
   * @response `400` `void` Bad Request
   */
  logoutUser = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/user/token/logout/`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name UserTokenRefreshCreate
   * @request POST:/user/token/refresh/
   * @secure
   * @response `201` `CustomCookieTokenRefresh`
   */
  userTokenRefreshCreate = (
    data: CustomCookieTokenRefresh,
    params: RequestParams = {},
  ) =>
    this.request<CustomCookieTokenRefresh, any>({
      path: `/user/token/refresh/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Takes a token and indicates if it is valid.  This view provides no information about a token's fitness for a particular use.
   *
   * @tags user
   * @name UserTokenVerifyCreate
   * @request POST:/user/token/verify/
   * @secure
   * @response `201` `TokenVerify`
   */
  userTokenVerifyCreate = (data: TokenVerify, params: RequestParams = {}) =>
    this.request<TokenVerify, any>({
      path: `/user/token/verify/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Ensure users from other orgs cannot be deleted
   *
   * @tags user
   * @name UserDeleteDelete
   * @request DELETE:/user/{id}/delete/
   * @secure
   * @response `204` `void`
   */
  userDeleteDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/user/${id}/delete/`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name UserEditUpdate
   * @request PUT:/user/{id}/edit/
   * @secure
   * @response `200` `User`
   */
  userEditUpdate = (id: number, data: User, params: RequestParams = {}) =>
    this.request<User, any>({
      path: `/user/${id}/edit/`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name UserEditPartialUpdate
   * @request PATCH:/user/{id}/edit/
   * @secure
   * @response `200` `User`
   */
  userEditPartialUpdate = (
    id: number,
    data: User,
    params: RequestParams = {},
  ) =>
    this.request<User, any>({
      path: `/user/${id}/edit/`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
