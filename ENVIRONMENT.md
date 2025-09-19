# Environment Variables Setup

## Required Environment Variables

### Clerk Authentication
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
```

### UploadThing Configuration
```bash
# Token should be base64 encoded JSON: {"apiKey":"sk_live_...","appId":"your_app_id","regions":["sea1"]}
UPLOADTHING_TOKEN="your_base64_encoded_token"
UPLOADTHING_APP_ID="your_uploadthing_app_id"
UPLOADTHING_SECRET="your_uploadthing_secret_key"
```

### Neon Database
```bash
DATABASE_URL="your_neon_database_url"
```

## Important Notes

1. **UploadThing Token Format**: The token must be a base64 encoded JSON object with the structure:
   ```json
   {
     "apiKey": "sk_live_...",
     "appId": "your_app_id", 
     "regions": ["sea1"]
   }
   ```

2. **Environment File**: Create a `.env.local` file in the project root with these variables.

3. **Security**: Never commit `.env.local` to version control.
