import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";

const timeout = 2_000;

function runParserCase(name, source) {
  const result = spawnSync(
    process.execPath,
    ["--input-type=module", "--eval", source],
    { encoding: "utf8", timeout },
  );

  assert.notEqual(
    result.error?.code,
    "ETIMEDOUT",
    `${name} parser exceeded ${timeout} ms`,
  );
  assert.equal(
    result.status,
    0,
    `${name} parser failed:\n${result.stderr || result.stdout}`,
  );
}

test("ICNS zero-length entries make bounded progress", () => {
  runParserCase(
    "ICNS",
    `
      import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
      import { tmpdir } from "node:os";
      import { join } from "node:path";
      import { imageSizeFromFile } from "image-size/fromFile";
      const directory = mkdtempSync(join(tmpdir(), "image-size-icns-"));
      try {
        const file = join(directory, "zero-entry.icns");
        const input = Buffer.alloc(16);
        input.write("icns", 0, "ascii");
        input.writeUInt32BE(16, 4);
        input.write("ic07", 8, "ascii");
        input.writeUInt32BE(0, 12);
        writeFileSync(file, input);
        const dimensions = await imageSizeFromFile(file);
        if (dimensions.width !== 128 || dimensions.height !== 128) process.exit(1);
      } finally {
        rmSync(directory, { recursive: true });
      }
    `,
  );
});

test("HEIF zero-length boxes make bounded progress", () => {
  runParserCase(
    "HEIF",
    `
      import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
      import { tmpdir } from "node:os";
      import { join } from "node:path";
      import { imageSizeFromFile } from "image-size/fromFile";
      const directory = mkdtempSync(join(tmpdir(), "image-size-heif-"));
      try {
        const file = join(directory, "zero-box.heic");
        const input = Buffer.alloc(76);
        const box = (offset, size, name) => {
          input.writeUInt32BE(size, offset);
          input.write(name, offset + 4, "ascii");
        };
        box(0, 16, "ftyp");
        input.write("heic", 8, "ascii");
        box(16, 60, "meta");
        box(28, 48, "iprp");
        box(36, 40, "ipco");
        box(44, 0, "ispe");
        input.writeUInt32BE(640, 56);
        input.writeUInt32BE(480, 60);
        writeFileSync(file, input);
        const dimensions = await imageSizeFromFile(file);
        if (dimensions.width !== 640 || dimensions.height !== 480) process.exit(1);
      } finally {
        rmSync(directory, { recursive: true });
      }
    `,
  );
});

test("JXL zero-length boxes make bounded progress", () => {
  runParserCase(
    "JXL",
    `
      import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
      import { tmpdir } from "node:os";
      import { join } from "node:path";
      import { imageSizeFromFile } from "image-size/fromFile";
      const directory = mkdtempSync(join(tmpdir(), "image-size-jxl-"));
      try {
        const file = join(directory, "zero-box.jxl");
        const input = Buffer.alloc(24);
        input.writeUInt32BE(12, 0);
        input.write("JXL ", 4, "ascii");
        input.write("jxl ", 8, "ascii");
        input.writeUInt32BE(0, 12);
        input.write("jxlp", 16, "ascii");
        writeFileSync(file, input);
        try {
          await imageSizeFromFile(file);
        } catch {
          process.exit(0);
        }
        process.exit(1);
      } finally {
        rmSync(directory, { recursive: true });
      }
    `,
  );
});
