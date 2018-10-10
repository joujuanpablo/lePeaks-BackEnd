import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const params = {
    TableName: "contacts"
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    if (result.Items) {
      // Return the retrieved item
      callback(null, success(result.Items));
    } else {
        console.log(result.Items, 'result.Items');
      callback(null, failure({ status: false, error: "Item not found." }));
    }
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}
