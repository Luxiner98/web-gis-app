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

export interface CadastralMunicipality {
  /**
   * Municipality number
   * @minLength 1
   * @maxLength 10
   */
  municipality_number: string;
  /**
   * Area
   * @format decimal
   */
  area?: string | null;
  /** Geom */
  geom?: string | null;
}

export interface CadastralParcel {
  /** ID */
  id?: number;
  /**
   * Parcel number
   * @minLength 1
   */
  parcel_number: string;
  /**
   * Area
   * @format decimal
   */
  area?: string | null;
  /** Cadastral municipality */
  cadastral_municipality: string;
  /** Geom */
  geom?: string | null;
}

export interface User {
  /**
   * Email
   * @format email
   * @minLength 1
   * @maxLength 255
   */
  email: string;
  /**
   * Lozinka
   * @minLength 8
   * @maxLength 128
   */
  password: string;
}

export interface UserDetailUpdate {
  /**
   * First name
   * @maxLength 127
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 127
   */
  last_name?: string;
  /** Language preference */
  language_preference?: "hr" | "en";
}

export interface PasswordChange {
  /**
   * New password
   * @minLength 1
   */
  new_password: string;
  /**
   * Old password
   * @minLength 1
   */
  old_password: string;
}

export interface UserDetail {
  /** ID */
  id?: number;
  /**
   * First name
   * @maxLength 127
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 127
   */
  last_name?: string;
  /**
   * Username
   * @maxLength 255
   */
  username?: string;
  /**
   * Email
   * @format email
   * @minLength 1
   * @maxLength 255
   */
  email: string;
  /** Organization name */
  organization_name?: string;
  /** Language preference */
  language_preference?: "hr" | "en";
}

export interface PasswordReset {
  /**
   * Email
   * @minLength 1
   */
  email: string;
}

export interface PasswordResetConfirm {
  /**
   * New password
   * @minLength 1
   */
  new_password: string;
  /**
   * Token
   * @minLength 1
   */
  token: string;
}

export interface CustomTokenObtainPair {
  /**
   * Email
   * @minLength 1
   */
  email: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface CustomCookieTokenRefresh {
  /**
   * Access
   * @minLength 1
   */
  access?: string;
}

export interface TokenVerify {
  /**
   * Token
   * @minLength 1
   */
  token: string;
}
