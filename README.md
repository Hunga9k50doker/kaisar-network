# KAISAR NETWORK

Your compute, your currency
Transform your compute power into real earnings

# Kaisar Beta Cli Mode

## Features

- Support Multy accounts.
- Support Proxy.

## Requirements

- Node.js 20+
- Dependencies installed via `npm install`

## Files

- **if you already have account you can create file manually**
- `tokens.txt`: Stores access_tokens each line 1 account.
- `id.txt`: Stores Extension IDs each line 1 account.
- `proxy.txt`: stores Proxy url format `http://user:pass@ip:port` each line 1 proxy.
- **if you register using cli, file above auto filled, just fill `data.txt` with your email|password.**
- `data.txt`: Store email|password account 1 line 1 account.

## Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/Hunga9k50doker/kaisar-network.git
   cd kaisar-network
   ```
2. install dependencies:
   ```bash
   npm install
   ```
3. Register or Login to get Access Token
   ```bash
   npm run auth
   ```
4. Create Extension ID for new account
   ```bash
   npm run setup
   ```
5. Run the bot:
   ```bash
   node kai
   ```

   ```bash
   npm kai-proxy
   ```
