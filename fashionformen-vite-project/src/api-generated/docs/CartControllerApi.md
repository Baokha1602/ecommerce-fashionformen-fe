# CartControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addCartItem**](#addcartitem) | **POST** /api/cart/items | |
|[**applyCoupon**](#applycoupon) | **POST** /api/cart/coupon | |
|[**clearCart**](#clearcart) | **DELETE** /api/cart | |
|[**getCartDetails**](#getcartdetails) | **GET** /api/cart | |
|[**removeCartItem**](#removecartitem) | **DELETE** /api/cart/items/{cartItemId} | |
|[**removeCoupon**](#removecoupon) | **DELETE** /api/cart/coupon | |
|[**updateCartItem**](#updatecartitem) | **PUT** /api/cart/items/{cartItemId} | |

# **addCartItem**
> ApiResponseCartResponse addCartItem(cartItemRequest)


### Example

```typescript
import {
    CartControllerApi,
    Configuration,
    CartItemRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new CartControllerApi(configuration);

let cartItemRequest: CartItemRequest; //

const { status, data } = await apiInstance.addCartItem(
    cartItemRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **cartItemRequest** | **CartItemRequest**|  | |


### Return type

**ApiResponseCartResponse**

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

# **applyCoupon**
> ApiResponseCartResponse applyCoupon()


### Example

```typescript
import {
    CartControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CartControllerApi(configuration);

let couponCode: string; // (default to undefined)

const { status, data } = await apiInstance.applyCoupon(
    couponCode
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **couponCode** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseCartResponse**

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

# **clearCart**
> ApiResponseVoid clearCart()


### Example

```typescript
import {
    CartControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CartControllerApi(configuration);

const { status, data } = await apiInstance.clearCart();
```

### Parameters
This endpoint does not have any parameters.


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

# **getCartDetails**
> ApiResponseCartResponse getCartDetails()


### Example

```typescript
import {
    CartControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CartControllerApi(configuration);

const { status, data } = await apiInstance.getCartDetails();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseCartResponse**

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

# **removeCartItem**
> ApiResponseCartResponse removeCartItem()


### Example

```typescript
import {
    CartControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CartControllerApi(configuration);

let cartItemId: number; // (default to undefined)

const { status, data } = await apiInstance.removeCartItem(
    cartItemId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **cartItemId** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseCartResponse**

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

# **removeCoupon**
> ApiResponseCartResponse removeCoupon()


### Example

```typescript
import {
    CartControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CartControllerApi(configuration);

const { status, data } = await apiInstance.removeCoupon();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseCartResponse**

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

# **updateCartItem**
> ApiResponseCartResponse updateCartItem(cartItemRequest)


### Example

```typescript
import {
    CartControllerApi,
    Configuration,
    CartItemRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new CartControllerApi(configuration);

let cartItemId: number; // (default to undefined)
let cartItemRequest: CartItemRequest; //

const { status, data } = await apiInstance.updateCartItem(
    cartItemId,
    cartItemRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **cartItemRequest** | **CartItemRequest**|  | |
| **cartItemId** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseCartResponse**

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

