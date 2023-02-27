function generate() {
  const file1Url = 'mushroom'; // The URL of file1.sav on the server
  const file2Input = document.getElementById('track1'); // The file input element for file2

  // Load file1.sav from the server
  fetch(file1Url)
    .then(response => response.arrayBuffer())
    .then(file1Data => {
      const file1Array = new Uint8Array(file1Data);

      // Load file2 data from the file input element
      const file2Data = file2Input.files[0];
      const reader = new FileReader();
      const readPromise = new Promise((resolve, reject) => {
        reader.onload = function (e) {
          resolve(new Uint8Array(e.target.result));
        };
        reader.onerror = function () {
          reject(new Error('Unable to read file2 data'));
        };
      });
      reader.readAsArrayBuffer(file2Data);
      reader.onload = function (e) {
        const file2Array = new Uint8Array(e.target.result);

        // Write file2 data into file1.sav at offset 0x1000
        file1Array.set(file2Array, 0x1000);

        // Generate a new file with the modified data
        const modifiedFile = new Blob([file1Array], { type: 'application/octet-stream' });

        // Download the modified file as result.sav
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(modifiedFile);
        downloadLink.download = 'result.sav';
        downloadLink.click();
      };
    });
}
