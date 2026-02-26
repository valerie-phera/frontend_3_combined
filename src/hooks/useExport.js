import { useCallback } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import JSZip from "jszip";

export const useExport = () => {
  const exportPdf = useCallback(async (data) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    let y = 820;
    const mainBlue = rgb(0.29, 0.56, 0.89);

    page.drawText("pHera — Vaginal pH Report", { x: 40, y, size: 22, font, color: mainBlue });

    // Можно добавить здесь детали и рекомендации
    return await pdfDoc.save();
  }, []);

  const exportJson = useCallback((data) => JSON.stringify(data, null, 2), []);
  const exportCsv = useCallback((data) => {
    const rows = [
      ["Parameter", "Value"],
      ["PH Value", data.phValue],
      ["PH Level", data.phLevel],
      ["Timestamp", data.timestamp],
      ["Interpretation", data.interpretation],
      ["Details", data.details.join(" | ")],
      ["Recommendations", data.recommendations.join(" | ")],
    ];
    return rows.map(r => r.join(",")).join("\n");
  }, []);

  const handleExport = useCallback(async (data) => {
    const pdfBytes = await exportPdf(data);
    const jsonText = exportJson(data);
    const csvText = exportCsv(data);

    const zip = new JSZip();
    zip.file("ph-report.pdf", pdfBytes);
    zip.file("ph-report.json", jsonText);
    zip.file("ph-report.csv", csvText);

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "phera-report.zip");
  }, [exportPdf, exportJson, exportCsv]);

  return { handleExport };
};