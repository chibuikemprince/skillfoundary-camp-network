# Social Media Integration with Camp Network Blockchain

## Overview

SkillFoundry now includes social media account connections integrated with the Camp Network blockchain using originSDK. This feature allows learners to:

- Connect social media accounts (Twitter, LinkedIn, GitHub, Discord)
- Link learning progress to blockchain-verified credentials
- Share achievements on social platforms
- Build a verifiable learning portfolio

## Features

### Social Account Connections
- **Supported Platforms**: Twitter, LinkedIn, GitHub, Discord
- **Wallet Integration**: Optional wallet address linking
- **Account Management**: Connect/disconnect accounts easily

### Camp Network Blockchain Integration
- **Verified Credentials**: Learning progress stored on blockchain
- **originSDK Integration**: Seamless blockchain connectivity
- **Decentralized Identity**: Portable learning credentials

## API Endpoints

### Social Connections
- `GET /api/social/connections` - Get user's connected accounts
- `POST /api/social/connect` - Connect a social media account
- `DELETE /api/social/disconnect/:platform` - Disconnect an account

### Camp Network
- `POST /api/social/camp-network/verify` - Verify Camp Network ID

## Usage

### Frontend Component
The `SocialConnections` component is integrated into the dashboard and provides:
- Visual connection status for each platform
- Easy connect/disconnect functionality
- Camp Network ID verification
- Wallet address linking

### Backend Integration
- User model extended with social connections
- Secure API endpoints for account management
- Blockchain integration ready for originSDK

## Data Structure

```typescript
interface SocialConnection {
  platform: string;
  username: string;
  walletAddress?: string;
  isVerified: boolean;
  connectedAt: Date;
}
```

## Security Features

- JWT authentication required for all social endpoints
- Input validation and sanitization
- Secure wallet address handling
- Platform-specific connection limits

## Future Enhancements

- Automatic achievement sharing
- Cross-platform progress synchronization
- NFT certificate generation
- Social learning features
- Reputation scoring system