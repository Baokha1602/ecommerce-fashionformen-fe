# NotificationControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getMyNotifications**](#getmynotifications) | **GET** /api/notifications | |
|[**getUnreadCount**](#getunreadcount) | **GET** /api/notifications/unread-count | |
|[**markAllAsRead**](#markallasread) | **PATCH** /api/notifications/read-all | |
|[**markAsRead**](#markasread) | **PATCH** /api/notifications/{id}/read | |

# **getMyNotifications**
> ApiResponsePageNotificationResponse getMyNotifications()


### Example

```typescript
import {
    NotificationControllerApi,
    Configuration,
    Pageable
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationControllerApi(configuration);

let pageable: Pageable; // (default to undefined)

const { status, data } = await apiInstance.getMyNotifications(
    pageable
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **pageable** | **Pageable** |  | defaults to undefined|


### Return type

**ApiResponsePageNotificationResponse**

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

# **getUnreadCount**
> ApiResponseUnreadCountResponse getUnreadCount()


### Example

```typescript
import {
    NotificationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationControllerApi(configuration);

const { status, data } = await apiInstance.getUnreadCount();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseUnreadCountResponse**

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

# **markAllAsRead**
> ApiResponseVoid markAllAsRead()


### Example

```typescript
import {
    NotificationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationControllerApi(configuration);

const { status, data } = await apiInstance.markAllAsRead();
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

# **markAsRead**
> ApiResponseNotificationResponse markAsRead()


### Example

```typescript
import {
    NotificationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.markAsRead(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseNotificationResponse**

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

