import { util } from '@aws-appsync/utils';
import { remove } from '@aws-appsync/utils/dynamodb';

/**
 * Deletes an item with Empid `ctx.args.input.Empid` from the DynamoDB table.
 * @param {import('@aws-appsync/utils').Context<{input: {Empid: unknown;}}>} ctx the context
 * @returns {import('@aws-appsync/utils').DynamoDBDeleteItemRequest} the request
 */
export function request(ctx) {
    const { Empid } = ctx.args.input;
    const key = { Empid };
    return remove({
        key,
    })
}

/**
 * Returns the deleted item. Throws an error if the operation failed.
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the deleted item
 */
export function response(ctx) {
    const { error, result } = ctx;
    if (error) {
        return util.appendError(error.message, error.type, result);
    }
    return result;
}
