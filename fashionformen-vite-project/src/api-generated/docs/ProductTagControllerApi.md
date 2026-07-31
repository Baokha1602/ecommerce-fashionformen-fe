# ProductTagControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createProductTag**](#createproducttag) | **POST** /api/product-tags | |
|[**deleteProductTag**](#deleteproducttag) | **DELETE** /api/product-tags/{id} | |
|[**getAllProductTags**](#getallproducttags) | **GET** /api/product-tags | |
|[**getProductTagById**](#getproducttagbyid) | **GET** /api/product-tags/{id} | |
|[**updateProductTag**](#updateproducttag) | **PUT** /api/product-tags/{id} | |

# **createProductTag**
> ApiResponseProductTagResponse createProductTag(productTagRequest)


### Example

```typescript
import {
    ProductTagControllerApi,
    Configuration,
    ProductTagRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductTagControllerApi(configuration);

let productTagRequest: ProductTagRequest; //

const { status, data } = await apiInstance.createProductTag(
    productTagRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productTagRequest** | **ProductTagRequest**|  | |


### Return type

**ApiResponseProductTagResponse**

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

# **deleteProductTag**
> ApiResponseVoid deleteProductTag()


### Example

```typescript
import {
    ProductTagControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductTagControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deleteProductTag(
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

# **getAllProductTags**
> ApiResponseListProductTagResponse getAllProductTags()


### Example

```typescript
import {
    ProductTagControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductTagControllerApi(configuration);

const { status, data } = await apiInstance.getAllProductTags();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListProductTagResponse**

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

# **getProductTagById**
> ApiResponseProductTagResponse getProductTagById()


### Example

```typescript
import {
    ProductTagControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductTagControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getProductTagById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseProductTagResponse**

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

# **updateProductTag**
> ApiResponseProductTagResponse updateProductTag(productTagRequest)


### Example

```typescript
import {
    ProductTagControllerApi,
    Configuration,
    ProductTagRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductTagControllerApi(configuration);

let id: number; // (default to undefined)
let productTagRequest: ProductTagRequest; //

const { status, data } = await apiInstance.updateProductTag(
    id,
    productTagRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productTagRequest** | **ProductTagRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseProductTagResponse**

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

