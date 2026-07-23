# AdminPromotionControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addProducts**](#addproducts) | **POST** /api/admin/promotions/{id}/products | |
|[**createPromotion**](#createpromotion) | **POST** /api/admin/promotions | |
|[**deletePromotion**](#deletepromotion) | **DELETE** /api/admin/promotions/{id} | |
|[**getAllPromotions**](#getallpromotions) | **GET** /api/admin/promotions | |
|[**getPromotion**](#getpromotion) | **GET** /api/admin/promotions/{id} | |
|[**removeProducts**](#removeproducts) | **DELETE** /api/admin/promotions/{id}/products | |
|[**updatePromotion**](#updatepromotion) | **PUT** /api/admin/promotions/{id} | |

# **addProducts**
> ApiResponsePromotionResponse addProducts(promotionProductRequest)


### Example

```typescript
import {
    AdminPromotionControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminPromotionControllerApi(configuration);

let id: number; // (default to undefined)
let promotionProductRequest: Array<PromotionProductRequest>; //

const { status, data } = await apiInstance.addProducts(
    id,
    promotionProductRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **promotionProductRequest** | **Array<PromotionProductRequest>**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponsePromotionResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createPromotion**
> ApiResponsePromotionResponse createPromotion(promotionCreateRequest)


### Example

```typescript
import {
    AdminPromotionControllerApi,
    Configuration,
    PromotionCreateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminPromotionControllerApi(configuration);

let promotionCreateRequest: PromotionCreateRequest; //

const { status, data } = await apiInstance.createPromotion(
    promotionCreateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **promotionCreateRequest** | **PromotionCreateRequest**|  | |


### Return type

**ApiResponsePromotionResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deletePromotion**
> ApiResponseVoid deletePromotion()


### Example

```typescript
import {
    AdminPromotionControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminPromotionControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deletePromotion(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseVoid**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAllPromotions**
> ApiResponseListPromotionResponse getAllPromotions()


### Example

```typescript
import {
    AdminPromotionControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminPromotionControllerApi(configuration);

const { status, data } = await apiInstance.getAllPromotions();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListPromotionResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPromotion**
> ApiResponsePromotionResponse getPromotion()


### Example

```typescript
import {
    AdminPromotionControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminPromotionControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getPromotion(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponsePromotionResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **removeProducts**
> ApiResponsePromotionResponse removeProducts(requestBody)


### Example

```typescript
import {
    AdminPromotionControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminPromotionControllerApi(configuration);

let id: number; // (default to undefined)
let requestBody: Array<number>; //

const { status, data } = await apiInstance.removeProducts(
    id,
    requestBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requestBody** | **Array<number>**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponsePromotionResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updatePromotion**
> ApiResponsePromotionResponse updatePromotion(promotionCreateRequest)


### Example

```typescript
import {
    AdminPromotionControllerApi,
    Configuration,
    PromotionCreateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminPromotionControllerApi(configuration);

let id: number; // (default to undefined)
let promotionCreateRequest: PromotionCreateRequest; //

const { status, data } = await apiInstance.updatePromotion(
    id,
    promotionCreateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **promotionCreateRequest** | **PromotionCreateRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponsePromotionResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

