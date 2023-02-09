const fs = require('fs');
const path = require('path');
const ghPages = require('gh-pages');

const getPath = (folderName = '', pathToFile = '') => {
  return path.join(__dirname, folderName, pathToFile);
};

const createDirectory = (folderName) => {
  if (!fs.existsSync(folderName)) {
    fs.mkdir(getPath(folderName), { recursive: true }, (err) => {
      if (err) console.error(err);
    });
  }
};

const getFiles = function (dir, files, srcFolderName, distFolderName) {
  const readFolder = fs.readdirSync(dir);

  for (const filename of readFolder) {
    const filePath = path.join(dir, filename);

    if (fs.statSync(filePath).isDirectory()) {
      const newDistFolderPath = filePath.replace(`${ srcFolderName }`, distFolderName);

      createDirectory(newDistFolderPath);

      getFiles(filePath, files, srcFolderName, distFolderName);
    }
    else if (!filePath.match(/\.scss|\.css.map/))
      files.push(filePath.replace(`${ srcFolderName }/`, ''));
  }
  return files;
};

const build = (srcFolderName = 'src', distFolderName = 'dist') => {
  createDirectory(distFolderName);

  const filePaths = getFiles(srcFolderName, [], srcFolderName, distFolderName);

  for (const path of filePaths) {
    fs.copyFile(getPath(srcFolderName, path), getPath(distFolderName, path), (err) => {
      if (err) throw err;

      console.log(`Файл ${ path } успешно копирован`);
    });
  }
};

if (process.env.REBUILD) build();

ghPages.publish('dist', {},
  () => console.log('Копирование файлов на удаленный репозиторий завершено'))
.then(() => console.log('Запуск сборки'));
