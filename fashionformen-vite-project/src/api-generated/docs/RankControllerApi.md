# RankControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**create2**](#create2) | **POST** /api/ranks | |
|[**delete2**](#delete2) | **DELETE** /api/ranks/{id} | |
|[**getAll1**](#getall1) | **GET** /api/ranks | |
|[**getById2**](#getbyid2) | **GET** /api/ranks/{id} | |
|[**patch**](#patch) | **PATCH** /api/ranks/{id} | |
|[**update2**](#update2) | **PUT** /api/ranks/{id} | |

# **create2**
> ApiResponseRankResponse create2(rankUpsertRequest)


### Example

```typescript
import {
    RankControllerApi,
    Configuration,
    RankUpsertRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new RankControllerApi(configuration);

let rankUpsertRequest: RankUpsertRequest; //

const { status, data } = await apiInstance.create2(
    rankUpsertRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **rankUpsertRequest** | **RankUpsertRequest**|  | |


### Return type

**ApiResponseRankResponse**

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

# **delete2**
> ApiResponseVoid delete2()


### Example

```typescript
import {
    RankControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RankControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.delete2(
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

# **getAll1**
> ApiResponseListRankResponse getAll1()


### Example

```typescript
import {
    RankControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RankControllerApi(configuration);

const { status, data } = await apiInstance.getAll1();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListRankResponse**

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

# **getById2**
> ApiResponseRankResponse getById2()


### Example

```typescript
import {
    RankControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RankControllerApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getById2(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseRankResponse**

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

# **patch**
> ApiResponseRankResponse patch(rankUpsertRequest)


### Example

```typescript
import {
    RankControllerApi,
    Configuration,
    RankUpsertRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new RankControllerApi(configuration);

let id: number; // (default to undefined)
let rankUpsertRequest: RankUpsertRequest; //

const { status, data } = await apiInstance.patch(
    id,
    rankUpsertRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **rankUpsertRequest** | **RankUpsertRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseRankResponse**

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

# **update2**
> ApiResponseRankResponse update2(rankUpsertRequest)


### Example

```typescript
import {
    RankControllerApi,
    Configuration,
    RankUpsertRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new RankControllerApi(configuration);

let id: number; // (default to undefined)
let rankUpsertRequest: RankUpsertRequest; //

const { status, data } = await apiInstance.update2(
    id,
    rankUpsertRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **rankUpsertRequest** | **RankUpsertRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseRankResponse**

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

