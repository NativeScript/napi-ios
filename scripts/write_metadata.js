#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");

const [, , binaryFile, metadataFile] = process.argv;

if (!binaryFile || !metadataFile) {
  console.error("Usage: node scripts/write_metadata.js <binaryFile> <metadataFile>");
  process.exit(1);
}

async function main() {
  const binary = await fs.readFile(binaryFile);
  const offsets = [];
  const MAGIC_TEXT = "NSMDSectionHeader";
  const decoder = new TextDecoder();

  for (let i = 0; i < binary.byteLength; i++) {
    const byte = binary[i];
    if (byte === "N".charCodeAt(0)) {
      const magic = decoder.decode(binary.subarray(i, i + MAGIC_TEXT.length));
      if (magic === MAGIC_TEXT) {
        const arch = decoder.decode(
          binary.subarray(i + MAGIC_TEXT.length, i + MAGIC_TEXT.length + 3),
        );
        offsets.push([arch, i]);
      }
    }
  }

  if (offsets.length < 1) {
    console.log("No empty metadata section found");
  }

  const metadataBaseName = metadataFile.split(".nsmd")[0];
  const metadataRoot = path.resolve(__dirname, "..", "metadata-generator", "metadata");

  for (const [arch, offset] of offsets) {
    console.log(`Writing metadata to offset ${offset}, arch: ${arch}`);
    const archSuffix = arch === "ARM" ? "arm64" : "x86_64";
    const metadataPath = path.join(
      metadataRoot,
      `${metadataBaseName}.${archSuffix}.nsmd`,
    );
    const metadata = await fs.readFile(metadataPath);
    metadata.copy(binary, offset);
  }

  await fs.writeFile(binaryFile, binary);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
