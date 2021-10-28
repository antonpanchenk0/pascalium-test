const fs = require('fs');
const uuid = require('uuid');

class FileGenerator {
  constructor() {
    this.SIZE_FROM = 1000;
    this.SIZE_TO = 10000;
  }

  createOne = () => {
    const size = Math.round(this.SIZE_TO - 0.5 + Math.random() * (this.SIZE_FROM - this.SIZE_TO + 1));

    const filename = `${uuid.v4()}.txt`;

    fs.writeFileSync(`temp/${filename}`, Buffer.alloc(size));

    return filename;
  }
}

module.exports = new FileGenerator();
