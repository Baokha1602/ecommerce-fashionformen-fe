# ProductReviewsControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createProductReviews**](#createproductreviews) | **POST** /api/product-reviews | |
|[**deleteProductReviews**](#deleteproductreviews) | **DELETE** /api/product-reviews/{id} | |
|[**getAllProductReviewss**](#getallproductreviewss) | **GET** /api/product-reviews | |
|[**getProductReviewsById**](#getproductreviewsbyid) | **GET** /api/product-reviews/{id} | |
|[**updateProductReviews**](#updateproductreviews) | **PUT** /api/product-reviews/{id} | |

# **createProductReviews**
> ApiResponseProductReviewsResponse createProductReviews(productReviewsRequest)


### Example

```typescript
import {
    ProductReviewsControllerApi,
    Configuration,
    ProductReviewsRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductReviewsControllerApi(configuration);

let productReviewsRequest: ProductReviewsRequest; //

const { status, data } = await apiInstance.createProductReviews(
    productReviewsRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productReviewsRequest** | **ProductReviewsRequest**|  | |


### Return type

**ApiResponseProductReviewsResponse**

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

# **deleteProductReviews**
> ApiResponseVoid deleteProductReviews()


### Example

```typescript
import {
    ProductReviewsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductReviewsControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deleteProductReviews(
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

# **getAllProductReviewss**
> ApiResponseListProductReviewsResponse getAllProductReviewss()


### Example

```typescript
import {
    ProductReviewsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductReviewsControllerApi(configuration);

const { status, data } = await apiInstance.getAllProductReviewss();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListProductReviewsResponse**

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

# **getProductReviewsById**
> ApiResponseProductReviewsResponse getProductReviewsById()


### Example

```typescript
import {
    ProductReviewsControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductReviewsControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getProductReviewsById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseProductReviewsResponse**

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

# **updateProductReviews**
> ApiResponseProductReviewsResponse updateProductReviews(productReviewsRequest)


### Example

```typescript
import {
    ProductReviewsControllerApi,
    Configuration,
    ProductReviewsRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ProductReviewsControllerApi(configuration);

let id: number; // (default to undefined)
let productReviewsRequest: ProductReviewsRequest; //

const { status, data } = await apiInstance.updateProductReviews(
    id,
    productReviewsRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **productReviewsRequest** | **ProductReviewsRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseProductReviewsResponse**

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

