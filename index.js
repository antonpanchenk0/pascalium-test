/**
 * I skipped the first take, due to Aws upload returning the same promise as there
 * and completion of this promise take around 1-5 second.
 *
 * @type {AwsUploader}
 */

const AwsUploader = require('./AwsUploader');
const FileGenerator = require('./FileGenerator');

// Number of files which will be upload in one cycle iteration
const FILES_IN_ONE_ITERATION = 20;

(async () => {
  const files = new Array(1000).fill(null).map(() => FileGenerator.createOne());

  for (let i = 0; i < Math.round(files.length / FILES_IN_ONE_ITERATION); i++) {
    const filesInProcess = files.slice(i * FILES_IN_ONE_ITERATION, (i + 1) * FILES_IN_ONE_ITERATION);

    console.log('FILES IN PROCESS:', filesInProcess);

    const fileUploadsPromises = filesInProcess.map((file) => AwsUploader.uploadOne(`temp/${file}`));

    await Promise.all(fileUploadsPromises);
  }
})();
