import { GraphQLFieldConfig, GraphQLInputFieldConfig } from 'graphql';

declare global {
  export type FieldConfigMap<T, K extends string = keyof T> = {
    [key in keyof T | K]: GraphQLFieldConfig<T, any>
  };

  export type InputFieldConfigMap<T, K extends string = keyof T> = {
    [key in keyof T | K]: GraphQLInputFieldConfig
  };

  export type FieldConfig<T = any> = GraphQLFieldConfig<T, any>;
}

export {};
