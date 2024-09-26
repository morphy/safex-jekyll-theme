import fs from "fs";
import fse from "fs-extra";
import { glob } from "glob";
import sharp from "sharp";
import path from "path";

const rootDir = "assets/images_source/";
const outputDir = "assets/images/";

const getOutputPath = (originalFile, size, format) => {
  const file = originalFile.replace("images_source", "images");

  if (!size && !format) {
    return file;
  }

  const extension = path.extname(file);

  const fileName = file.replace(extension, "");

  return (
    fileName +
    "-" +
    (size.width ?? "") +
    "x" +
    (size.height ?? "") +
    "." +
    format
  );
};

if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true });
}

const allFormats = ["jpg", "webp" /*, "avif"*/];

const sources = [
  /* Categories */
  {
    files: await glob(rootDir + "oferta/*/*.jpg"),
    sizes: [
      /* Category list */
      {
        width: 540,
        height: 210
      },
      /* Category banner */
      {
        width: 1920,
        height: 350
      }
    ],
    formats: allFormats
  },
  /* Services */
  {
    files: await glob(rootDir + "oferta/*/*/*.jpg"),
    sizes: [
      /* Gallery thumbnail */
      {
        width: 200,
        height: 200
      },
      /* Gallery full */
      {
        width: 1920,
        height: 1200
      },
      /* Service list */
      {
        width: 400,
        height: 450
      },
      /* Service page header */
      {
        width: 980,
        height: 320
      }
    ],
    formats: allFormats
  },
  /* Backgrounds */
  {
    files: await glob(rootDir + "bg/*.*"),
    sizes: [
      {
        width: 1920,
        height: 400
      }
    ],
    formats: allFormats
  },
  /* Machines */
  {
    files: await glob(rootDir + "park-maszynowy/*/*.jpg"),
    sizes: [
      {
        width: 300,
        height: 300
      }
    ],
    formats: allFormats
  },
  /* Partners */
  {
    files: await glob(rootDir + "wspolprace/*.png"),
    sizes: [
      {
        width: 120
      }
    ],
    formats: ["png"]
  },
  /* The rest */
  {
    files: await glob(rootDir + "*.*")
  }
];

const fileCount = sources.reduce((acc, source) => {
  if (!source.formats || !source.sizes) {
    return acc;
  }

  const numberOfFiles =
    source.files.length * source.formats.length * source.sizes.length;

  return acc + numberOfFiles;
}, 0);

let fileCounter = 0;

for (const source of sources) {
  if (!source.options && !source.formats) {
    const copyPromises = [];

    for (const file of source.files) {
      copyPromises.push(fse.copy(file, getOutputPath(file)));
    }

    await Promise.all(copyPromises);
  } else {
    for (const file of source.files) {
      fs.readFile(file, undefined, async (error, fileContent) => {
        for (const format of source.formats) {
          for (const size of source.sizes) {
            const resizedFile = await sharp(fileContent)
              .resize(size.width, size.height, {
                fit: "cover"
              })
              .toFormat(format)
              .toBuffer();

            await fse.outputFile(
              getOutputPath(file, size, format),
              resizedFile
            );

            fileCounter++;

            console.log(
              fileCounter,
              "/",
              fileCount,
              "saved",
              getOutputPath(file, size, format)
            );
          }
        }
      });
    }
  }
}
