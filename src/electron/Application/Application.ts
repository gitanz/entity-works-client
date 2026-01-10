export interface Application<TArgs extends any[] = any[], TResult = void> {
    execute(...args: TArgs): Promise<TResult>;
}