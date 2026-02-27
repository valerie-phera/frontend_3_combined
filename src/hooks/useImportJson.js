import { useRef } from "react";

const useImportJson = (onImport) => {
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        console.log("Imported data:", jsonData);

        if (typeof onImport === "function") {
          onImport(jsonData);     // we pass it on to the outside
        } else {
          throw new Error("onImport is not a function");
        }

      } catch (err) {
        console.error("Invalid JSON file", err);
        alert("Invalid JSON file");
      }
    };

    reader.readAsText(file);
  };

  return { fileInputRef, handleImportClick, handleFileUpload };
};

export default useImportJson;