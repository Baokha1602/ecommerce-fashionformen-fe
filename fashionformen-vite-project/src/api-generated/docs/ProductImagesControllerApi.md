# ProductImagesControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createProductImages**](#createproductimages) | **POST** /api/product-images | |
|[**deleteProductImages**](#deleteproductimages) | **DELETE** /api/product-images/{id} | |
|[**getAllProductImagess**](#getallproductimagess) | **GET** /api/product-images | |
|[**getProductImagesById**](#getproductimagesbyid) | **GET** /api/product-images/{id} | |
|[**updateProductImages**](#updateproductimages) | **PUT** /api/product-images/{id} | |

# **createProductImages**
> ApiResponseProductImagesResponse createProductImages(productImagesRequest)


### Example

```typescript
import {
    ProductImagesControllerApi,
    Configuration,
    ProductImagesRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductImagesControllerApi(configuration);

let productImagesRequest: ProductImagesRequest; //

const { status, data } = await apiInstance.createProductImages(
    productImagesRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productImagesRequest** | **ProductImagesRequest**|  | |


### Return type

**ApiResponseProductImagesResponse**

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

# **deleteProductImages**
> ApiResponseVoid deleteProductImages()


### Example

```typescript
import {
    ProductImagesControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductImagesControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deleteProductImages(
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

# **getAllProductImagess**
> ApiResponseListProductImagesResponse getAllProductImagess()


### Example

```typescript
import {
    ProductImagesControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductImagesControllerApi(configuration);

const { status, data } = await apiInstance.getAllProductImagess();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListProductImagesResponse**

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

# **getProductImagesById**
> ApiResponseProductImagesResponse getProductImagesById()


### Example

```typescript
import {
    ProductImagesControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductImagesControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getProductImagesById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseProductImagesResponse**

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

# **updateProductImages**
> ApiResponseProductImagesResponse updateProductImages(productImagesRequest)


### Example

```typescript
import {
    ProductImagesControllerApi,
    Configuration,
    ProductImagesRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductImagesControllerApi(configuration);

let id: number; // (default to undefined)
let productImagesRequest: ProductImagesRequest; //

const { status, data } = await apiInstance.updateProductImages(
    id,
    productImagesRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productImagesRequest** | **ProductImagesRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseProductImagesResponse**

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

