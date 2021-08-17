
# TodoApp API

## Auth

### **Login**

[POST] http://localhost:8000/api/user/login/

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |

**Request Body**

Object

| Name | Type | Required |
| --- | --- | --- |
| email | string | true |
| password | string | true |

#### *Response*

**200: OK**

    {
        refresh: string,
        access: string,
        user: {
            id: number,
            email: string,
            user_name: string,
        },
    }

### **Logout**

[POST] http://localhost:8000/api/user/logout/blacklist/

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |
| Authorization | JWT {{**access token**}} |

**Request Body**

Object

| Name | Type | Required |
| --- | --- | --- |
| refresh_token | string | true |

#### *Response*

**205: Reset Content**

## Users

### **Register user**

[POST] http://localhost:8000/api/user/register/

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |

**Request Body**

Object

| Name | Type | Required |
| --- | --- | --- |
| email | string | true |
| user_name | string | true |
| password | string | true |

#### *Response*

**201: Created**

    {
        id: number,
        email: string,
        user_name: string,
    }

### **Get current user**

[GET] http://localhost:8000/api/user/profile/

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |
| Authorization | JWT {{**access token**}} |

#### *Response*

**200: OK**

    {
        id: number,
        user_name: string,
        email: string,
        start_date: Date,
        is_active: boolean,
        is_staff: boolean,
    }

## Todo

### **Get todo**

[GET] http://localhost:8000/api/todo/:id/

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |
| Authorization | JWT {{**access token**}} |

#### *Response*

**200: OK**

    {
        id: number,
        creator: number,
        title: string,
        description: string,
        completed: boolean,
        created_at: Date,
        updated_at: Date,
    }

### **Get todos**

[GET] http://localhost:8000/api/todo/

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |
| Authorization | JWT {{**access token**}} |

#### *Response*

**200: OK**

    [
        {
            id: number,
            creator: number,
            title: string,
            description: string,
            completed: boolean,
            created_at: Date,
            updated_at: Date,
        },
        { ... },
        { ... },
    ]

### **Create todo**

[POST] http://localhost:8000/api/todo/

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |
| Authorization | JWT {{**access token**}} |

**Request Body**

Object

| Name | Type | Required |
| --- | --- | --- |
| title | string | true |
| creator | number | true |
| description | string | true |
| completed | boolean | optional |

#### *Response*

**201: Created**

    {
        id: number,
        creator: number,
        title: string,
        description: string,
        completed: boolean,
        created_at: Date,
        updated_at: Date,
    }

### **Update todo**

[PUT] http://localhost:8000/api/todo/:id/

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |
| Authorization | JWT {{**access token**}} |

**Request Body**

Object

| Name | Type | Required |
| --- | --- | --- |
| title | string | true |
| creator | number | true |
| description | string | true |
| completed | boolean | optional |

#### *Response*

**200: OK**

    {
        id: number,
        creator: number,
        title: string,
        description: string,
        completed: boolean,
        created_at: Date,
        updated_at: Date,
    }

### **Delete todo**

[DELETE] http://localhost:8000/api/todo/:id/

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |
| Authorization | JWT {{**access token**}} |

#### *Response*

**204: No Content**
