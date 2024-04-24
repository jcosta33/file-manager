# File manager

This is a simple file manager app. I have taken some inspiration from DDD when I created the frontend file structure, though not very strict. 

## Installation

```bash
npm install
npm run dev
```

This will start a simple dev server with hot reload using vite and express for some mock API requests.

## API

You find the express API under `src/server`. A file upload API is provided. You can use it and/or modify it to your needs.

### List of files

```http
GET /api/files
```

### Upload a single file

```http
POST /api/upload-single
```

| Body parameter | Type   | Description                      |
| :------------- | :----- | :------------------------------- |
| `file`         | `file` | **Required**. The file to upload |

### Upload a file in chunks

```http
POST /api/upload-chunks
```

| Body parameter      | Type     | Description                                  |
| :------------------ | :------- | :------------------------------------------- |
| `file`              | `file`   | **Required**. The file to upload             |
| `currentChunkIndex` | `number` | **Required**. The current chunk index number |
| `totalChunks`       | `number` | **Required**. The total number of chunks     |
