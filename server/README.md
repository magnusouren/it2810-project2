# Server

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the root directory of the server directory. The file should contain the following variables:

```.env
MONGODB_USER=<username>
MONGODB_PASSWORD=<password>
MONGODB_DB=bingewatcher
```

<b>NB:</b> Your MongoDB user should have read and write access to the `bingewatcher` database. Your IP address must also be whitelisted.

## Usage

```bash
npm start
```
