# ProductVariantsControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**create3**](#create3) | **POST** /api/product-variants | |
|[**delete3**](#delete3) | **DELETE** /api/product-variants/{id} | |
|[**getAll3**](#getall3) | **GET** /api/product-variants | |
|[**getById3**](#getbyid3) | **GET** /api/product-variants/{id} | |
|[**update3**](#update3) | **PUT** /api/product-variants/{id} | |

# **create3**
> ApiResponseProductVariantResponse create3(productVariantRequest)


### Example

```typescript
import {
    ProductVariantsControllerApi,
    Configuration,
    ProductVariantRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductVariantsControllerApi(configuration);

let productVariantRequest: ProductVariantRequest; //

const { status, data } = await apiInstance.create3(
    productVariantRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productVariantRequest** | **ProductVariantRequest**|  | |


### Return type

**ApiResponseProductVariantResponse**

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

# **delete3**
> ApiResponseVoid delete3()


### Example

```typescript
import {
    ProductVariantsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductVariantsControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.delete3(
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

# **getAll3**
> ApiResponseListProductVariantResponse getAll3()


### Example

```typescript
import {
    ProductVariantsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductVariantsControllerApi(configuration);

const { status, data } = await apiInstance.getAll3();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListProductVariantResponse**

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

# **getById3**
> ApiResponseProductVariantResponse getById3()


### Example

```typescript
import {
    ProductVariantsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductVariantsControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getById3(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseProductVariantResponse**

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

# **update3**
> ApiResponseProductVariantResponse update3(productVariantRequest)


### Example

```typescript
import {
    ProductVariantsControllerApi,
    Configuration,
    ProductVariantRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductVariantsControllerApi(configuration);

let id: number; // (default to undefined)
let productVariantRequest: ProductVariantRequest; //

const { status, data } = await apiInstance.update3(
    id,
    productVariantRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productVariantRequest** | **ProductVariantRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseProductVariantResponse**

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

