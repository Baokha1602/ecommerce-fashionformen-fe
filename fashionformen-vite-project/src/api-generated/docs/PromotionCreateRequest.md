# PromotionCreateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** |  | [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**startDate** | **string** |  | [default to undefined]
**endDate** | **string** |  | [default to undefined]
**isActive** | **boolean** |  | [optional] [default to undefined]
**promotionProducts** | [**Array&lt;PromotionProductRequest&gt;**](PromotionProductRequest.md) |  | [optional] [default to undefined]

## Example

```typescript
import { PromotionCreateRequest } from './api';

const instance: PromotionCreateRequest = {
    name,
    description,
    startDate,
    endDate,
    isActive,
    promotionProducts,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
