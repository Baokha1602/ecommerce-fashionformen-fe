# CouponCreateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**code** | **string** |  | [default to undefined]
**name** | **string** |  | [default to undefined]
**discountRate** | **number** |  | [default to undefined]
**maxDiscountAmount** | **number** |  | [optional] [default to undefined]
**minOrderValue** | **number** |  | [default to undefined]
**startDate** | **string** |  | [default to undefined]
**endDate** | **string** |  | [default to undefined]
**usageLimit** | **number** |  | [default to undefined]
**isActive** | **boolean** |  | [optional] [default to undefined]

## Example

```typescript
import { CouponCreateRequest } from './api';

const instance: CouponCreateRequest = {
    code,
    name,
    discountRate,
    maxDiscountAmount,
    minOrderValue,
    startDate,
    endDate,
    usageLimit,
    isActive,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
