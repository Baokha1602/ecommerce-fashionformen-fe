# AdminOrderControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getAllOrders**](#getallorders) | **GET** /api/admin/orders | |
|[**getOrderDetail**](#getorderdetail) | **GET** /api/admin/orders/{orderId} | |
|[**getOrderStats**](#getorderstats) | **GET** /api/admin/orders/stats | |
|[**updateOrderStatus**](#updateorderstatus) | **PUT** /api/admin/orders/{orderId}/status | |

# **getAllOrders**
> ApiResponsePageOrderResponse getAllOrders()


### Example

```typescript
import {
    AdminOrderControllerApi,
    Configuration,
    Pageable
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminOrderControllerApi(configuration);

let pageable: Pageable; // (default to undefined)
let orderStatus: 'PENDING' | 'PROCESSING' | 'DELIVERING' | 'DELIVERED' | 'CANCELLED'; // (optional) (default to undefined)
let paymentMethod: 'COD' | 'MOMO' | 'VN_PAY'; // (optional) (default to undefined)
let dateFrom: string; // (optional) (default to undefined)
let dateTo: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getAllOrders(
    pageable,
    orderStatus,
    paymentMethod,
    dateFrom,
    dateTo
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pageable** | **Pageable** |  | defaults to undefined|
| **orderStatus** | [**&#39;PENDING&#39; | &#39;PROCESSING&#39; | &#39;DELIVERING&#39; | &#39;DELIVERED&#39; | &#39;CANCELLED&#39;**]**Array<&#39;PENDING&#39; &#124; &#39;PROCESSING&#39; &#124; &#39;DELIVERING&#39; &#124; &#39;DELIVERED&#39; &#124; &#39;CANCELLED&#39;>** |  | (optional) defaults to undefined|
| **paymentMethod** | [**&#39;COD&#39; | &#39;MOMO&#39; | &#39;VN_PAY&#39;**]**Array<&#39;COD&#39; &#124; &#39;MOMO&#39; &#124; &#39;VN_PAY&#39;>** |  | (optional) defaults to undefined|
| **dateFrom** | [**string**] |  | (optional) defaults to undefined|
| **dateTo** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ApiResponsePageOrderResponse**

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

# **getOrderDetail**
> ApiResponseOrderAdminResponse getOrderDetail()


### Example

```typescript
import {
    AdminOrderControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminOrderControllerApi(configuration);

let orderId: number; // (default to undefined)

const { status, data } = await apiInstance.getOrderDetail(
    orderId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **orderId** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseOrderAdminResponse**

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

# **getOrderStats**
> ApiResponseOrderStatsResponse getOrderStats()


### Example

```typescript
import {
    AdminOrderControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminOrderControllerApi(configuration);

let dateFrom: string; // (optional) (default to undefined)
let dateTo: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getOrderStats(
    dateFrom,
    dateTo
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **dateFrom** | [**string**] |  | (optional) defaults to undefined|
| **dateTo** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ApiResponseOrderStatsResponse**

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

# **updateOrderStatus**
> ApiResponseOrderResponse updateOrderStatus(orderStatusUpdateRequest)


### Example

```typescript
import {
    AdminOrderControllerApi,
    Configuration,
    OrderStatusUpdateRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminOrderControllerApi(configuration);

let orderId: number; // (default to undefined)
let orderStatusUpdateRequest: OrderStatusUpdateRequest; //

const { status, data } = await apiInstance.updateOrderStatus(
    orderId,
    orderStatusUpdateRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **orderStatusUpdateRequest** | **OrderStatusUpdateRequest**|  | |
| **orderId** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseOrderResponse**

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

