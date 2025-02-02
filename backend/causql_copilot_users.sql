CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,                  -- 用户唯一ID，自动递增
    email VARCHAR(255) NOT NULL UNIQUE,     -- 用户邮箱，用作唯一标识
    name VARCHAR(255),                      -- 用户姓名
    avatar_url VARCHAR(255),                -- 用户头像URL
    oauth_id VARCHAR(255) UNIQUE,           -- OAuth 提供商返回的用户唯一ID
    role_id VARCHAR(255),                   -- 用户权限ID
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 用户创建时间
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- 用户更新时间
);
