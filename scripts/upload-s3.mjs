// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { join, extname } from 'node:path'
import { readFile, readdir } from 'node:fs/promises'
import { parseArgs } from 'node:util'
import { PutObjectCommand, S3Client, S3ServiceException } from '@aws-sdk/client-s3'
import { fileTypeFromFile } from 'file-type'
import dotenv from 'dotenv'

import { isMain, validateArgs } from './node-util.mjs'

dotenv.config({ path: join(process.cwd(), '.env.local') })

const client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

const bucketName = process.env.AWS_S3_BUCKET_NAME

if (isMain(import.meta.url)) {
  const { errors, results } = loadArgs()

  if (!errors) {
    main({ ...results.values })
  } else {
    console.error(errors.join('\n'))
  }
}

function loadArgs() {
  const options = {
    dirname: {
      type: 'string',
    },
  }
  const results = parseArgs({ options, allowPositionals: true })
  const { errors } = validateArgs({ options }, results)

  return { errors, results }
}

async function main({ dirname, prefix = '' }) {
  await uploadDirectory({ currentDir: dirname, prefix })
}

async function uploadDirectory({ currentDir, prefix = '' }) {
  try {
    const entries = await readdir(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      const entryPath = join(currentDir, entry.name)
      const nextPrefix = prefix ? `${prefix}/${entry.name}` : entry.name

      if (entry.isDirectory()) {
        await uploadDirectory({
          currentDir: entryPath,
          prefix: nextPrefix,
        })
      } else if (entry.isFile()) {
        await uploadFile({
          sourceFilePath: entryPath,
          uploadPath: nextPrefix,
        })
      }
    }
  } catch (err) {
    console.error(`Error uploading directory ${currentDir} to S3.\n`, err)
  }
}

const ContentTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
}

// const CacheControl = {
//   '.html': 'max-age=0, s-maxage=31536000',
//   '.js': 'max-age=0, s-maxage=31536000',
//   '.css': 'max-age=0, s-maxage=31536000',
//   '.json': 'max-age=0, s-maxage=31536000',
// }

async function uploadFile({ sourceFilePath, uploadPath }) {
  const ext = extname(sourceFilePath)

  let commandObj = {
    Bucket: bucketName,
    Key: uploadPath,
    Body: await readFile(sourceFilePath),
    ContentType: await fileTypeFromFile(sourceFilePath).mime,
  }

  /** @see https://github.com/sindresorhus/file-type?tab=readme-ov-file#supported-file-types */
  if (ContentTypes?.[ext]) {
    commandObj['ContentType'] = ContentTypes[ext]
  }

  // if (CacheControl?.[ext]) {
  //   commandObj['CacheControl'] = CacheControl[ext]
  // }

  const command = new PutObjectCommand(commandObj)

  try {
    const response = await client.send(command)

    console.log(response)
  } catch (caught) {
    if (caught instanceof S3ServiceException && caught.name === 'EntityTooLarge') {
      console.error(
        `Error from S3 while uploading object to ${bucketName}. \
The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
or the multipart upload API (5TB max).`
      )
    } else if (caught instanceof S3ServiceException) {
      console.error(`Error from S3 while uploading object to ${bucketName}.  ${caught.name}: ${caught.message}`)
    } else {
      throw caught
    }
  }
}
