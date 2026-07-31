# ProductControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createProduct**](#createproduct) | **POST** /api/products | |
|[**deleteProduct**](#deleteproduct) | **DELETE** /api/products/{id} | |
|[**getAllProducts**](#getallproducts) | **GET** /api/products | |
|[**getProductById**](#getproductbyid) | **GET** /api/products/{id} | |
|[**updateProduct**](#updateproduct) | **PUT** /api/products/{id} | |

# **createProduct**
> ApiResponseProductResponse createProduct(productRequest)


### Example

```typescript
import {
    ProductControllerApi,
    Configuration,
    ProductRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductControllerApi(configuration);

let productRequest: ProductRequest; //

const { status, data } = await apiInstance.createProduct(
    productRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productRequest** | **ProductRequest**|  | |


### Return type

**ApiResponseProductResponse**

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

# **deleteProduct**
> ApiResponseVoid deleteProduct()


### Example

```typescript
import {
    ProductControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deleteProduct(
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

# **getAllProducts**
> ApiResponseListProductResponse getAllProducts()


### Example

```typescript
import {
    ProductControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductControllerApi(configuration);

const { status, data } = await apiInstance.getAllProducts();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListProductResponse**

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

# **getProductById**
> ApiResponseProductResponse getProductById()


### Example

```typescript
import {
    ProductControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getProductById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseProductResponse**

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

# **updateProduct**
> ApiResponseProductResponse updateProduct(productRequest)


### Example

```typescript
import {
    ProductControllerApi,
    Configuration,
    ProductRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductControllerApi(configuration);

let id: number; // (default to undefined)
let productRequest: ProductRequest; //

const { status, data } = await apiInstance.updateProduct(
    id,
    productRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productRequest** | **ProductRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseProductResponse**

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

