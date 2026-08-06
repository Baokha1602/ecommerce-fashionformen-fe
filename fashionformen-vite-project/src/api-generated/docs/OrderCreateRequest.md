# OrderCreateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**userAddressId** | **number** |  | [default to undefined]
**firstName** | **string** |  | [default to undefined]
**lastName** | **string** |  | [default to undefined]
**phoneNumber** | **string** |  | [default to undefined]
**email** | **string** |  | [optional] [default to undefined]
**paymentMethod** | **string** |  | [default to undefined]
**notes** | **string** |  | [optional] [default to undefined]
**selectedCartItemIds** | **Array&lt;number&gt;** |  | [default to undefined]

## Example

```typescript
import { OrderCreateRequest } from './api';

const instance: OrderCreateRequest = {
    userAddressId,
    firstName,
    lastName,
    phoneNumber,
    email,
    paymentMethod,
    notes,
    selectedCartItemIds,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
